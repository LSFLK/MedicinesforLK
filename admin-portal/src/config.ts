export default {
  clientID: "W_ZaTLGR20OKy0HTYPqSAJvuS5Ia",
  baseUrl: "https://api.asgardeo.io/t/elixir",
  signInRedirectURL: `${process.env.REACT_APP_SIGN_IN_REDIRECT_URL}`,
  signOutRedirectURL: `${process.env.REACT_APP_SIGN_OUT_REDIRECT_URL}`,
  scope: ["openid", "email", "profile"],
  stsConfig: {
    credentials: {
      client_id: `${process.env.REACT_APP_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    },
    orgHandle: "elixir",
    scope: [],
  },
  stsTokenEndpoint: "https://sts.choreo.dev/oauth2/token",
  resourceServerURLs: [`${process.env.REACT_APP_ADMIN_BACKEND_URL}`],
  disableTrySignInSilently: false,
};
