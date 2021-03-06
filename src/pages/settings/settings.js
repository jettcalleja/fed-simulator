import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from "react-router"
import chromatism from "chromatism"

import { Reset } from "../../components/icons"
import ColorPickers from "../../components/color-pickers/container"
import { resetAll } from "../../actions/game"
import HeaderOne from "../../components/header/header"

import "./settings.scss"

class Settings extends Component {
  render() {
    const { style, } = this.props
    const reduceBrightness = amount => {
      return {
        color: style.color,
        backgroundColor: chromatism.brightness(amount, style.backgroundColor).hex,
      }
    }

    return (
      <section className="page settings">
        <HeaderOne>Settings</HeaderOne>
        <div className="row">
          <div className="col-xs-12">
            <div className="box" style={reduceBrightness(4)}>
              <ColorPickers />
            </div>
            <div className="box" style={reduceBrightness(10)}>
              <a tabIndex="0" onClick={this.onReset}>
                <Reset />
                &nbsp;Reset game
              </a>
            </div>
            <div className="box" style={reduceBrightness(16)}>
              <Link tabIndex="0" to="name">
                Name your federation
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  onReset = () => {
    const { router, dispatch, } = this.props

    dispatch(resetAll())
    router.push("/default")
  }
}

Settings.contextTypes = {
  router: PropTypes.object.isRequired,
}

Settings.propTypes = {
  style: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  style: state.style,
}))(Settings)
