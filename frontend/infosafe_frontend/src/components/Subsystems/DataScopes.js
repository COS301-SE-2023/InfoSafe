import {CreateDataScopePopup} from "../Create/CreateDataScopePopup";
import React, {useEffect, useState} from "react";
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
import datascope_help from "../../images/datascope_help.png";
import {ConfirmDelete} from "../ConfirmDelete";

export const DataScopes = () => {

    const {showDatascope, myDatascopes, loading , fetchMyDatascopes, fetchAllDatascopes} = useGetDS();
    const {roles} = useGetPerms();
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false);
    let viewDatascope = false;

    useEffect(() => {
        fetchAllDatascopes();
        fetchMyDatascopes();
    }, []);

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
                            onDsEdited={fetchAllDatascopes}
                        />
                    ) : null}{' '}
                </div>
            )
        } else {
            return null
        }
    }

    const DeleteFunction = async (data_scope_id) => {
        try {
            const response = await fetch("http://localhost:8080/api/datascope/deleteDataScope/"+data_scope_id, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
                console.log("datascope deleted");
                fetchAllDatascopes();
            }
            //return response.json();

        } catch (error) {
            console.error("Error deleting datascope:", error);
            throw error;
        }
    };

    const DeleteDataScope = ({datascope}) => {
        const [dataScopeDelete, setDataScopeDelete] = useState(false);
        if(roles.includes("data_scope_delete")) {
            return (
                <div className="usersDeleteButton">
                    <RiDeleteBin6Fill className="usersDeleteIcon" onClick={() => setDataScopeDelete(true)}/>
                    {dataScopeDelete ? (
                        <ConfirmDelete
                            popupClose={() => setDataScopeDelete(false)}
                            popupOpen={dataScopeDelete}
                            yesDelete={() => DeleteFunction(datascope.data_scope_id)}
                        />
                    ) : null}{' '}
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
                    <DeleteDataScope datascope={datascope}></DeleteDataScope>
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
                            onDsAdded={fetchAllDatascopes}
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
            //console.log(viewDatascope)
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


    return (
        <div className="display">
            <div className="dataScopesBackground">
                <button  className="dsHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="dsHelpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            image={datascope_help}
                        />
                    ) : null}
                </button>
                <div className="searchDataScopes">
                    {/*<input
                        // data-testid="datascopesSearch"
                        className="dataScopesSearchInput"
                        type="text"
                        id="dataScopesSearchInput"
                        name="dataScopesSearch"
                        // onChange={}
                    />
                    <FaSearch className="dataScopesSearchIcon" />*/}
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
