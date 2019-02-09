import { combineEpics } from "redux-observable";

import charityEpic from "./charity-epic";
import paymentEpic from "./payment-epic";
import navigationEpic from "./navigation-epic";

export default combineEpics(charityEpic, paymentEpic, navigationEpic);
