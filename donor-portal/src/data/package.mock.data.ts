/**
 * helper functions associated with Aid Packages.
 * mock data.
 */

import { AidPackage } from "../pages/package";

/**
 * fetches an aid package identified by the pkgId.
 * @param pkgId Aid Package ID.
 * @returns AidPackage
 */
export function fetchPackageData(pkgId: string): Promise<AidPackage> {
  return new Promise((res) => {
    res({
      id: pkgId,
      title: "Medical Supplies  | Anuradhapura",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      goal: 100,
      pledged: 50,
      image: "https://picsum.photos/1200/300",
      items: [],
    });
  });
}
