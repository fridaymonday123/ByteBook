import * as React from "react";
import { Redirect } from "react-router-dom";
import env from "~/env";
import useStores from "~/hooks/useStores";

const Logout = () => {
  const { auth } = useStores();
  void auth.logout();
  if (env.OIDC_LOGOUT_URI) {
    window.location.replace(env.OIDC_LOGOUT_URI);
    return null;
  }
  return <Redirect to="/" />;
};

export default Logout;
