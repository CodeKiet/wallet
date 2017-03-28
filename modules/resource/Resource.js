import Commons from '../commons/index.js';
import Auth from '../auth/Auth.js';


export default class Resource {
    constructor(state) {
        this._state = state;
    }

    SaveWith(saver:any) {
        saver(this);
    }

     LoadWidth(loader:any) {
        loader(this.state.id);
    }

     DeleteWith(deleter:any) {
        deleter(this);
    }

    static Load(key:string, basePath:string, filter:Object = Commons.PageFilter(0, 10)) {
        return (dispatch, getState) => {
            let auth = new Auth(getState());
            dispatch(Commons.Get(auth.MakeURL(`${basePath}`, filter), key));
        }
    };

    static LoadById(id:string, key:string, basePath:string, filter:Object = {}) {
        return (dispatch, getState) => {
            let auth = new Auth(getState());
            return Commons.GetByPromise(auth, auth.MakeURL(`${basePath}/${id}`, filter)).then((resp:IResponse)=> {
                let act = key ? Commons.BuildNamedAction("JSON_LOADED", key) : Commons.BuildAction("JSON_LOADED");
                resp.json().then((json)=> {
                    dispatch(act(json))
                });
            }).catch((er)=> {
                console.log(er);
            });
        }
    };

    static LoadByIdPromise(auth:Auth, id:string, basePath:string, filter:Object = {}):Promise<any> {
        return Commons.GetByPromise(auth, auth.MakeURL(`${basePath}/${id}`, filter))
    };

    static DeleteById(id:string, key:string, basePath:string) {
        return (dispatch, getState) => {
            let auth = new Auth(getState());
            dispatch(Commons.Delete(auth.MakeURL(`${basePath}/${id}`, {}), key));
        }
    }


    static Save(obj:any, key:string, basePath:string, params:Object = {}) {
        return (dispatch, getState) => {
            let auth = new Auth(getState());
            if (obj.id) {
                dispatch(Commons.Put(auth.MakeURL(`${basePath}/${obj.id}`, params), this, key));

            } else {
                dispatch(Commons.Post(auth.MakeURL(`${basePath}`, params), this, key));
            }
        }
    }

    static CheckAuthenticated(state:any, redirect:boolean, dispatch:any):Auth {
        let auth:Auth = new Auth(state);
        if (!auth.IsAuthenticated()) {
            //Commons.Warning("شما وارد نشده اید");
            if (redirect) {
                dispatch(auth.Authenticate());
            }
            return null;
        }
        return auth;
    }
}