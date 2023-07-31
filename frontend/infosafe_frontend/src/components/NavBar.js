import '../styling/NavBar.css';
import React, {useState} from 'react';
import ISO from './Roles/ISO';
import DISO from './Roles/DISO';
import DataCustodian from './Roles/DataCustodian';
import AssetManager from "./Roles/AssetManager";
import Employee from "./Roles/Employee";

const NavBar = ({ systemRole }) => {
    const [activeNavTab, activate] = useState(
        systemRole === 'ISO' || systemRole === 'DISO' || systemRole === 'System Administrator' ? 0 : 1
    );
    const ISOTabs = [ 0, 1, 2, 3, 4, 5, 6, 7];
    const DISOTabs = [ 0, 1, 2, 3, 4, 5, 6, 7];
    const DataCustodianTabs = [ 1, 2, 3, 4, 5, 6, 7];
    const AssetManagerTabs = [ 1, 3, 4, 5, 8, 7];
    const EmployeeTabs = [ 1, 3, 4, 5, 7];
    const TabNames = ['Users', 'Data Scopes', 'Access Requests', 'Compliance Matrix', 'Devices', 'Support Requests', 'Risks', 'Requests', 'Asset Requests'];
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
