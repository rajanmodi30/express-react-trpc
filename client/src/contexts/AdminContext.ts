// Contexts.js
import { createContext } from "react";
import { ThemeContextInterface } from "../utils/types";

export const themeDefaults: ThemeContextInterface = {
  drawerWidth: 240,
};

export const AdminThemeContext = createContext(themeDefaults);
