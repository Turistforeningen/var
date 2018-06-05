import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

import {toggleActivity, toggleWhere} from '../actions/index.js';

class Activity extends Component {
  constructor(props) {
    super();

    this.state = {infoIsVisible: false};
  }

  @autobind
  handleActivityToggle(e) {
    const isChecked = e.target.checked;

    this.props.toggleActivity(this.props.type.id, isChecked);
  }

  @autobind
  handleWhereToggle(e) {
    const isChecked = e.target.checked;

    this.props.toggleWhere(this.props.type.id, e.target.value, isChecked);
  }

  @autobind
  toggleInfoIsVisible(e) {
    this.setState({infoIsVisible: !this.state.infoIsVisible});
  }

  render() {
    const {type, activity, errors} = this.props;
    const {isSelected} = this.props.activity;
    const {infoIsVisible} = this.state;

    return (
      <div className="checkbox" key={type.id}>
        <div style={{display: 'block', marginBottom: '5px'}}>
          <label>
            <input
              type="checkbox"
              name="type"
              value={type.id}
              onChange={this.handleActivityToggle}
              checked={!!isSelected}
            />
            {type.name}
          </label>
          {' '}
          <a onClick={this.toggleInfoIsVisible}>
            {type.description && (infoIsVisible ? 'Skjul info' : 'Vis info')}
          </a>
        </div>
        {
          infoIsVisible &&
          <div style={{border: '2px solid #ccc', padding: '20px', marginBottom: '10px'}}>
            {type.description}
          </div>
        }
        {
          isSelected &&
          <div style={{border: '2px solid #ccc', padding: '20px', marginBottom: '10px'}}>
            <h4 style={{marginTop: '0px', marginBottom: '5px'}}>Hvor?</h4>
            {
              Object.keys(activity.where || {})
                .map(id => (
                  <div key={id} className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="where"
                        value={id}
                        onChange={this.handleWhereToggle}
                        checked={!!activity.where[id].isSelected}
                      />
                      {activity.where[id].name}
                    </label>
                  </div>
                ))
            }
            {errors && <div className="validation error">Du må velge minst ett sted</div>}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  activities: state.form.data.activities,
  type: ownProps.type,
  activity: state.form.data.activities[ownProps.type.id],
  errors: state.form.errors.where ? state.form.errors.where[ownProps.type.id] : undefined,
});

const mapDispatchToProps = dispatch => ({
  toggleActivity: function dispatchToggleActivity(activity, isSelected) {
    dispatch(toggleActivity(activity, isSelected));
  },
  toggleWhere: function dispatchToggleWhere(activity, where, isSelected) {
    dispatch(toggleWhere(activity, where, isSelected));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
