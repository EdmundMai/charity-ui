export const FETCH_CHARITIES_REQUEST =
  "omisego/charities/fetch-charities-request";
export const FETCH_CHARITIES_SUCCESS =
  "omisego/charities/fetch-charities-success";
export const FETCH_CHARITIES_ERROR = "omisego/charities/fetch-charities-error";

const ACTIONS = Object.freeze({
  FETCH_CHARITIES_REQUEST,
  FETCH_CHARITIES_SUCCESS,
  FETCH_CHARITIES_ERROR,

  // actionCreators
  fetchCharitiesRequest: () => ({
    type: FETCH_CHARITIES_REQUEST
  }),
  fetchCharitiesSuccess: charities => ({
    type: FETCH_CHARITIES_SUCCESS,
    payload: charities
  }),
  fetchCharitiesError: error => ({
    type: FETCH_CHARITIES_ERROR,
    payload: error
  })
});

export default ACTIONS;
