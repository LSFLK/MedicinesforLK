import axios from "axios";

export const adminHttp = axios.create({
  baseURL:
    "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0",
});

export const donorHttp = axios.create({
  baseURL : "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/donor-api/1.0.0"
})
