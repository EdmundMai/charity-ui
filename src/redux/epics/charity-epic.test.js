import { ActionsObservable } from "redux-observable";

import charityEpic from "./charity-epic";
import charityApi from "../../services/charity-api";
import charityActions from "../actions/charity-actions";

jest.mock("../../services/charity-api");

describe("Charity Epic", () => {
  describe("fetchCharitiesEpic", () => {
    it("returns fetchCharitiesSuccess with the right params on success", done => {
      const charities = [{ id: 1 }];
      charityApi.index.mockImplementation(() =>
        ActionsObservable.of(charities)
      );

      const action$ = ActionsObservable.of({
        type: charityActions.FETCH_CHARITIES_REQUEST
      });

      charityEpic(action$).subscribe(outputAction => {
        expect(outputAction).toEqual(
          charityActions.fetchCharitiesSuccess(charities)
        );
        done();
      });
    });

    it("returns fetchCharitiesError with the right params on error", done => {
      const error = new Error();
      charityApi.index.mockImplementation(() => Promise.reject(error));

      const action$ = ActionsObservable.of({
        type: charityActions.FETCH_CHARITIES_REQUEST
      });

      charityEpic(action$).subscribe(outputAction => {
        expect(outputAction).toEqual(charityActions.fetchCharitiesError(error));
        done();
      });
    });
  });
});
