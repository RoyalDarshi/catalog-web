import React, {Suspense, useEffect, useRef} from 'react';
import './App.css';
import {ScopedCssBaseline, ThemeProvider} from "@mui/material";
import {HashRouter} from "react-router-dom";
import {EffigoColorTheme} from "./themes/themes"
import AppRouter from './AppRouter';
import MasterDataService from "./services/MasterDataService";
import {showError, showInfo, showWarning} from "./services/alert-service";
import secureLocalStorage from "react-secure-storage";
import {setSessionData} from "./services/KcAdmin";


function App() {
    const initialized = useRef(false)
//     useEffect(() => {
//
//         // if(!initialized.current)
//         // {
//         //     initialized.current = true
//         //     let isAuthEnabled = process.env.REACT_APP_IS_AUTH_ENABLED;
//         //
//         //     setSessionData().then(result => {
//         //         console.log("Result is ....",result)
//         //     })
//         //
//         //
//         //     if(isAuthEnabled === "true")
//         //     {
//         //         if(!loggedIn())
//         //         {
//         //                 showError("Access not allowed, Your are not logged in")
//         //                 const loginUrl:string | any = process.env.REACT_APP_LOGIN_URL;
//         //                 setTimeout(() => {
//         //                     window.location.replace(loginUrl);
//         //                 },200)
//         //                 clearTimeout(200)
//         //
//         //         }
//         //
//         //     }
//         //
//         // }
// //        showWarning("Is Enabled "+ process.env.REACT_APP_IS_AUTH_ENABLED)
//
//     }, []);

    const loggedIn = () => {
        let isLoggedIn = false;
        const idToken = secureLocalStorage.getItem("accessToken");
        const refreshToken =  secureLocalStorage.getItem("refreshToken");
        isLoggedIn = !(!idToken && !refreshToken);
        return isLoggedIn;
    }

  return (

  <>
    <ThemeProvider theme={EffigoColorTheme}>
      {/* eslint-disable-next-line react/jsx-no-undef */}
        <ScopedCssBaseline enableColorScheme />
      <HashRouter>
      {/*<Suspense fallback={"loading..."} >*/}
      <AppRouter></AppRouter>
          {/* <Box>
              <CatalogHomePage/>
          </Box> */}
      {/*</Suspense>*/}


    </HashRouter>
    </ThemeProvider>
  </>


  );
}
export default App;
