import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/ViewDataScope.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Select from "react-select";
import {customStyles} from "../CustomStyling";
/* eslint-disable react/prop-types */

const ViewDataScope = ({ datascope, popupClose, popupOpen }) => {
    const [dataScopeRoles, setDataScopeRoles] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedDataScopeRole, setSelectedDataScopeRole] = useState(null);
    const [userEmails, setUserEmails] = useState([]);
    const [dcEmail, setDcEmail] = useState("");

    const handleDataScopeRoleChange = (selectedOption) => {
        setSelectedDataScopeRole(selectedOption);
        if (selectedOption) {
            setDescription(selectedOption.value);
        } else {
            setDescription('');
        }
    };

    useEffect(() => {
        fetch('https://infosafe.live/api/dataScopeRole/rolesByDataScopeId/' + datascope.data_scope_id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDataScopeRoles(result);
            });
    }, []);

    useEffect( () => {
        fetch('https://infosafe.live/api/datascope/getDC/' + datascope.data_scope_id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.text())
            .then((result) => {
                setDcEmail(result);
            });
    }, []);

    useEffect( () => {
        fetch('https://infosafe.live/api/datascope/getDSUsersEmails/' + datascope.data_scope_id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUserEmails(result);
            });
    }, []);

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewDataScopeOverlay">
                <div className="popupBackground">
                    <div className="borderDataScopeView">
                        <button className="viewDataScopeBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewDataScopeBackIcon" />
                        </button>
                        <p className="ViewDataScopeTitle">View Data Scope</p>
                        <div className="view_datascope_name">
                            <p className="datascopeName">Name</p>
                            <p className="viewDataScopeName">{datascope.ds_name}</p>
                        </div>
                        <div className="view_datascope_description">
                            <p className="datascopeDescription">Description</p>
                            <p className="viewDSDescription">{datascope.ds_description}</p>
                        </div>
                        <div className="view_datascope_date">
                            <p className="datascopeDate">Date Captured</p>
                            <p className="viewDataScopeDate">{datascope.date_captured}</p>
                        </div>
                        <div className="view_datascope_status">
                            <p className="datascopeStatus">Status</p>
                            <p className="viewDataScopeStatus">{datascope.ds_status}</p>
                        </div>
                        <div className="view_datascope_roles">
                            <p className="viewDSRoles">Assigned Users</p>
                            {userEmails && userEmails.length > 0 ? (
                                <Select
                                    options={userEmails.map((email) => ({ value: email, label: email }))}
                                    value={userEmails.length > 0 ? [{ value: userEmails[0], label: userEmails[0] }] : null}
                                    placeholder={userEmails[0]}
                                    className="editDSRoles"
                                    name="editTaskAssignees"
                                    styles={customStyles}
                                />
                            ) : (
                                <p className="editDSRolesLoading">Loading...</p>
                            )}
                        </div>
                        <div className="view_datascope_roles">
                            <p className="viewDSRoles">Data Scope Roles</p>
                            {dataScopeRoles && dataScopeRoles.length > 0 ? (
                                <Select
                                    options={dataScopeRoles.map((data) => ({ value: data.role_description, label: data.role_type }))}
                                    placeholder={dataScopeRoles.label}
                                    className="editDSRoles"
                                    name="editTaskAssignees"
                                    styles={customStyles}
                                    value={selectedDataScopeRole}
                                    onChange={handleDataScopeRoleChange}
                                />
                            ) : (
                                <p className="editDSRolesLoading">Loading...</p>
                            )}
                            <p className="viewDSRoles">Role Description</p>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="editDSRoleDescription"
                            />
                            <p className="viewDSCustodianLabel">Data Custodian</p>
                            <p className="viewDSCustodian">{dcEmail}</p>
                        </div>
                    </div>
                </div>

            </div>
        </Popup>
    );
};

export default ViewDataScope;
