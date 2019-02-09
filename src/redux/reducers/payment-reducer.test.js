import paymentReducer from "./payment-reducer";
import paymentActions from "../actions/payment-actions";

import { PAYMENT_STATUSES } from "../../config";

describe("Payment Reducer", () => {
  it("returns the initial state", () => {
    expect(paymentReducer(undefined, {})).toEqual({
      list: [],
      status: PAYMENT_STATUSES.NONE
    });
  });

  it("updates list on FETCH_PAYMENTS_SUCCESS", () => {
    const payments = [{ id: 1 }];
    const action = {
      type: paymentActions.FETCH_PAYMENTS_SUCCESS,
      payload: payments
    };
    expect(paymentReducer(undefined, action)).toEqual({
      list: payments,
      status: PAYMENT_STATUSES.NONE
    });
  });

  it("sets status to pending on POST_PAYMENT_REQUEST", () => {
    const action = {
      type: paymentActions.POST_PAYMENT_REQUEST
    };
    expect(paymentReducer(undefined, action)).toEqual({
      list: [],
      status: PAYMENT_STATUSES.PENDING
    });
  });

  it("appends payment to list and sets status to success on POST_PAYMENT_SUCCESS", () => {
    const existingPayment = { id: 1 };
    const newPayment = { id: 2 };

    const action = {
      type: paymentActions.POST_PAYMENT_SUCCESS,
      payload: newPayment
    };

    expect(paymentReducer({ list: [existingPayment] }, action)).toEqual({
      list: [existingPayment, newPayment],
      status: PAYMENT_STATUSES.SUCCESS
    });
  });

  it("sets status to error on POST_PAYMENT_ERROR", () => {
    const action = {
      type: paymentActions.POST_PAYMENT_ERROR,
      payload: "Something went wrong"
    };

    expect(paymentReducer(undefined, action)).toEqual({
      list: [],
      status: PAYMENT_STATUSES.ERROR
    });
  });
});
