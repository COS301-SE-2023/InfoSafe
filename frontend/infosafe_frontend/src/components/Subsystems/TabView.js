import RoleCreation from "../Roles/RoleCreation";
import {Users} from "./Users";
import {DataScopes} from "./DataScopes";
import {AccessRequests} from "./AccessRequests";
import {ComplianceMatrix} from "./ComplianceMatrix";
import {Devices} from "./Devices";
import {SupportRequests} from "./SupportRequests";
import {Risks} from "./Risks";
import Requests from "./Requests";
import {AssetRequest} from "./AssetRequest";

export const TabView = ({currentTab}) => {
    switch (currentTab){
        case 0:
        {
            return(<RoleCreation></RoleCreation>)
        }
        case 1:
        {
            return (<Users></Users>);
        }
        case 2:
        {
            return (<DataScopes></DataScopes>);
        }
        case 3:
        {
            return (<AccessRequests></AccessRequests>);
        }
        case 4:
        {
            return (<ComplianceMatrix></ComplianceMatrix>);
        }
        case 5:
        {
            return (<Devices></Devices>);
        }
        case 6:
        {
            return (<SupportRequests></SupportRequests>);
        }
        case 7:
        {
            return (<Risks></Risks>);
        }
        case 8:
        {
            return (<Requests></Requests>);
        }
        case 9:
        {
            return (<AssetRequest></AssetRequest>);
        }
        default:
        {
            return null;
        }
    }
}