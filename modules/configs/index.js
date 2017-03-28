let hostAddress = "wallet.rasanak.com";
if (__DEV__) {
    hostAddress = "192.168.21.102:8080";
}


export const API = hostAddress + "/api/v0.1/accounts/testing"; 
