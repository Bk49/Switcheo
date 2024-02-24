import { createTheme } from "@mui/material/styles";
import { CSSProperties } from "@mui/material/styles/createTypography";
import Anta from "../fonts/Anta-Regular.ttf";
import KodeMono from "../fonts/KodeMono-Regular.ttf";

/**
 * Declares common CSS Properties for all 3 headings
 * @returns {CSSProperties}
 */
const headingPalette: CSSProperties = {
    fontFamily: "BebasNueue",
    fontWeight: "400",
    textTransform: "uppercase",
    textAlign: "left",
};

/**
 * Modify the types for the Typography module to remove h4, h5, h6, caption and overline
 */
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        h4: false;
        h5: false;
        h6: false;
        caption: false;
        overline: false;
    }
}

const theme = createTheme();

/**
 * Creates a new default theme for the application
 *
 * Contains the primary and secondary color palette
 * Contains all the necessary Typography settings as well
 *
 * @todo Add in dynamic font size to cater for different screen sizes
 * @returns {Theme} A default theme for the application
 *
 */
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#651FFF",
            light: "#834BFF",
            dark: "#4615B2",
            contrastText: "#fff",
        },

        secondary: {
            main: "#00B0FF",
            light: "#33BFFF",
            dark: "#007BB2",
            contrastText: "#fff",
        },
    },

    typography: {
        fontFamily: ["Anta", "Kodemono"].join(","),

        allVariants: {
            textTransform: "none",
        },

        h1: {
            ...headingPalette,
            fontSize: "3rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "2.5rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "2rem",
            },
        },

        h2: {
            ...headingPalette,
            fontSize: "2.25rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "2rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "1.75rem",
            },
        },

        h3: {
            ...headingPalette,
            fontSize: "2rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "1.7rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "1.4rem",
            },
        },

        h4: undefined,
        h5: undefined,
        h6: undefined,

        button: {
            fontFamily: "Anta",
            fontWeight: "bold",
            fontSize: "0.9375rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "0.8rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.7rem",
            },
        },

        body1: {
            fontFamily: "Anta",
            fontSize: "1.25rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "1.05rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.9rem",
            },
        },

        body2: {
            fontFamily: "Anta",
            fontSize: "0.9375rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "0.8rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.7rem",
            },
        },

        subtitle1: {
            fontFamily: "KodeMono",
            fontSize: "1rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "0.85rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.65rem",
            },
        },

        subtitle2: {
            fontFamily: "KodeMono",
            fontSize: "0.75rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "0.7rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.65rem",
            },
        },

        caption: {
            fontFamily: "KodeMono",
            fontSize: "0.75rem",
            [theme.breakpoints.down("md")]: {
                fontSize: "0.7rem",
            },
            [theme.breakpoints.down("sm")]: {
                fontSize: "0.65rem",
            },
        },
        overline: undefined,
    },

    components: {
        MuiCssBaseline: {
            /**
             * The following styles overrides declares the custom fonts used in the application
             */
            styleOverrides: `
               
                @font-face {
                    font-family: 'Anta';
                    src: url(${Anta}) format('ttf');
                    font-weight: normal;
                    font-style: normal;
                }
                
                @font-face {
                    font-family: 'KodeMono';
                    src: url(${KodeMono}) format('woff2');
                    font-weight: normal;
                    font-style: normal;
                }
            `,
        },
    },
});

export default defaultTheme;
