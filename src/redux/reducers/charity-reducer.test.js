import charityReducer from "./charity-reducer";
import charityActions from "../actions/charity-actions";

describe("Charity Reducer", () => {
  it("returns the initial state", () => {
    expect(charityReducer(undefined, {})).toEqual({
      list: []
    });
  });

  it("updates list on FETCH_CHARITIES_SUCCESS", () => {
    const charities = [{ id: 1 }];
    const action = {
      type: charityActions.FETCH_CHARITIES_SUCCESS,
      payload: charities
    };
    expect(charityReducer(undefined, action)).toEqual({
      list: charities
    });
  });
});
