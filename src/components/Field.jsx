import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

import {setField, validateForm} from '../actions/index.js';

class Field extends Component {
  constructor(props) {
    super();
    this.state = {value: props.value};
  }

  @autobind
  handleInputChange(e) {
    this.setState({value: e.target.value});
  }

  @autobind
  handleInputBlur(e) {
    this.props.setField(this.props.name, e.target.value);
  }

  render() {
    const {form, label, name} = this.props;
    const {value} = this.state;
    const errors = form.errors[name];
    const touched = form.touched[name] === true;
    const validated = form.validated === true;

    return (
      <div className="required">
        <label>
          {label}
        </label>
        <input
          value={value}
          onChange={this.handleInputChange}
          onBlur={this.handleInputBlur}
        />
        {
          !!errors && (!!touched || !!validated) &&
          <div className="errors">
            {errors}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  form: state.form,
  label: ownProps.label,
  name: ownProps.name,
  value: ownProps.value,
});

const mapDispatchToProps = dispatch => ({
  setField: function dispatchSetField(field, value) {
    dispatch(setField(field, value));
  },
  validateForm: function dispatchValidateForm() {
    dispatch(validateForm());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Field);
