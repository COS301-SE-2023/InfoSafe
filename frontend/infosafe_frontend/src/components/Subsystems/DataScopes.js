import {CreateDataScopePopup} from "../Create/CreateDataScopePopup";
import React, {useState} from "react";
import ViewDataScope from "../View/ViewDataScope";
import {FaRegEdit} from "react-icons/fa";
import {EditDataScopePopup} from "../Edit/EditDataScopePopup";
import {RiDeleteBin6Fill} from "react-icons/ri";
import AccessAndDisplay from "../Roles/AccessAndDisplay";

const DataScopes = () => {

    const {showDatascope} = AccessAndDisplay()
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false); // DS

    const EditDataScope = ({datascope}) => {
        const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
        return (
            <div  className="EditIcon">
                <FaRegEdit onClick={() => setEditDataScopeOpen(true)} />
                {editDataScopeOpen ? (
                    <EditDataScopePopup
                        popupClose={() => setEditDataScopeOpen(false)}
                        popupOpen={editDataScopeOpen}
                        datascope={datascope}
                    />
                ) : null}{' '}
            </div>
        )
    }

    const DeleteDataScope = () => {
        return(
            <RiDeleteBin6Fill className="DeleteIcon" />
        )
    }

    const ViewDataScopeItem = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
        return (
            <li key={datascope.id}>
                <p onClick={() => setViewDataScopeOpen(!viewDataScopeOpen)}>
                    Data Scope {datascope.data_scope_id}: {datascope.ds_name} ------ {datascope.ds_description} ------ {datascope.data_custodian}
                    {viewDataScopeOpen && (
                        <ViewDataScope
                            popupClose={() => setViewDataScopeOpen(false)}
                            popupOpen={viewDataScopeOpen}
                            datascope={datascope}
                        />
                    )}
                </p>
                <EditDataScope></EditDataScope>
                <DeleteDataScope></DeleteDataScope>
            </li>
        );
    };

    const CreateDataScope = () => {
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
    }

    const dataItems = [];
    showDatascope.map((datascope) =>
        dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.data_scope_id} />)
    );

    return (
        <div className="display">
            <div className="datascopes">
                <ul className="datascopesList">{dataItems}</ul>
            </div>
            <CreateDataScope></CreateDataScope>
        </div>
    );
}