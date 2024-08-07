import { retry } from "./retry";

const verifyVersion = (version: string): string => {
  if (version === "latest") return version;
  const isSemVer = /^\d+\.\d+\.\d+(?:-canary\.\d+)?$/.test(version);
  if (isSemVer) return version;
  return "latest";
};

const getSdkFile = (version: string, path: string): Promise<string> =>
  retry(() =>
    fetch(`https://unpkg.com/@flows/js@${verifyVersion(version)}${path}`).then((res) => {
      if (!res.ok) throw new Error();
      return res.text();
    }),
  );

export const getDefaultCssMinVars = (version = "latest"): Promise<string> =>
  getSdkFile(version, "/css.min/vars.css");

export const getDefaultCssMinTemplate = (version = "latest"): Promise<string> =>
  getSdkFile(version, "/css.min/template.css");

export const getDefaultCssVars = (version = "latest"): Promise<string> =>
  getSdkFile(version, "/css/vars.css");

export const getDefaultCssTemplate = (version = "latest"): Promise<string> =>
  getSdkFile(version, "/css/template.css");
