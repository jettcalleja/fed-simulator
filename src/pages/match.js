import React from "react"
import { Link } from "react-router"
import Draft from "../components/draft/draft"
import * as dropsActions from "../actions/drops"
import Helmet from "react-helmet"
import { connect } from "react-redux"

class MatchPage extends React.Component {

  displayName="MatchPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  onReset = (event) => {
    event.preventDefault()
    this.props.dispatch({
      type: "RESET",
    })
  }

  onSendToDraft = (event) => {
    event.preventDefault()
    this.props.dispatch(
      dropsActions.moveDropsToDefault()
    )
  }

  render() {
    return (
      <div>
        <ul className="nav nav-pills" role="tablist">
          <li>
            <a
              href="#"
              onKeyPress={this.onSendToDraft}
              onClick={this.onSendToDraft}>
              Move wrestlers to Draft
            </a>
          </li>
          <li>
            <a
              href="#"
              onKeyPress={this.onReset}
              onClick={this.onReset}>
              Move all wrestlers to their current brand
            </a>
          </li>
        </ul>
        <Draft />
      </div>
    )
  }
}

export default connect(state => ({}))(PageBucketDrops)
