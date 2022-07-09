import React from "react";
import { useHistory } from "react-router-dom";
import { AidPackage } from "types/AidPackage";

interface TableRowProps {
    aidPackage: AidPackage;
}

export function TableRow(props: TableRowProps) {
    const { aidPackage } = props;
    const history = useHistory();
    const navigate = (path: string) => {
        history.push(path);
    };

    function handlePledgesButton(packageId: number) {
        navigate(`/packages/${packageId}/pledge-status`);
    }

    function handleDetailsButton(packageId: number) {
        navigate(`/packages/${packageId}`);
    }

    return (
        <tr key={aidPackage.packageID}>
            <td>{aidPackage.name}</td>
            <td>{aidPackage.status}</td>
            <td>
                {(
                    (aidPackage.receivedAmount / aidPackage.goalAmount ||
                        0) * 100
                ).toFixed(0)}
                %
            </td>
            <td>--</td>
            <td>
                <button
                    onClick={() =>
                        handleDetailsButton(aidPackage.packageID)
                    }
                >
                    Details
                </button>
                <button
                    onClick={() =>
                        handlePledgesButton(aidPackage.packageID)
                    }
                >
                    Pledges
                </button>
            </td>
        </tr>
    );
}