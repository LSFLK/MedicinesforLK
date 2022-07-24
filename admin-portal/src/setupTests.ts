// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

import { HttpRequestConfig } from "@asgardeo/auth-spa";
import Http from "apis/httpCommon";
import { AidPackageService } from "apis/services/AidPackageService";
import { MedicalNeedsService } from "apis/services/MedicalNeedsService";
import { PledgeService } from "apis/services/PledgeService";
import { SupplierService } from "apis/services/SupplierService";

beforeAll(() => {
  let httpRequest: (httpConfig: HttpRequestConfig) => Promise<any> = (config) =>
    Promise.resolve({});

  const http: Http = new Http(
    httpRequest,
    "https://9d2b57ae-4349-44f2-971c-106ae09d244d-prod.e1-us-east-azure.choreoapis.dev/qmov/admin-api/1.0.0"
  );
  AidPackageService.http = http;
  MedicalNeedsService.http = http;
  PledgeService.http = http;
  SupplierService.http = http;

  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
