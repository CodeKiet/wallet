import Commons from '../commons/index.js';

export default class Auth {
    constructor(state:any) {
        this.state = state.auth;
    }

     GetAuthHeader():any {
        return this.state.token;
    }

    GetToken():any {
        if (this.state.token && !this.state.token.user) {
            return null;
        }
        return this.state.token;
    }

    IsAuthenticated():boolean {
        let token = this.GetToken();
        if (!this.GetToken()) {
            return false;
        }

        let token_is_expired = token && new Date(token.expires) < new Date();

        if (token_is_expired) {
            return false
        }
        return true;
    }

    RedirectLogin(origin:string) {
        return Commons.Go("/fa/login");
    }

     Authenticate(origin:string) {
        return (dispatch:any, getState:any)=> {
            dispatch(Commons.BuildNamedAction("USER_IS_LOGGEDOUT", "token")(null));
            dispatch(this.RedirectLogin(origin))
        }
    }

     MakeURL(path:string, filter:Object = {}):string {
        let token = this.GetToken();
        let ns = "origin";
        if (token) {
            ns = token.namespace;
        }
        let pp = `/api/v0.1/accounts/${ns}${path}`;


        let queryString = Commons.EncodeQueryData(filter);

        if (queryString.length > 0) {
            return `${pp}?${queryString}`
        }

        return pp;
    }
}