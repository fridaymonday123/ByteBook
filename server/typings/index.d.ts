declare module "sequelize-encrypted";

declare module "styled-components-breakpoint";

declare module "formidable/lib/file";

declare module "oy-vey";

declare module "dotenv";

declare module "email-providers" {
  const list: string[];
  export default list;
}

declare module "@joplin/turndown-plugin-gfm" {
  import { Plugin } from "turndown";

  export const strikethrough: Plugin;
  export const tables: Plugin;
  export const taskListItems: Plugin;
  export const gfm: Plugin;
}
