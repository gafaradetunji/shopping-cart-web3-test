import "@mui/material/styles";

interface ThemeExtension {
  /**
   * Dummy field to avoid `no-empty-object-type` lint error
   */
  _augmentedBrand?: never; // remove when you are set to theme
}

declare module "@mui/material/styles" {
  interface Theme extends ThemeExtension {
    /**
     * Dummy field to avoid `no-empty-object-type` lint error
     */
    _augmentedBrand?: never;
  }

  interface ThemeOptions extends ThemeExtension {
    /**
     * Same dummy field for ThemeOptions
     */
    _augmentedBrand?: never;
  }
}

export {};
