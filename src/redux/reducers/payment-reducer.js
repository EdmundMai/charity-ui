import paymentActions from "../actions/payment-actions";

import { PAYMENT_STATUSES } from "../../config";

const initState = {
  list: [],
  status: PAYMENT_STATUSES.NONE
};

export default (state = initState, action) => {
  switch (action.type) {
    case paymentActions.FETCH_PAYMENTS_SUCCESS:
      const payments = action.payload;
      return {
        ...state,
        list: payments
      };
    case paymentActions.POST_PAYMENT_REQUEST:
      return { ...state, status: PAYMENT_STATUSES.PENDING };
    case paymentActions.POST_PAYMENT_SUCCESS:
      const payment = action.payload;
      return {
        ...state,
        list: [...state.list, payment],
        status: PAYMENT_STATUSES.SUCCESS
      };
    case paymentActions.POST_PAYMENT_ERROR:
      return { ...state, status: PAYMENT_STATUSES.ERROR };
    default:
      return state;
  }
};
