import React from "react"
import PropTypes from "prop-types"
import { SlideRight } from "animate-components"

import Wrestlers from "../../components/wrestlers/container"
import Input from "../../components/form/input"
import Button from "../../components/button/button"
import Image from "../../components/form/image"
import HeaderOne from "../../components/h1/h1"
import { ANIMATION_SPEED } from "../../constants/animation"

import "./manage-roster.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({
  animations = true,
  showWrestlersFilters = true,
  currentWrestler = null,
  onWrestlerPointsUpdated = NOOP,
  onWrestlersNameUpdated = NOOP,
  onImageUpdated = NOOP,
  onWrestlerDelete = NOOP,
  onWrestlerClick = NOOP,
}) => {
  return (
    <div className="page manage-roster">
      <HeaderOne>Manage your Wrestlers</HeaderOne>
      <div className="row">
        <If condition={!currentWrestler}>
          <p>Click a wrestler to edit them!</p>
        </If>
        <div className="col-xs-12">
          <Wrestlers
            onWrestlerClick={onWrestlerClick}
            showFilter={showWrestlersFilters}
          />
        </div>
      </div>
      <br />
      <If condition={currentWrestler}>
        <SlideRight iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Points</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input
                          onChange={onWrestlersNameUpdated}
                          value={currentWrestler.name}
                        />
                      </td>
                      <td>
                        <Input
                          onChange={onWrestlerPointsUpdated}
                          value={currentWrestler.points}
                        />
                      </td>
                      <td>
                        <Image
                          name="image"
                          value={currentWrestler.image}
                          onChange={onImageUpdated}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <div className="box col-xs-3">
                <Button onClick={onWrestlerDelete}>
                  <i className="icon fa fa-trash" /> Click to delete wrestler
                </Button>
              </div>
            </div>
          </div>
        </SlideRight>
      </If>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  animations: PropTypes.bool.isRequired,
  showWrestlersFilters: PropTypes.bool,
  currentWrestler: PropTypes.object,
  onWrestlerPointsUpdated: PropTypes.func.isRequired,
  onWrestlersNameUpdated: PropTypes.func.isRequired,
  onImageUpdated: PropTypes.func.isRequired,
  onWrestlerDelete: PropTypes.func.isRequired,
  onWrestlerClick: PropTypes.func.isRequired,
}

export default UpdateWrestlersPage
