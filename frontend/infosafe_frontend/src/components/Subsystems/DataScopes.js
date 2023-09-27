import {CreateDataScopePopup} from "../Create/CreateDataScopePopup";
import React, {useState} from "react";
import ViewDataScope from "../View/ViewDataScope";
import {FaRegEdit, FaSearch} from "react-icons/fa";
import {EditDataScopePopup} from "../Edit/EditDataScopePopup";
import {RiDeleteBin6Fill, RiEditBoxFill} from "react-icons/ri";
import "../../styling/DataScopes.css";
import {useGetPerms} from "../getData/getPerms";
import {useGetDS} from "../getData/getDs";
import data from "bootstrap/js/src/dom/data";
import {IoHelpCircle} from "react-icons/io5";
import {HelpPopup} from "../HelpPopup";
import {useSupportRequests} from "../RequestRequests/SupportRequestRequests";
import delete_icon from "../../images/delete_icon.png";
import edit_icon from "../../images/edit_icon.png";
import datascope_icon from "../../images/create_datascope_icon.png";

export const DataScopes = () => {

    const {showDatascope, myDatascopes, loading } = useGetDS();
    const {roles} = useGetPerms();
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false);
    let viewDatascope = false;
    const EditDataScope = ({datascope}) => {
        const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
        if(roles.includes("data_scope_edit")) {
            return (
                <div className="dataScopesEditButton">
                    <RiEditBoxFill onClick={() => setEditDataScopeOpen(true)} className="dataScopesEditIcon"/>
                    {editDataScopeOpen ? (
                        <EditDataScopePopup
                            popupClose={() => setEditDataScopeOpen(false)}
                            popupOpen={editDataScopeOpen}
                            datascope={datascope}
                        />
                    ) : null}{' '}
                </div>
            )
        } else {
            return null
        }
    }

    const DeleteDataScope = () => {
        if(roles.includes("data_scope_delete")) {
            return (
                <div className="dataScopesDeleteButton">
                    <RiDeleteBin6Fill className="dataScopesDeleteIcon"/>
                </div>

            )
        } else {
            return null
        }

    }

    const ViewDataScopeItem = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
        console.log()
        if (roles.includes ("data_scope_create") || roles.includes ("data_scope_edit") || roles.includes ("data_scope_delete") || viewDatascope) {
            return (
                <li key={datascope.data_scope_id}>
                    <p onClick={() => setViewDataScopeOpen(!viewDataScopeOpen)}>
                        Data Scope {datascope.data_scope_id}: {datascope.ds_name} {/*{datascope.data_custodian && datascope.data_custodian.first_name} {datascope.data_custodian && datascope.data_custodian.last_name}*/}

                        {viewDataScopeOpen && (
                            <ViewDataScope
                                popupClose={() => setViewDataScopeOpen(false)}
                                popupOpen={viewDataScopeOpen}
                                datascope={datascope}
                            />
                        )}
                    </p>
                    <EditDataScope datascope={datascope}></EditDataScope>
                    <DeleteDataScope></DeleteDataScope>
                </li>
            );
        } else {
            return null
        }
    };

    const CreateDataScope = () => {
        if(roles.includes("data_scope_create")) {
            return (
                <div className="CreateDataScopeDiv">
                    <button
                        className="CreateDataScopeButton"
                        data-testid="dataScopeMake"
                        onClick={() => setCreateDataScopeOpen(!createDataScopeOpen)}
                    >
                        Create Data Scope
                    </button>
                    {createDataScopeOpen ? (
                        <CreateDataScopePopup
                            popupClose={() => setCreateDataScopeOpen(false)}
                            popupOpen={createDataScopeOpen}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null
        }
    }

    const dataItems = [];
    if (roles.includes("data_scope_create") || roles.includes("data_scope_edit") || roles.includes("data_scope_delete")) {
        if (showDatascope && showDatascope.length > 0) {
            showDatascope.map((datascope) =>
                dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.data_scope_id} />)
            );
        }
    } else {
        if (myDatascopes && myDatascopes.length > 0) {
            viewDatascope = true;
            console.log(viewDatascope)
            myDatascopes.map((datascope) =>
                dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.data_scope_id} />)
            );
        }
    }
    if (dataItems.length === null)
    {
        dataItems[0] = "No Data Scopes added yet.";
    }


    const [helpOpen,setHelpOpen] = useState(false);
    const helpMsg = "To view a data scopes information, click on their field in the table." +
        "To edit a data scope, click the edit ( " + <img src={edit_icon} alt='edit icon'/> + " ) button" +
        "To delete a data scope you can click the ( " + <img src={delete_icon} alt='edit icon'/> + " ) button." +
        "To add a data scope click the Create Data Scope ( " + <img src={datascope_icon} alt='edit icon'/> + " ) button and then fill in all the relevant information.";

    return (
        <div className="display">
            <div className="dataScopesBackground">
                <button  className="dsHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="dsHelpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
                <div className="searchDataScopes">
                    <input
                        // data-testid="datascopesSearch"
                        className="dataScopesSearchInput"
                        type="text"
                        id="dataScopesSearchInput"
                        name="dataScopesSearch"
                        // onChange={}
                    />
                    <FaSearch className="dataScopesSearchIcon" />
                </div>
                <div className="datascopes">
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="datascopesList">{dataItems}</ul>
                    )}
                </div>
                <CreateDataScope></CreateDataScope>
            </div>

        </div>
    );
}
