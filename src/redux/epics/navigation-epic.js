import { from, of } from "rxjs";
import { flatMap } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import navigationActions from "../actions/navigation-actions";
import charityActions from "../actions/charity-actions";
import paymentActions from "../actions/payment-actions";

const loadHomepageEpic = action$ =>
  action$.pipe(
    ofType(navigationActions.LOAD_HOMEPAGE),
    flatMap(action => [
      charityActions.fetchCharitiesRequest(),
      paymentActions.fetchPaymentsRequest()
    ])
  );

export default combineEpics(loadHomepageEpic);
