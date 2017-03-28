const reducer = (state = {}, {type = "", payload={}}) => {
    switch (type) {
        case "JSON_LOADED":
            console.log(payload);
            return {...state, ...payload};
            
            break;
    }
    return state
};


export default reducer;