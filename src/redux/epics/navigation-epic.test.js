import { ActionsObservable } from "redux-observable";
import "rxjs/add/operator/toArray";

import navigationEpic from "./navigation-epic";
import navigationActions from "../actions/navigation-actions";
import charityActions from "../actions/charity-actions";
import paymentActions from "../actions/payment-actions";

describe("Navigation Epic", () => {
  describe("loadHomepageEpic", () => {
    it("returns fetchCharitiesRequest and fetchPaymentsRequest", done => {
      const action$ = ActionsObservable.of({
        type: navigationActions.LOAD_HOMEPAGE
      });

      navigationEpic(action$)
        .toArray()
        .subscribe(outputAction => {
          expect(outputAction).toEqual([
            charityActions.fetchCharitiesRequest(),
            paymentActions.fetchPaymentsRequest()
          ]);
          done();
        });
    });
  });
});
