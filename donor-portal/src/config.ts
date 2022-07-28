export default {
  clientID: "LZqQ7Ze31x5sJOBxffwimfSfpj8a",
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
  resourceServerURLs: [
    "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0",
    "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/donor-api/1.0.0",
    "https://9d2b57ae-4349-44f2-971c-106ae09d244d-dev.e1-us-east-azure.choreoapis.dev/qmov/donor-api/1.0.0",
  ],
  disableTrySignInSilently: false,
};
