import env from "../env";

export function slackAuth(
  state: string,
  scopes: string[] = [
    "identity.email",
    "identity.basic",
    "identity.avatar",
    "identity.team",
  ],
  clientId: string,
  redirectUri = `${env.URL}/auth/slack.callback`
): string {
  const baseUrl = "https://slack.com/oauth/authorize";
  const params = {
    client_id: clientId,
    scope: scopes ? scopes.join(" ") : "",
    redirect_uri: redirectUri,
    state,
  };
  const urlParams = Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
  return `${baseUrl}?${urlParams}`;
}

export function githubUrl(): string {
  return "https://www.github.com/fridaymonday123";
}

export function githubIssuesUrl(): string {
  return "https://www.github.com/fridaymonday123/RichBook/issues";
}

export function twitterUrl(): string {
  return "https://twitter.com/richbook";
}

export function feedbackUrl(): string {
  return "https://www.richbook.ai/contact";
}

export function developersUrl(): string {
  return "https://www.richbook.ai/developers";
}

export function changelogUrl(): string {
  return "https://www.richbook.ai/changelog";
}

export const SLUG_URL_REGEX = /^(?:[0-9a-zA-Z-_~]*-)?([a-zA-Z0-9]{10,15})$/;

export const SHARE_URL_SLUG_REGEX = /^[0-9a-z-]+$/;