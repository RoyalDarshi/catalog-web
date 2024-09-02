import { createTheme, PaletteOptions } from "@mui/material/styles";
import "@fontsource/poppins"; // Defaults to weight 400
interface CustomPaletteOptions extends PaletteOptions {
  neutral: {
    neutral1: string;
    neutral2: string;
    neutral3: string;
    neutral4: string;
    neutral5: string;
  };
}

export const EffigoColorTheme = createTheme({
  palette: {
    primary: {
      light: "#0748AE",
      main: "#012954",
    },
    secondary: {
      main: "rgba(37, 111, 179, 0.08)", //8%
      light: "rgba(37, 111, 179, 0.03)", //3%
      dark: "#21AADF",
    },
    success: {
      main: "#47C746",
    },
    error: {
      main: "#E8415B",
    },
    neutral: {
      neutral1: "#868686",
      neutral2: "#AAAAAE",
      neutral3: "#C6C8C9",
      neutral4: "#E2E1E6",
      neutral5: "#F5F5F5",
    },
    components:{
        MuiFormLabel:{
          root:{
            fontFamily: [
                "Poppins,serif",
            ],
            fontsize: 14
          }
        },

      MuiButtonBase:{
          root:{
            fontFamily: ["Poppins ,serif"]
          }
      },
      MuiTab:{
          root:{
            fontFamily:["Poppins ,serif"],
            fontSize: 20
          }
      }
    },
    typography: {
      fontFamily: [
          "Poppins,serif",
          'sans-serif',
          ].join(',') ,
      fontStyle: "medium",
      body1:{
        fontSize: 14,
        fontWeight: 500,
      },
      button:{
        fontSize: 14,
        fontWeight: 500,
        fontStyle: 'normal',
      },
      label:{
        fontsize: 14
      }

    }
  } as CustomPaletteOptions,
});
