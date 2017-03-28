/**
 * Created by hmd on 1/19/17.
 */

export function DefaultReducer(key) {
    return (state = {}, {type = "", payload={}}) => {
        switch (type) {
            case key:
                //console.log(`default reducer for key ${key}`, payload);
                return {...state, ...payload};

                break;
        }
        return state;
    };
}