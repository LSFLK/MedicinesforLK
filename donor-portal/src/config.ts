import { AuthReactConfig, Storage } from "@asgardeo/auth-react";
import { STSClientConfig } from "@asgardeo/token-exchange-plugin";

const SDKConfig: AuthReactConfig | STSClientConfig = {
  clientID: "LZqQ7Ze31x5sJOBxffwimfSfpj8a",
  baseUrl: "https://api.asgardeo.io/t/elixir",
  signInRedirectURL: `${process.env.REACT_APP_SIGN_IN_REDIRECT_URL}`,
  signOutRedirectURL: `${process.env.REACT_APP_SIGN_OUT_REDIRECT_URL}`,
  scope: ["openid", "email", "profile"],
  stsConfig: {
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    orgHandle: "elixir",
    scope: [],
  },
  storage: Storage.WebWorker,
  stsTokenEndpoint: "https://sts.choreo.dev/oauth2/token",
  resourceServerURLs: [`${process.env.REACT_APP_DONOR_BACKEND_URL}`],
  disableTrySignInSilently: false,
};

export default SDKConfig;
