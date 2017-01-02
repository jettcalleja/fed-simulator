import React from "react"

export default class ReadOnly extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  render() {
    return (
      <input
        type="text"
        className="form-control"
        name={this.props.name}
        value={this.props.defaultValue}
        readOnly
      />
    )
  }
}
