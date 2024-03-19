declare global {
  interface Window {
    env: Record<string, any>;
  }
}

const env = window.env;

if (!env) {
  throw new Error(
    "Config could not be be parsed. \nSee: https://docs.bytebook.ai/s/hosting/doc/troubleshooting-HXckrzCqDJ#h-config-could-not-be-parsed"
  );
}

export default env;
