'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('isomorphic-fetch');
const nunjucks = require('nunjucks');
const raven = require('raven');

const sentry = require('./lib/sentry');

const app = module.exports = express();
const router = new express.Router();

const API_HOSTNAME = process.env.CRM_API_URL;

app.set('json spaces', 2);
app.set('x-powered-by', false);
app.set('etag', 'strong');

app.use(bodyParser.json());

app.use('/assets', express.static(`${__dirname}/assets`));

// Configure nunjucks template engine
module.exports.nunjucks = nunjucks.configure('templates', {
  autoescape: true,
  express: app,
  noCache: process.env.NODE_ENV !== 'production',
});

router.get('/', (req, res, next) => {
  res.render('app.html', {
    assets: process.env.NODE_ENV === 'production' ? '/assets' : 'http://frivillig-dev.app.dnt.local/assets',
    environment: process.env.NODE_ENV,
  });
});

router.post('/api/incident', (req, res, next) => {
  const options = {
    method: 'POST',
    timeout: 10000,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(req.body),
  };

  let statusCode;

  fetch(`${API_HOSTNAME}/api/Incident`, options)
    .then(response => {
      statusCode = response.status;

      return response.json();
    })
    .then(json => {
      res.status(statusCode).json(json);
    })
    .catch(err => {
      res.status(err.status || 500).json({err: err});
    });
});

router.get('/api/activity', (req, res, next) => {
  const options = {
    timeout: 10000,
    headers: {
      'Content-type': 'application/json',
    },
  };

  let statusCode;

  fetch(`${API_HOSTNAME}/api/Activity`, options)
    .then(response => {
      statusCode = response.status;
      return response.json();
    })
    .then(json => {
      res.status(statusCode).json(json);
    })
    .catch(err => {
      res.json({err: err});
    });
});

// Sentry Error Handling
if (process.env.NODE_ENV === 'production') {
  router.use(raven.middleware.express.requestHandler(sentry));
  router.use(raven.middleware.express.errorHandler(sentry));
}

// Final Error Handling
router.use((err, req, res, next) => {
  /* eslint-disable no-console */
  if (err.code >= 500) {
    if (err.error) {
      console.error(err.error.message);
      console.error(err.error.stack);
    } else {
      console.error(err.message);
      console.error(err.stack);
    }
  }
  /* eslint-enable */

  if (err.code && (typeof err.toJSON === 'function')) {
    res.status(err.code).json(err.toJSON());
  } else if (err.status && err.message) {
    // Some errors, like SyntaxError from body-parser middleware
    // https://github.com/expressjs/body-parser/issues/122
    res.status(err.status).json({code: err.status, message: err.message});
  } else {
    res.status(500).json({code: 500, message: 'Unknown error'});
  }
});

app.use(process.env.VIRTUAL_PATH, router);

if (!module.parent) {
  const port = process.env.VIRTUAL_PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
}
