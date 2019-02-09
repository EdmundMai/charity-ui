import { combineReducers } from "redux";

import charity from "./charity-reducer";
import payment from "./payment-reducer";

export default combineReducers({ charity, payment });
