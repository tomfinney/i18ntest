require("dotenv").config();

import fetch from "node-fetch";

import { BaseTranslation } from "typesafe-i18n";
import {
  storeTranslationToDisk,
  ImportLocaleMapping,
} from "typesafe-i18n/importer";

import { Locales } from "../../i18n/i18n-types";

const getDataFromAPI = async (_locale: Locales): Promise<BaseTranslation> => {
  // custom implementation to fetch the data from a service

  return {
    HI: "Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n",
    importer: "This example demonstrates the importer functionality",
    "my-namespace": {
      i: {
        am: {
          inside: {
            a: {
              namespace: "I am a nested translation located inside a namespace",
            },
          },
        },
      },
    },
  };
};

const getDataFromSL = async (locale: Locales) => {
  const response = await fetch(
    `https://api.simplelocalize.io/api/v3/export?downloadFormat=single-language-json&languageKey=${locale}`,
    {
      method: "GET",
      headers: {
        "X-SimpleLocalize-Token": process.env.SIMPLE_LOCALISE_KEY || "",
      },
    }
  );

  const responseJson: {
    msg: string;
    status: number;
    data: {
      fileKey: string;
      url: string;
    };
  } = await response.json();

  console.log(JSON.stringify(responseJson, null, 2));

  const tResponse = await fetch(responseJson.data.url);
  const tResponseJson = await tResponse.json();

  return tResponseJson;
};

const deepen = (obj: Record<string, any>) => {
  const result: any = {};

  // For each object path (property key) in the object
  for (const objectPath in obj) {
    // Split path into component parts
    const parts = objectPath.split(".");

    // Create sub-objects along path as needed
    let target = result;
    while (parts.length > 1) {
      const part = parts.shift();
      //@ts-ignore
      target = target[part] = target[part] || {};
    }

    // Set value at end of path
    target[parts[0]] = obj[objectPath];
  }

  return result;
};

const importTranslationsForLocale = async (locale: Locales) => {
  const translations = await getDataFromSL(locale);
  const dotNotationToFull = deepen(translations);

  const localeMapping: ImportLocaleMapping = {
    locale,
    translations: dotNotationToFull.translations,
    namespaces: dotNotationToFull.namespaces,
  };

  const result = await storeTranslationToDisk(localeMapping);
  console.log(`translations imported for locale '${result}'`);
};

//  importTranslationsForLocale("en");
importTranslationsForLocale("fr-FR");
