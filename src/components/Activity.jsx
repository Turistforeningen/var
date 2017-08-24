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

    this.props.toggleActivity(this.props.type.name, isChecked);
  }

  @autobind
  handleWhereToggle(e) {
    const isChecked = e.target.checked;

    this.props.toggleWhere(this.props.type.name, e.target.value, isChecked);
  }

  @autobind
  toggleInfoIsVisible(e) {
    this.setState({infoIsVisible: !this.state.infoIsVisible});
  }

  render() {
    const {type, activity} = this.props;
    const {isSelected} = this.props.activity;
    const {infoIsVisible} = this.state;

    return (
      <div className="checkbox" key={type.name}>
        <div style={{display: 'block', marginBottom: '5px'}}>
          <label>
            <input
              type="checkbox"
              name="type"
              value={type.name}
              onChange={this.handleActivityToggle}
              checked={!!isSelected}
            />
            {type.label}
          </label>
          {' '}
          <a
            onClick={this.toggleInfoIsVisible}
            style={{color: '#147dcc', textDecoration: 'underline', cursor: 'pointer'}}
          >

            {type.description ? (infoIsVisible ? 'Skjul info' : 'Vis info') : ''}
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
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="where"
                  value="nærmiljø"
                  onChange={this.handleWhereToggle}
                  checked={!!activity.where.nærmiljø}
                />
                I mitt nærmiljø
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="where"
                  value="regionfylke"
                  onChange={this.handleWhereToggle}
                  checked={!!activity.where.regionfylke}
                />
                I min region / mitt fylke
              </label>
            </div>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="where"
                  value="fjellet"
                  onChange={this.handleWhereToggle}
                  checked={!!activity.where.fjellet}
                />
                På fjellet
              </label>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  activities: state.activities,
  type: ownProps.type,
  activity: state.activities[ownProps.type.name],
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