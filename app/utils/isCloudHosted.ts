import env from "~/env";

/**
 * True if the current installation is the cloud hosted version at bytebook.ai
 */
const isCloudHosted = [
  "https://app.bytebook.ai",
  "https://app.bytebook.ai",
  "https://app.bytebook.ai:3000",
].includes(env.URL);

export default isCloudHosted;
