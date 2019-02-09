import { ActionsObservable } from "redux-observable";

import paymentEpic from "./payment-epic";
import paymentApi from "../../services/payment-api";
import paymentActions from "../actions/payment-actions";

jest.mock("../../services/payment-api");

describe("Payment Epic", () => {
  describe("postPaymentEpic", () => {
    it("calls paymentApi.create with the right params", done => {
      const requestData = { charityId: 1, amount: 10, currency: "THB" };
      const responseData = { ...requestData, id: 1 };
      paymentApi.create.mockImplementation(() =>
        ActionsObservable.of(responseData)
      );

      const action$ = ActionsObservable.of({
        type: paymentActions.POST_PAYMENT_REQUEST,
        payload: requestData
      });

      paymentEpic(action$).subscribe(() => {
        expect(paymentApi.create).toHaveBeenCalledWith(requestData);
        done();
      });
    });

    it("returns postPaymentSuccess with the right params on success", done => {
      const requestData = { charityId: 1, amount: 10, currency: "THB" };
      const responseData = { ...requestData, id: 1 };
      paymentApi.create.mockImplementation(() =>
        ActionsObservable.of(responseData)
      );

      const action$ = ActionsObservable.of({
        type: paymentActions.POST_PAYMENT_REQUEST,
        payload: requestData
      });

      paymentEpic(action$).subscribe(outputAction => {
        expect(outputAction).toEqual(
          paymentActions.postPaymentSuccess(responseData)
        );
        done();
      });
    });

    it("returns postPaymentError with the right params on error", done => {
      const error = new Error();
      paymentApi.create.mockImplementation(() => Promise.reject(error));

      const action$ = ActionsObservable.of({
        type: paymentActions.POST_PAYMENT_REQUEST,
        payload: { charityId: 1, amount: 10, currency: "THB" }
      });

      paymentEpic(action$).subscribe(outputAction => {
        expect(outputAction).toEqual(paymentActions.postPaymentError(error));
        done();
      });
    });
  });

  describe("fetchPaymentsEpic", () => {
    it("returns fetchPaymentsSuccess with the right params on success", done => {
      const payments = [{ id: 1 }];
      paymentApi.index.mockImplementation(() => ActionsObservable.of(payments));

      const action$ = ActionsObservable.of({
        type: paymentActions.FETCH_PAYMENTS_REQUEST
      });

      paymentEpic(action$).subscribe(outputAction => {
        expect(outputAction).toEqual(
          paymentActions.fetchPaymentsSuccess(payments)
        );
        done();
      });
    });

    it("returns fetchPaymentsError with the right params on error", done => {
      const error = new Error();
      paymentApi.index.mockImplementation(() => Promise.reject(error));

      const action$ = ActionsObservable.of({
        type: paymentActions.FETCH_PAYMENTS_REQUEST
      });

      paymentEpic(action$).subscribe(outputAction => {
        expect(outputAction).toEqual(paymentActions.fetchPaymentsError(error));
        done();
      });
    });
  });
});
