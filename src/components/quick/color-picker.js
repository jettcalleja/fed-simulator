import React from "react"
import { CompactPicker as Picker } from "react-color"
import PropTypes from "prop-types"

const noop = () => {}
const colors = [
  ["#B80000", "#BEDADC", "#C4DEF6", "#BED3F3", "#D4C4FB", "#000000", "#FFFFFF",],
]

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    })
  }

  handleClose = () => {
    this.setState({
      displayColorPicker: false,
    })
  }

  onChange = color => {
    this.props.onChange(color.hex)
  }

  render() {
    return (
      <div
        style={this.props.style}
        onClick={this.handleClick}
        className="colorPicker"
      >
        {this.state.displayColorPicker
          ? <div className="popover" onClick={this.handleClose}>
              <div className="cover" />
              <Picker color={colors} width="220px" onChange={this.onChange} />
            </div>
          : null}
      </div>
    )
  }
}

ColorPicker.displayName = "ColorPicker"

ColorPicker.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  style: PropTypes.object,
}

ColorPicker.defaultProps = {
  onClick: noop,
  onChange: noop,
  style: {},
}

export default ColorPicker
