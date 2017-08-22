import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { BRAND_CONFIRM_DELETE } from "../../constants/confirmations"
import { removeBrand } from "../../actions/brands"
import ManageBrands from "./manage-brands"

class ManageRosterContainer extends Component {
  state = {
    id: false,
  }

  onDelete = id => {
    if (confirm(BRAND_CONFIRM_DELETE)) {
      const { dispatch, } = this.props

      this.setState({
        id: false,
      })
      dispatch(removeBrand(id))
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { brands, animations, } = this.props
    return (
      <ManageBrands
        animations={animations}
        brands={brands}
        onDelete={this.onDelete}
      />
    )
  }
}

ManageRosterContainer.propTypes = {
  animations: PropTypes.bool.isRequired,
  brands: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  animations: state.game.animations,
  brands: state.brands,
}))(ManageRosterContainer)
