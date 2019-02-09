export const FETCH_PAYMENTS_REQUEST = "omisego/payments/fetch-payments-request";
export const FETCH_PAYMENTS_SUCCESS = "omisego/payments/fetch-payments-success";
export const FETCH_PAYMENTS_ERROR = "omisego/payments/fetch-payments-error";

export const POST_PAYMENT_REQUEST = "omisego/payments/post-payment-request";
export const POST_PAYMENT_SUCCESS = "omisego/payments/post-payment-success";
export const POST_PAYMENT_ERROR = "omisego/payments/post-payment-error";

const ACTIONS = Object.freeze({
  FETCH_PAYMENTS_REQUEST,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_ERROR,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_ERROR,

  // actionCreators
  fetchPaymentsRequest: () => ({
    type: FETCH_PAYMENTS_REQUEST
  }),
  fetchPaymentsSuccess: payments => ({
    type: FETCH_PAYMENTS_SUCCESS,
    payload: payments
  }),
  fetchPaymentsError: error => ({
    type: FETCH_PAYMENTS_ERROR,
    payload: error
  }),
  postPaymentRequest: ({ charityId, amount, currency }) => ({
    type: POST_PAYMENT_REQUEST,
    payload: { charityId, amount, currency }
  }),
  postPaymentSuccess: payment => ({
    type: POST_PAYMENT_SUCCESS,
    payload: payment
  }),
  postPaymentError: error => ({
    type: POST_PAYMENT_ERROR,
    payload: error
  })
});

export default ACTIONS;
