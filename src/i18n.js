import i18n from "i18n-js";
import * as Enums from "./library/enums.js";

import en from "./locales/en.json";
import fa from "./locales/fa.json";

i18n.defaultLocale = "fa";
i18n.locale = "fa";
i18n.isRtl = true;
i18n.fallbacks = true;
i18n.translations = { en, fa };
i18n.fontFamily = {
  main: "IRANSansWeb(FaNum)",
  mainLight: "IRANSansWeb(FaNum)",
  mainBold: "IRANSansWeb(FaNum)",
  title: "IRANSansWeb(FaNum)",
  titleLight: "IRANSansWeb(FaNum)",
  titleBold: "IRANSansWeb(FaNum)",
  button: "IRANSansWeb(FaNum)",
  buttonLight: "IRANSansWeb(FaNum)",
  buttonBold: "IRANSansWeb(FaNum)"
};
i18n.enum = (name = "", value) => {
  const myEnum = Enums[name];
  const key = Object.keys(myEnum).find(key => myEnum[key] === value) || "";
  return i18n.t(`ENUMS__${name.toUpperCase()}_${key.toUpperCase()}`);
};

export default i18n;
