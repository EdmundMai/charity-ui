import charityActions from "../actions/charity-actions";

const initState = {
  list: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case charityActions.FETCH_CHARITIES_SUCCESS:
      const charities = action.payload;
      return { ...state, list: charities };
    default:
      return state;
  }
};
