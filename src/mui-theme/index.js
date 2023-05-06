// https://mui.com/material-ui/customization/theming/

import { createTheme } from "@mui/material";
import { rem } from "../utils/pxToRem";

export default createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#fff",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: "pointer !important",
          borderRadius: "4px !important",
          border: "none",
          textTransform: "none",
          boxShadow: "none !important",
          fontSize: `${rem(16)} !important`,
          lineHeight: `${rem(18)} !important`,
          fontWeight: "500 !important",
          padding: `${rem(6)} ${rem(12)}`,
          transition: "all 0.2s ease-in-out",
          height: `${rem(48)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7AC29",
          "@media (max-width: 768px)": {
            height: `${rem(40)}`,
            fontSize: `${rem(12)} !important`,
          },
          "&:hover": {
            border: "none",
            boxShadow: "none !important",
            background: "#F7AC29",
            opacity: "0.8",
          },
          svg: {
            marginRight: 0,
          },
        },
        outlined: {
          color: "#108292",
          background: "#EEF0F2",
          padding: `${rem(12)} ${rem(24)}`,
          "&:hover": {
            color: "#108292",
            background: "#EEF0F2",
          },
        },
        contained: {
          padding: `${rem(12)} ${rem(24)}`,
          color: "#fff",
          background: "#108292",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: rem(16),
          paddingRight: rem(16),
          "@media (min-width:1440px)": {
            maxWidth: "1248px",
            width: "100%",
          },
          "@media (min-width:1200px)": {
            paddingLeft: rem(16),
            paddingRight: rem(16),
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "none",
        },
      },
    },
  },
});
