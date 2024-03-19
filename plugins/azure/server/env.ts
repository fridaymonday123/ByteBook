import { IsOptional } from "class-validator";
import { Environment } from "@server/env";
import environment from "@server/utils/environment";
import { CannotUseWithout } from "@server/utils/validators";

class AzurePluginEnvironment extends Environment {
  /**
   * Azure OAuth2 client credentials. To enable authentication with Azure.
   */
  @IsOptional()
  @CannotUseWithout("AZURE_CLIENT_SECRET")
  public AZURE_CLIENT_ID = this.toOptionalString(environment.AZURE_CLIENT_ID);

  @IsOptional()
  @CannotUseWithout("AZURE_CLIENT_ID")
  public AZURE_CLIENT_SECRET = this.toOptionalString(
    environment.AZURE_CLIENT_SECRET
  );

  @IsOptional()
  @CannotUseWithout("AZURE_CLIENT_ID")
  public AZURE_RESOURCE_APP_ID = this.toOptionalString(
    environment.AZURE_RESOURCE_APP_ID
  );
}

export default new AzurePluginEnvironment();
