import navigationActions from "./navigation-actions";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

describe("Navigation Actions", () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  describe("loadHomepage", () => {
    it("returns action of type LOAD_HOMEPAGE", () => {
      const action = store.dispatch(navigationActions.loadHomepage());
      expect(action).toEqual({
        type: navigationActions.LOAD_HOMEPAGE
      });
    });
  });
});
