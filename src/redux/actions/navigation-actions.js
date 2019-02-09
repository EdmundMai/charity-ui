export const LOAD_HOMEPAGE = "omisego/navigation/load-homepage";

const ACTIONS = Object.freeze({
  LOAD_HOMEPAGE,

  // actionCreators
  loadHomepage: () => ({
    type: LOAD_HOMEPAGE
  })
});

export default ACTIONS;
