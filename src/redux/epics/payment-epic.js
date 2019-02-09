import { from, of } from "rxjs";
import { mergeMap, map, catchError, delay } from "rxjs/operators";
import { ofType, combineEpics } from "redux-observable";

import paymentApi from "../../services/payment-api";
import paymentActions from "../actions/payment-actions";

import { IS_TEST_ENV } from "../../config";

const fetchPaymentsEpic = action$ =>
  action$.pipe(
    ofType(paymentActions.FETCH_PAYMENTS_REQUEST),
    mergeMap(action =>
      from(paymentApi.index()).pipe(
        map(paymentActions.fetchPaymentsSuccess),
        catchError(error => of(paymentActions.fetchPaymentsError(error)))
      )
    )
  );

const postPaymentEpic = action$ =>
  action$.pipe(
    ofType(paymentActions.POST_PAYMENT_REQUEST),
    delay(IS_TEST_ENV ? 0 : 1000),
    mergeMap(action => {
      const { charityId, amount, currency } = action.payload;
      return from(paymentApi.create({ charityId, amount, currency })).pipe(
        map(paymentActions.postPaymentSuccess),
        catchError(error => of(paymentActions.postPaymentError(error)))
      );
    })
  );

export default combineEpics(fetchPaymentsEpic, postPaymentEpic);
