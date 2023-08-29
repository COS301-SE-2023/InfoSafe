import '../styling/NavBar.css';
import React, {useState} from 'react';
import ISO from './OldFiles/ISO';
import DISO from './OldFiles/DISO';
import DataCustodian from './OldFiles/DataCustodian';
import AssetManager from "./OldFiles/AssetManager";
import Employee from "./OldFiles/Employee";

const NavBar = ({ systemRole }) => {
    const [activeNavTab, activate] = useState(
        systemRole === 'ISO' || systemRole === 'DISO' || systemRole === 'System Administrator' ? 0 : 1
    );
    const ISOTabs = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];
    const DISOTabs = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];
    const DataCustodianTabs = [ 1, 2, 3, 4, 5, 6, 7, 8];
    const AssetManagerTabs = [ 1, 3, 4, 5, 9, 7];
    const EmployeeTabs = [ 1, 3, 4, 5, 8];
    const TabNames = ['Role Creation', 'Users', 'Data Scopes', 'Access Requests', 'Compliance Matrix', 'Devices', 'Support Requests', 'Risks', 'Requests', 'Asset Requests'];
    const handleClick = (NavTabIndex) => {
        activate(NavTabIndex);
    };

    const displayPage = () => {
        if (systemRole === 'ISO') {
            return (
                <div className="navbar">
                    {displayTabs({viewTabs: ISOTabs})}
                    <ISO currentTab={activeNavTab} />;
                </div>
            );
        }

        if (systemRole === 'DISO') {
            return (
                <div className="navbar">
                    {displayTabs({viewTabs: DISOTabs})}
                    <DISO currentTab={activeNavTab} />;
                </div>
            );
        }

        if (systemRole === 'DATA_CUSTODIAN') {
            return (
                <div className="navbar">
                    {displayTabs({viewTabs: DataCustodianTabs})}
                    <DataCustodian currentTab={activeNavTab} />;
                </div>
            );
        }

        if (systemRole === 'ASSET_MANAGER') {
            return (
                <div className="navbar">
                    {displayTabs({viewTabs: AssetManagerTabs})}
                    <AssetManager currentTab={activeNavTab} />;
                </div>
            );
        }

        if (systemRole === 'EMPLOYEE') {
            return (
                <div className="navbar">
                    {displayTabs({viewTabs: EmployeeTabs})}
                    <Employee currentTab={activeNavTab} />;
                </div>
            );
        }
    };

    const displayTabs = ({viewTabs}) => {
        return (
            <ul className="tabs">
                {viewTabs.map((i) => (
                    <li
                        key={i}
                        className={activeNavTab === i ? 'active' : ''}
                        onClick={() => handleClick(i)}
                    >
                        {TabNames[i]}
                    </li>
                ))}
            </ul>
        );
    };

    return displayPage();

};
export default NavBar;
