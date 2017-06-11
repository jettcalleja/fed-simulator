/* eslint-disable */
import reducer from "../src/reducers/matches"
import * as types from "../src/actions/types"
import Model from "../src/reducers/match.model"
import WrestlerModel from "../src/reducers/wrestler.model"

let defaultWrestlerId = 100
const defaultWrestler = new WrestlerModel({ id: defaultWrestlerId })
const defaultModel = new Model()
const defaultCollection = [new Model(), new Model()]
const action = {
  type: null,
  payload: [],
}

describe("given a roster reducer", () => {
  let matchesReducer

  before(() => (matchesReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(matchesReducer).to.be.empty
  })

  describe("and an action to create a empty match is passed in", () => {
    before(() => {
      action.payload = defaultCollection
      action.type = types.CREATE_MATCH
      matchesReducer = reducer(matchesReducer, action)
    })

    it("should now have one match in the collection", () => {
      expect(matchesReducer.length).to.equal(1)
    })

    it("and the first match has a a story", () => {
      expect(matchesReducer[0].story.length).to.equal(0)
    })
  })

  // ADD_WRESTLER_TO_MATCH
  describe("an action to add a wrestler to a match", () => {
    let matchId

    before(() => {
      matchId = matchesReducer[0].id

      action.type = types.ADD_WRESTLER_TO_MATCH
      action.payload = {
        matchId,
        wrestler: defaultWrestler.toJSON(),
      }

      matchesReducer = reducer(matchesReducer, action)
    })

    describe("and no team id is NOT sent", () => {
      let currentMatch, currentWrestler

      before(() => {
        currentMatch = matchesReducer.find(newMatch => newMatch.id === matchId)
        currentWrestler = currentMatch.wrestlers.find(
          wrestler => wrestler.id === defaultWrestlerId
        )
      })

      it("should expect a new team to be created", () => {
        expect(currentWrestler.teamId).to.not.be(false)
      })

      it("should create a new team id", () => {
        expect(currentWrestler.id).to.equal(defaultWrestlerId)
      })

      describe("and that new team id is sent on a new wrestler", () => {
        let newCurrentWrestler

        before(() => {
          const wrestler = defaultWrestler.toJSON()
          wrestler.id = defaultWrestlerId + 1
          wrestler.teamId = currentWrestler.teamId

          action.payload = {
            matchId,
            wrestler,
          }

          matchesReducer = reducer(matchesReducer, action)

          currentMatch = matchesReducer.find(
            newMatch => newMatch.id === matchId
          )
          newCurrentWrestler = currentMatch.wrestlers.find(
            wrestler => wrestler.id === defaultWrestlerId + 1
          )
        })

        it("should expect a new team to be created", () => {
          expect(newCurrentWrestler.teamId).to.equal(currentWrestler.teamId)
        })
      })
    })

    describe("and the same wrestler is added", () => {
      let matchId, currentMatch, currentWrestler

      before(() => {
        action.type = types.ADD_WRESTLER_TO_MATCH
        action.payload = {
          matchId,
          wrestler: defaultWrestler.toJSON(),
        }

        matchesReducer = reducer(matchesReducer, action)
      })

      it("should not re-add the same wrestler", () => {
        expect(matchesReducer[0].wrestlers.length).to.be(2)
      })
    })
  })

  // SELECT_WINNER_IN_MATCH
  describe("and the user selects a winner in the match", () => {
    let matchId, currentMatch, currentWinner

    before(() => {
      matchId = matchesReducer[0].id

      action.type = types.SELECT_WINNER_IN_MATCH
      action.payload = {
        matchId,
        wrestlerId: defaultWrestlerId,
      }

      matchesReducer = reducer(matchesReducer, action)

      currentMatch = matchesReducer.find(newMatch => newMatch.id === matchId)
      currentWinner = currentMatch.wrestlers.find(wrestler => wrestler.winner)
    })

    it("should set that wrestler to be the winner", () => {
      expect(currentWinner.winner).to.be.true
    })

    it("should only have one winner", () => {
      const allWinners = currentMatch.wrestlers.filter(
        wrestler => wrestler.winner
      )

      expect(allWinners.length).to.be(1)
    })

    describe("and another winner is chosen", () => {
      before(() => {
        action.payload = {
          matchId,
          wrestlerId: defaultWrestlerId + 1,
        }

        matchesReducer = reducer(matchesReducer, action)

        currentMatch = matchesReducer.find(newMatch => newMatch.id === matchId)
        currentWinner = currentMatch.wrestlers.find(wrestler => wrestler.winner)
      })

      it("should set that wrestler to be the winner", () => {
        expect(currentWinner.id).to.be(defaultWrestlerId + 1)
      })

      it("should still only have one winner", () => {
        const allWinners = currentMatch.wrestlers.filter(
          wrestler => wrestler.winner
        )

        expect(allWinners.length).to.be(1)
      })
    })
  })

  // // REMOVE_WRESTLER_FROM_MATCH
  describe("and a wrestler is removed from the match", () => {
    let currentMatch, matchId

    before(() => {
      matchId = matchesReducer[0].id

      action.type = types.REMOVE_WRESTLER_FROM_MATCH
      action.payload = {
        matchId,
        wrestlerId: defaultWrestlerId,
      }

      matchesReducer = reducer(matchesReducer, action)
      currentMatch = matchesReducer.find(newMatch => newMatch.id === matchId)
    })

    it("should only have 1 wrestler in the collection", () => {
      expect(currentMatch.wrestlers.length).to.be(1)
    })
  })

  describe("and a match is simulated", () => {
    let currentMatch, matchId, storyItem

    before(() => {
      matchId = matchesReducer[0].id
      // add an extra wrestler
      action.type = types.ADD_WRESTLER_TO_MATCH
      action.payload = {
        matchId,
        wrestler: defaultWrestler.toJSON(),
      }

      matchesReducer = reducer(matchesReducer, action)

      // Simulate the match
      action.type = types.SIMULATE_MATCH
      action.payload = {
        matchId,
      }

      matchesReducer = reducer(matchesReducer, action)
      currentMatch = matchesReducer.find(newMatch => newMatch.id === matchId)
      storyItem = currentMatch.story[0]
    })

    describe("and the match has a story", () => {
      it("and it has atleast one item", () => {
        expect(Object.keys(storyItem).length).to.be.greaterThan(1)
      })
      it("and that first story item should have an defender", () => {
        expect(storyItem.defender).to.not.be.empty()
      })
      it("and that first story item should have an attacker", () => {
        expect(storyItem.attacker).to.not.be.empty()
      })
      it("and that first story item should have an move", () => {
        expect(storyItem.move).to.not.be.empty()
      })
    })
  })

  describe("and reset is called", () => {
    before(() => {
      action.type = types.RESET
      matchesReducer = reducer(matchesReducer, action)
    })

    it("should have NO wrestlers", () => {
      expect(matchesReducer.length).to.equal(0)
    })
  })
})