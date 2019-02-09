import paymentActions from "./payment-actions";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();

describe("Payment Actions", () => {
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  describe("fetchPaymentsRequest", () => {
    it("returns action of type FETCH_PAYMENNTS_REQUEST", () => {
      const action = store.dispatch(paymentActions.fetchPaymentsRequest());
      expect(action).toEqual({
        type: paymentActions.FETCH_PAYMENTS_REQUEST
      });
    });
  });

  describe("fetchPaymentsSuccess", () => {
    it("returns action of type FETCH_PAYMENNTS_SUCCESS with the right payload", () => {
      const payments = [{ id: "c1" }];
      const action = store.dispatch(
        paymentActions.fetchPaymentsSuccess(payments)
      );
      expect(action).toEqual({
        type: paymentActions.FETCH_PAYMENTS_SUCCESS,
        payload: payments
      });
    });
  });

  describe("fetchPaymentsError", () => {
    it("returns action of type FETCH_PAYMENNTS_ERROR with the right payload", () => {
      const error = "Error";
      const action = store.dispatch(paymentActions.fetchPaymentsError(error));
      expect(action).toEqual({
        type: paymentActions.FETCH_PAYMENTS_ERROR,
        payload: error
      });
    });
  });

  describe("postPaymentRequest", () => {
    it("returns action of type POST_PAYMENT_REQUEST with the right payload", () => {
      const payload = { charityId: 1, amount: 10, currency: "THB" };
      const action = store.dispatch(paymentActions.postPaymentRequest(payload));
      expect(action).toEqual({
        type: paymentActions.POST_PAYMENT_REQUEST,
        payload
      });
    });
  });

  describe("postPaymentSuccess", () => {
    it("returns action of type POST_PAYMENT_SUCCESS with the right payload", () => {
      const payload = { charityId: 1, amount: 10, currency: "THB", id: 1 };
      const action = store.dispatch(paymentActions.postPaymentSuccess(payload));
      expect(action).toEqual({
        type: paymentActions.POST_PAYMENT_SUCCESS,
        payload
      });
    });
  });

  describe("postPaymentError", () => {
    it("returns action of type POST_PAYMENT_ERROR with the right payload", () => {
      const payload = "Error";
      const action = store.dispatch(paymentActions.postPaymentError(payload));
      expect(action).toEqual({
        type: paymentActions.POST_PAYMENT_ERROR,
        payload
      });
    });
  });
});
