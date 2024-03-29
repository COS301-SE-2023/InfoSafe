import React from "react";
import RoleCreation from "../Roles/RoleCreation";
import {Users} from "./Users";
import {DataScopes} from "./DataScopes";
import {AccessRequests} from "./AccessRequests";
import {Tasks} from "./Tasks";
import {Devices} from "./Devices";
import {SupportRequests} from "./SupportRequests";
import {Risks} from "./Risks";
import {Requests} from "./Requests";
import {AssetRequest} from "./AssetRequest";
import {Dashboard} from "../Charts/Dashboard";
import {About} from "../About";
import {Help} from "../Help";

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
            return (<Tasks></Tasks>);
        }
        case 5:
        {
            return (<Devices></Devices>);
        }
        case 6:
        {
            return (<Risks></Risks>);
        }
        case 7:
        {
            return (<Requests></Requests>);
        }
        case 8:
        {
            return (<AccessRequests></AccessRequests>);
        }
        case 9:
        {
            return (<AssetRequest></AssetRequest>);
        }
        case 10:
        {
            return (<SupportRequests></SupportRequests>);
        }
        case 11:
        {
            return (<About></About>)
        }
        case 12:
        {
            return (<Help></Help>)
        }
        default:
        {
            return null;
        }
    }
}