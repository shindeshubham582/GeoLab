import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body,
      #root {
        width: 100%;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background: #f8f9fa;
        color: #333;
      }

      /* Scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #667eea;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #764ba2;
      }

      /* Selection color */
      ::selection {
        background-color: #667eea;
        color: white;
      }

      ::-moz-selection {
        background-color: #667eea;
        color: white;
      }

      /* Link styling */
      a {
        color: #667eea;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      /* Button styling */
      button {
        font-family: inherit;
      }

      /* Input and textarea styling */
      input,
      textarea,
      select {
        font-family: inherit;
      }

      /* Code styling */
      code,
      pre {
        background-color: #f5f5f5;
        border-radius: 4px;
        padding: 2px 6px;
        font-family: "Courier New", monospace;
        font-size: 0.9em;
      }

      pre {
        padding: 12px;
        overflow-x: auto;
      }
    `}
  />
);
