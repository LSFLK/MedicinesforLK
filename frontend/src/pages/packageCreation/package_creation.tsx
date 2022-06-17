import React from "react";
import { PageSelection } from "../../types/pages";
import { Page } from "../layout/page";

interface PackageCreationPageProps {

}

export function PackageCreation(params: PackageCreationPageProps) {
    return (
        <Page selection={PageSelection.PACKAGE_CREATION}>
            <div>Package Creation</div>
        </Page>
    );
}
