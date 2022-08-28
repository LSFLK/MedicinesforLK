import { AuthReactConfig, Storage } from "@asgardeo/auth-react";
import { STSClientConfig } from "@asgardeo/token-exchange-plugin";

const SDKConfig: AuthReactConfig & STSClientConfig = {
  clientID: "W_ZaTLGR20OKy0HTYPqSAJvuS5Ia",
  baseUrl: "https://api.asgardeo.io/t/elixir",
  signInRedirectURL: `${process.env.REACT_APP_SIGN_IN_REDIRECT_URL}`,
  signOutRedirectURL: `${process.env.REACT_APP_SIGN_OUT_REDIRECT_URL}`,
  scope: ["openid", "email", "profile"],
  // Revert this back to `Storage.WebWorker` once,
  // https://github.com/asgardeo/asgardeo-auth-react-sdk/issues/120 is fixed.
  storage: Storage.SessionStorage,
  stsConfig: {
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    orgHandle: "elixir",
    scope: [],
  },
  stsTokenEndpoint: "https://sts.choreo.dev/oauth2/token",
  resourceServerURLs: [`${process.env.REACT_APP_ADMIN_BACKEND_URL}`],
};

export default SDKConfig;
