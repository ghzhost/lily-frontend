export interface PublicEnv {
  siteUrl: string;
  apiBaseUrl?: string;
}

export function parsePublicEnv(raw: Record<string, string | undefined>): PublicEnv {
  const siteUrlRaw = raw.NEXT_PUBLIC_SITE_URL;
  if (!siteUrlRaw) {
    throw new Error(
      "Missing required environment variable NEXT_PUBLIC_SITE_URL. Copy .env.example to .env.local and set it.",
    );
  }

  let siteUrlObj: URL;
  try {
    siteUrlObj = new URL(siteUrlRaw);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL");
  }

  if (siteUrlObj.protocol !== "http:" && siteUrlObj.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https");
  }

  const apiBaseUrlRaw = raw.NEXT_PUBLIC_API_BASE_URL;
  let apiBaseUrl: string | undefined;

  if (apiBaseUrlRaw !== undefined && apiBaseUrlRaw !== "") {
    let apiUrlObj: URL;
    try {
      apiUrlObj = new URL(apiBaseUrlRaw);
    } catch {
      throw new Error("NEXT_PUBLIC_API_BASE_URL must be an absolute http(s) URL");
    }

    if (apiUrlObj.protocol !== "http:" && apiUrlObj.protocol !== "https:") {
      throw new Error("NEXT_PUBLIC_API_BASE_URL must use http or https");
    }
    apiBaseUrl = apiBaseUrlRaw.replace(/\/+$/, "");
  }

  return {
    siteUrl: siteUrlRaw.replace(/\/+$/, ""),
    ...(apiBaseUrl ? { apiBaseUrl } : {}),
  };
}

export const env = {
  get siteUrl() {
    return parsePublicEnv(process.env).siteUrl;
  },
  get apiBaseUrl() {
    return parsePublicEnv(process.env).apiBaseUrl;
  },
};
