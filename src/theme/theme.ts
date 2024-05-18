import { createTheme } from "@mui/material/styles";
import { primary, severityBgColor, severityColor } from "@/theme/colors";
import { getScale } from "@/utils";

declare module "@mui/material/styles" {
  interface CommonColors {
    darkBlue: string;
  }
}

/**
 * Old theme, left this code here in case there is design variations
 * TODO: remove these lines after the new design is made
 */
// const themeBase = createTheme({
//   typography: {
//     htmlFontSize: 10, // Need this because we use 10px simplification for fonts https://mui.com/customization/typography/#html-font-size
//   },
//   palette: {
//     primary: {
//       main: '#000000',
//       dark: '#000000',
//       light: '#444444',
//     },
//     secondary: {
//       main: '#41E2BA',
//       dark: '#00C19C',
//     },
//     warning: {
//       main: '#BF5600',
//     },
//     action: {
//       disabled: '#000000aa',
//     },
//   },
// });

const themeBase = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary,
    secondary: {
      main: "#FFFFFF",
    },
    warning: {
      main: "#BF5600",
    },
    action: {
      selected: "#6582A4",
    },
    text: {
      primary: "#203752",
      secondary: "#7E9BBC",
    },
    error: {
      main: "#C62828",
      light: "#DD00044D",
      dark: "#AA0003",
    },
    common: {
      darkBlue: "#0C7CBB",
    },
    info: {
      main: "#50739B",
    },
  },
  breakpoints: {
    values: {
      xs: 0 * getScale(),
      sm: 600 * getScale(),
      md: 900 * getScale(),
      lg: 1200 * getScale(),
      xl: 1536 * getScale(),
    },
  },
});

export const buttonThemeBase = createTheme({
  typography: {
    htmlFontSize: 10, // Need this because we use 10px simplification for fonts https://mui.com/customization/typography/#html-font-size
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#41E2BA",
      dark: "#00C19C",
    },
    warning: {
      main: "#BF5600",
    },
    action: {
      disabled: "#222222",
      disabledBackground: "#444444",
    },
    error: {
      main: "#C62828",
    },
  },
});

export const theme = createTheme(themeBase, {
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          "&.MuiTableRow-hover:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          color: "primary",
          height: 48,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: severityBgColor.success,
          color: severityColor.success,
        },
        standardInfo: {
          backgroundColor: severityBgColor.info,
          color: severityColor.info,
        },
      },
    },
  },
});

export const darkTheme = createTheme(theme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      dark: "#ffffff",
      light: "#444444",
      contrastText: "#000000",
    },
    secondary: {
      main: "#666666",
      contrastText: "#ffffff",
    },
  },
});
