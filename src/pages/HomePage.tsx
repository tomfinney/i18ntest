/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useContext, useEffect } from "react";
import { I18nContext } from "../i18n/i18n-react";
import { Locales } from "../i18n/i18n-types";

export function HomePage() {
  const thing = useContext(I18nContext);

  useEffect(() => {
    thing.setLocale("en");
  }, []);

  return (
    <div
      css={css`
        max-width: 500px;
        margin: 0 auto;
        min-height: 100vh;
      `}
    >
      <h1>test</h1>
      <select onChange={(e) => thing.setLocale(e.target.value as Locales)}>
        <option value="en">en</option>
        <option value="de">de</option>
      </select>

      <p>{thing.LL.HI({ name: "aaa" })}</p>
      <p>{thing.LL.b()}</p>
    </div>
  );
}
