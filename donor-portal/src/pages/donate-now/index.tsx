import { useEffect, useState } from "react";
import { HeaderImage } from "../layout/header-image";
import { Page } from "../layout/page";
import "./styles.css";

type DonorOrganization = {
  orgName: string;
  orgLink: string;
  orgDescription: string;
};

export function DonateNow() {
  const [donorOrgs, setDonorOrgs] =
    useState<
      Array<{ continent: string; organizations: Array<DonorOrganization> }>
    >();

  useEffect(() => {
    setDonorOrgs([
      {
        continent: "North America",
        organizations: [
          {
            orgName: "Sri Lanka Medical Fund",
            orgDescription:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis",
            orgLink: "#",
          },
          {
            orgName: "Sri Lanka Medical Fund",
            orgDescription:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis",
            orgLink: "#",
          },
          {
            orgName: "Sri Lanka Medical Fund",
            orgDescription:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis",
            orgLink: "#",
          },
        ],
      },
      {
        continent: "Europe",
        organizations: [
          {
            orgName: "Sri Lanka Medical Fund",
            orgDescription:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis",
            orgLink: "#",
          },
          {
            orgName: "Sri Lanka Medical Fund",
            orgDescription:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis",
            orgLink: "#",
          },
        ],
      },
    ]);
  });

  return (
    <Page className="donate-now-page">
      <HeaderImage imageUrl="https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
        <div className="header-image-content">
          <h1>Donate Now</h1>
        </div>
      </HeaderImage>
      <div className="donate-now-container">
        <p>
          If you are an individual, please reach out to our partners below to
          donate to Elixir. Please connect directly with a partner in a
          jurisdiction closest to you. Our partners will provide details of the
          aid package they are supporting and will provide you options to
          donate. You can check the status of the aid package from our home
          page.
        </p>

        <div className="donation-org-container">
          {donorOrgs?.map((organizationGroup) => (
            <div className="donation-org-group">
              <h1>{organizationGroup.continent}</h1>
              {organizationGroup.organizations.map((org) => (
                <div className="donation-org-row">
                  <div className="donation-org-row__text">
                    <h3>{org.orgName}</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis
                    </p>
                  </div>

                  <a href={org.orgLink} className="btn">
                    Donate
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
