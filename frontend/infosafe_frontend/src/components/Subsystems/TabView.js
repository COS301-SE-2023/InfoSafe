import RoleCreation from "../Roles/RoleCreation";
import {Users} from "./Users";
import {DataScopes} from "./DataScopes";
import {AccessRequests} from "./AccessRequests";
import {ComplianceMatrix} from "./ComplianceMatrix";
import {Devices} from "./Devices";
import {SupportRequests} from "./SupportRequests";
import {Risks} from "./Risks";
import {Requests} from "./Requests";
import {AssetRequest} from "./AssetRequest";
import {Dashboard} from "../Dashboard";

export const TabView = ({currentTab}) => {
    switch (currentTab){
        case 0:
        {
            return (<Dashboard></Dashboard>);
        }
        case 1:
        {
            return(<RoleCreation></RoleCreation>);
        }
        case 2:
        {
            return (<Users></Users>);
        }
        case 3:
        {
            return (<DataScopes></DataScopes>);
        }
        case 4:
        {
            return (<AccessRequests></AccessRequests>);
        }
        case 5:
        {
            return (<ComplianceMatrix></ComplianceMatrix>);
        }
        case 6:
        {
            return (<Devices></Devices>);
        }
        case 7:
        {
            return (<SupportRequests></SupportRequests>);
        }
        case 8:
        {
            return (<Risks></Risks>);
        }
        case 9:
        {
            return (<Requests></Requests>);
        }
        case 10:
        {
            return (<AssetRequest></AssetRequest>);
        }
        default:
        {
            return null;
        }
    }
}