function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;

  if (configured !== undefined && configured.length > 0) {
    return stripTrailingSlash(configured);
  }

  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl !== undefined && vercelUrl.length > 0) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}
