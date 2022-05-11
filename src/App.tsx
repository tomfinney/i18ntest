/** @jsx jsx */
import { css, jsx, Global } from "@emotion/react";
import { colors, theme } from "./constants/theme";
import { Router } from "./Router";
import TypesafeI18n from "./i18n/i18n-react";

import { loadAllLocales } from "./i18n/i18n-util.sync";

// boo
loadAllLocales();

export function App() {
  return (
    <TypesafeI18n locale="en">
      <div>
        <Global
          styles={css`
            @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");

            * {
              box-sizing: border-box;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            body {
              color: ${theme.text.paragraph.color};
              margin: 0;
              font-size: 100%;
              font-family: Lato, sans-serif;
              line-height: 1.6;
              background-color: ${colors.white};
            }

            a {
              text-decoration: none;
            }

            b,
            strong {
              color: ${theme.form.text.color};
              font-weight: ${theme.form.text.weight};
            }

            label {
              display: block;
              color: ${theme.form.text.color};
              font-weight: ${theme.form.text.weight};
              margin-bottom: 0.75em;
            }

            input {
              border: 2px solid ${theme.form.border.color};
              border-radius: 0;
              padding: 6px;
              color: ${theme.form.text.color};
              font-weight: ${theme.form.text.weight};
              font-size: 100%;

              &:focus {
                outline: 1px solid ${theme.form.outline.color};
              }
            }
          `}
        ></Global>

        <div
          css={css`
            min-height: 100vh;
          `}
        >
          <Router />
        </div>
      </div>
    </TypesafeI18n>
  );
}
