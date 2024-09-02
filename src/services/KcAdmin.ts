import KcAdminClient from "@keycloak/keycloak-admin-client";
import secureLocalStorage from "react-secure-storage";

export class SessionData{
    loggedInUserId: string | any;
    tenantId: string | any ;
    userName: string | any ;
    token: string | any;
    rToken: string| any;
}

export const setSessionData = async () =>{
    let sessionData:SessionData = new SessionData();
    kcContext().then(data=>{

        console.log("Data is ",data)
        let newRealm = process.env.REACT_APP_REALM_NAME
        let loggedInUser = secureLocalStorage.getItem("loggedInUser")
        let loginId = secureLocalStorage.getItem("loginUserId")
        console.log("ID of logged in user is ..",loginId)
        sessionData.rToken = data.refreshToken
        sessionData.token = data.accessToken
        data.setConfig({
            realmName: newRealm
        })
        if (data.accessToken != null) {
            data.setAccessToken(data.accessToken)
        }

        data.users.find({q: `username:${loggedInUser}`}).then(result=>{
          //  console.log("Logged in user Data ..",result)
            sessionData.loggedInUserId = result[0].id
            sessionData.userName = result[0].username


            // @ts-ignore
            data.users.listGroups(result.at(0)).then(groupsData=>{
                console.log(groupsData,"  Resultant groups..")
                sessionData.tenantId = groupsData[0].name
                console.log("Setting user group into local storage.............................................")
                secureLocalStorage.setItem("tenantId",sessionData.tenantId)
            })
        })
    })

    return sessionData

}

export  const  kcContext = async() => {
    const kcAdminClient = new KcAdminClient({
        baseUrl: "https://auth.magically.in",
        realmName: 'master'
    });


    await kcAdminClient.auth({
    grantType: 'client_credentials',
    clientId: 'effigo-kc-admin',
    clientSecret: '2L0TBfCvGn0zYPDM680x0GKC1p9IzQc7'
});
    return kcAdminClient;
}