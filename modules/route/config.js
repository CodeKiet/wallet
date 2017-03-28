/**
 * Created by hmd on 3/23/17.
 */

import {DefaultReducer} from "./reducer"
export const reducers = {
    counter: DefaultReducer("COUNTER_RECORD"),
    auth: DefaultReducer("AUTH_RECORD"),
    captcha: DefaultReducer("CAPTCHA_RECORD"),
};
