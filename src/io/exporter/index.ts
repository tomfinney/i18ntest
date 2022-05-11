require("dotenv").config();

import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import path from "path";

import {
  readTranslationFromDisk,
  ExportLocaleMapping,
} from "typesafe-i18n/exporter";

const sendDataToAPI = async (exportMapping: ExportLocaleMapping) => {
  // custom implementation to store the data to a service

  console.log(JSON.stringify(exportMapping, null, 2));

  const form = new FormData();
  const buffer = fs.readFileSync(
    path.join(__dirname, "../../i18n/en/test.json")
  );

  form.append("Content-Type", "application/octet-stream");
  form.append("file", buffer);

  const response = await fetch(
    "https://api.simplelocalize.io/api/v2/import?uploadFormat=single-language-json&languageKey=en",
    {
      method: "POST",
      headers: {
        "X-SimpleLocalize-Token": process.env.SIMPLE_LOCALISE_KEY || "",
        "Content-Type": "multipart/form-data; boundary=" + form.getBoundary(),
      },
      body: form,
    }
  );

  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
};

const exportTranslationsForLocale = async (locale: string) => {
  const mapping = await readTranslationFromDisk(locale);

  await sendDataToAPI(mapping);
};

exportTranslationsForLocale("en");
