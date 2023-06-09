import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'dark'
};

const theme = extendTheme({
   config,
   colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "121212",
      900: "#111"
    },
    yellow: {
      50: '#FFFBEA',
      100: '#FFF3B0',
      200: '#FCE588',
      300: '#F6E05E',
      400: '#F7C948',
      500: '#ECC94B',
      600: '#D69E2E',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
   }
  });

export default theme;