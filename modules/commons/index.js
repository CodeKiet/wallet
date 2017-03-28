/**
 * Created by hmd on 10/31/16.
 */


export default class Commons {
    /**
     * supported http methods
     * @type {{POST: string, GET: string, PUT: string, DEL: string}}
     */
    static Methods = {
        POST: "POST",
        GET: "GET",
        PUT: "PUT",
        DEL: "DELETE"
    };

    /**
     * Gives an action builder based on the given type
     * @param id type id
     * @returns {Function} that converts payload to actions
     */
    static BuildAction = function (id:string) {
        return function (payload) {
            return {
                type: id,
                payload: payload
            };
        }
    };

    /**
     * returns action builder that converts any result to a names payload
     * name payload is used when multiple keys need to be saves in a state
     * @param id  action type
     * @param name name of the payload field
     * @returns {Function} function that converts payloads to actions
     */
    static BuildNamedAction = function (id:string, name:string) {
        return function (payload) {
            var result = {
                type: id,
                payload: {}
            };

            result.payload[name] = payload;
            return result
        };
    };


    /**
     * creates a global alert indicating new changes
     * @param message
     * @constructor
     */
    static Alert = (message)=> {
        
    };

   

    static FetchJsonByPromise = function (req) {
        var opts = {
            method: req.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        if (req.body) {
            opts.body = JSON.stringify(req.body)
        }
        if (req.headers) {
            opts.headers = req.headers;
        }

        return fetch(req.url, opts)
    };


    static FetchJson = function (req, success_action, alert_on_failure = true, failed_action) {
        return (dispatch, getState) => {
            const strings = ({
                en: {
                    credentialsAreWrong: "Username or Password is Wrong",
                    noAccess: "No Access",
                    gatewayerror: "Failed connecting to the server, try again later",
                    unknownError: "Unknown Error, try Again",
                    notFound: "Resource not found",
                    welcome: "Welcome"
                },
                fa: {
                    credentialsAreWrong: "نام کاربری یا کلمه عبور اشتباه است",
                    noAccess: "دسترسی مجاز نیست",
                    gatewayerror: "خطای اتصال به سرور، بعدا امتحان کنید",
                    unknownError: "خطای نامعلوم، دوباره امتحان کنید",
                    notFound: "درخواست یافت نشد",
                    welcome: "خوش آمدید"
                }
            });

            var opts = {
                method: req.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };


            if (req.body) {
                opts.body = JSON.stringify(req.body)
            }


            if (req.headers) {
                opts.headers = req.headers;
            }

            console.log("injas");
            console.log(req);

            dispatch(({
                type: 'FETCH_JSON',
                //Use Promise Middleware
                payload: fetch(req.url, opts).then(function (resp) {
                    if (resp.status > 500) {
                        if (alert_on_failure) {
                            Commons.Warning(strings[getState().settings.lang].gatewayerror);
                        }
                        if (failed_action) {

                            dispatch(failed_action(resp.status, resp.body));
                        }
                        return;
                    }

                    if (resp.status == 401) {
                        if (alert_on_failure) {
                            Commons.Alert(strings[getState().settings.lang].noAccess);
                        }
                        if (failed_action) {
                            dispatch(failed_action(resp.status, resp.body));
                        }
                        return;
                    } else if (resp.status == 404) {
                        if (alert_on_failure) {
                            Commons.Warning(strings[getState().settings.lang].notFound);
                        }
                        if (failed_action) {
                            dispatch(failed_action(resp.status, resp.body));
                        }
                        return;
                    } else if (resp.status > 400) {
                        if (alert_on_failure) {
                            Commons.Alert(strings[getState().settings.lang].credentialsAreWrong);
                        }
                        if (failed_action) {
                            dispatch(failed_action(resp.status, resp.body));
                        }
                        return;
                    }

                    if (resp.status != 201 && resp.status != 200) {
                        if (alert_on_failure) {
                            Commons.Alert(strings[getState().settings.lang].unknownError);
                        }
                        if (failed_action) {
                            dispatch(failed_action(resp.status, resp.body));
                        }
                        return;
                    }

                    console.log(resp.status);

                    resp.json().then((json) => {
                        //Commons.Success(strings[getState().settings.lang].welcome);
                        dispatch(success_action(json));
                    });

                }).catch(function (ex) {
                    if (alert_on_failure) {
                        Commons.Alert(strings[getState().settings.lang].unknownError);
                    }
                    console.log('parsing failed', ex);
                    throw ex;
                })
            }));

        };
    };

    static HttpRequest(method, url, body, resource, action) {
        return (dispatch, getState) => {
            let act;
            if (resource) {
                act = Commons.BuildNamedAction(action ? action : "JSON_LOADED", resource);
            } else {
                act = Commons.BuildAction(action ? action : "JSON_LOADED");
            }
            var opt = {
                method: method ? method : Commons.Methods.GET,
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            let token = getState().auth.token;

            let token_is_expired = token && new Date(token.expires) < new Date();


            if (token_is_expired) {
                dispatch(Commons.Go("/fa/login"))
            }

            let auth_header_not_specified = !opt.headers.Authorization && token;
            if (auth_header_not_specified) {
                opt.headers.Authorization = `Token ${token.access_token}`
            }


            if (body) {
                opt.body = body;
            }

            dispatch(Commons.FetchJson(opt, act,))
        }
    }

    static HttpRequestByPromise(auth, method, url, body) {

        var opt = {
            method: method ? method : Commons.Methods.GET,
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        console.log(auth);
        console.log("token log shod");

        let token = auth.GetToken();

        if (!auth.IsAuthenticated()) {
            throw new Error("token is expired")
        }

        let auth_header_not_specified = !opt.headers.Authorization && token;
        console.log(auth_header_not_specified);
        if (auth_header_not_specified) {
            opt.headers.Authorization = `Token ${token.access_token}`
        }


        if (body) {
            opt.body = body;
        }

        return Commons.FetchJsonByPromise(opt);
    }

    static Put(url, body, resource, action) {
        return Commons.HttpRequest(Commons.Methods.PUT, url, body, resource, action);
    }

    static Get(url, resource, action) {
        return Commons.HttpRequest(Commons.Methods.Get, url, null, resource, action);
    }

    static GetByPromise(auth, url) {
        return Commons.HttpRequestByPromise(auth, Commons.Methods.Get, url, null);
    }

    static Delete(url, resource, action) {
        return Commons.HttpRequest(Commons.Methods.DEL, url, null, resource, action);
    }

    static Post(url, body, resource, action) {
        return Commons.HttpRequest(Commons.Methods.POST, url, body, resource, action);
    }


    static EncodeQueryData(data) {
        var ret = [];
        for (var d in data)
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
        return ret.join("&");
    }

    static PageFilter(page:Number = 0, count:Number = 10) {
        return {page: page, count: count};
    }
}



