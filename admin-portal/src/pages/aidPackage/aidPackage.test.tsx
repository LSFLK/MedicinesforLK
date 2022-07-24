import { render, screen, waitFor } from "@testing-library/react";
import { CreateAidPackage } from "./aidPackage";
import { MemoryRouter } from "react-router-dom";
import { AidPackageService } from "apis/services/AidPackageService";
import { MedicalNeedsService } from "apis/services/MedicalNeedsService";

test("renders package detail header", async () => {
  AidPackageService.getAidPackage = jest.fn().mockReturnValue({});
  AidPackageService.getAidPackages = jest.fn().mockReturnValue({});
  AidPackageService.getUpdateComments = jest.fn().mockReturnValue({ data: [] });
  MedicalNeedsService.getMedicalNeeds = jest
    .fn()
    .mockResolvedValue({ data: [] });

  render(
    <MemoryRouter>
      <CreateAidPackage />
    </MemoryRouter>
  );

  screen.getByText("Create an Aid Package");

  const assignSuppliersButton = screen.getByRole("button", {
    name: /assign suppliers/i,
  });
  expect(assignSuppliersButton).toHaveClass("active");

  const managePackageButton = screen.getByRole("button", {
    name: /manage aid packages/i,
  });
  await waitFor(() => expect(managePackageButton).not.toHaveClass("active"));
});

// --- assign suppliers
// TODO: loaded needs should display correctly
// TODO: needs should expand to show quotations

// TODO: quotations should validate
// TODO: needs should validate

// TODO: next should create new aid packages

// --- manage packages
// TODO: should allow changing description
// TODO: should allow changing name
// TODO: should handle publish
// TODO: should handle publish as draft
