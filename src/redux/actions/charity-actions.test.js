import charityActions from "./charity-actions";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

describe("Charity Actions", () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  describe("fetchCharitiesRequest", () => {
    it("returns action of type FETCH_CHARITIES_REQUEST", () => {
      const action = store.dispatch(charityActions.fetchCharitiesRequest());
      expect(action).toEqual({
        type: charityActions.FETCH_CHARITIES_REQUEST
      });
    });
  });

  describe("fetchCharitiesSuccess", () => {
    it("returns action of type FETCH_CHARITIES_SUCCESS with the right payload", () => {
      const charities = [{ id: "c1" }];
      const action = store.dispatch(
        charityActions.fetchCharitiesSuccess(charities)
      );
      expect(action).toEqual({
        type: charityActions.FETCH_CHARITIES_SUCCESS,
        payload: charities
      });
    });
  });

  describe("fetchCharitiesError", () => {
    it("returns action of type FETCH_CHARITIES_ERROR with the right payload", () => {
      const error = "Error";
      const action = store.dispatch(charityActions.fetchCharitiesError(error));
      expect(action).toEqual({
        type: charityActions.FETCH_CHARITIES_ERROR,
        payload: error
      });
    });
  });
});
