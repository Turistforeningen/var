import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

import {toggleActivity, toggleWhere} from '../actions/index.js';

class Activity extends Component {
  constructor(props) {
    super();
    this.state = {isChecked: false, where: []};
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

  render() {
    const {type, activity} = this.props;
    const {isSelected} = this.props.activity;

    return (
      <div className="checkbox" key={type.name}>
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
        {
          isSelected &&
          <div>
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
