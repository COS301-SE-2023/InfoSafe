import React, {useState, useEffect} from 'react';
import '../../styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import {IoArrowBackOutline} from 'react-icons/io5';

// const data = [
//     {
//         role: 'Administrator',
//         roledescription: 'Manage users, manage data scope, edit permissions.'
//     },
//     {
//         role: 'General User',
//         roledescription: 'Access data scope, complete tasks within data scopes.'
//     }
// ];

export const CreateDataScopePopup = ({popupOpen, popupClose}) => {
    const [newRole, setNewRole] = useState({role: '', roledescription: ''});
    const [ds_name, setDsName] = useState('')
    const [ds_description, setDsDesc] = useState('')
    const [date_captured, setDateCaptured] = useState()
    const [data_custodian, setDataCustodian] = useState('')
    const [ds_status, setStatus] = useState('Pending')
    const [role_type, setRoleType] = useState('')
    const [role_description, setRoleDesc] = useState('')
    const [ds_id, setDsId] = useState('')
    // const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const [data, setData] =useState([])
    const [roles, setRoles] = useState(data);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewRole((prevRole) => ({...prevRole, [name]: value}));
    };

    const handleAddRole = (e) => {
        e.preventDefault();
        if (newRole.role && newRole.roledescription) {
            setRoles((prevRoles) => [...prevRoles, newRole]);
            setNewRole({role: '', roledescription: ''});
        }
    };

    const handleCaptureDate = () => {
        var today = new Date();
        setDateCaptured(formatDate(today));
        console.log(date_captured);
    };

    const formatDate = (date) => {
        const year = date.getFullYear().toString().slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
    };
    const handleClick = (e) => {
        e.preventDefault();
        const datascope = {data_custodian, date_captured, ds_description, ds_name, ds_status};
        const dataScopeRoles = {ds_id, role_description, role_type};

        fetch(`http://localhost:8080/api/datascope/checkName?name=${ds_name}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    console.log("DataScope name already exists");
                } else {
                    console.log(datascope);
                    fetch("http://localhost:8080/api/datascope/addDs", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                        },
                        body: JSON.stringify(datascope),
                    })
                        .then(() => {
                            console.log("New DataScope added");
                        })
                        .catch((error) => {
                            console.error("Error adding new DataScope:", error);
                        });

                    fetch("http://localhost:8080/api/dataScopeRole/addDataScopeRole", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                        },
                        body: JSON.stringify(dataScopeRoles),
                    })
                        .then(() => {
                            console.log("New DataScopeRole added");
                        })
                        .catch((error) => {
                            console.error("Error adding new DataScopeRole:", error);
                        });

                    popupClose();
                }
            })
            .catch((error) => {
                console.error("Error checking DataScope name:", error);
            });
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/dataScopeRole/getDataScopeRole', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getId', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDataCustodian(result);
            });
    }, []);

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDataScopeOverlay">
                <div className="createDataScopeBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon"/>
                    </button>
                    <p className="datascopeLabel">Data Scope Creation</p>
                    <form>
                        <div className="CreateDataScopeForm">
                            <div className="datascope_info">
                                <div className="datascope_name">
                                    <p className="datascopeNameLabel">Name</p>
                                    <input className="datascopeNameInput" value={ds_name}
                                           onChange={(e) => setDsName(e.target.value)}/>
                                </div>
                                <div className="datascope_description">
                                    <p className="descriptionLabel">Description</p>
                                    <textarea className="createDataScopeDescriptionInput" value={ds_description}
                                              onChange={(e) => setDsDesc(e.target.value)}/>
                                </div>
                                <div className="datascope_roles">
                                    <p className="roleLabel">Data Scope Roles</p>
                                    <div className="table">
                                        <table className="roles_tbl">
                                            <thead>
                                            <tr>
                                                <th className="role_Header">Role</th>
                                                <th className="role_descrHeader">
                                                    Role Description
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {roles.map((role, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{role.role}</td>
                                                        <td className="roledescription_Table">
                                                            {role.roledescription}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="datascope_addrole">
                                <p className="AddRoleNameLabel">Role Type</p>
                                <input
                                    className="AddRoleNameInput"
                                    name="role"
                                    value={newRole.role_type}
                                    onChange={handleInputChange}
                                />
                                <p className="AddRoleDescriptionLabel">Role Description</p>
                                <textarea
                                    className="AddRoleDescriptionInput"
                                    name="roledescription"
                                    value={newRole.role_description}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="AddRoleButton"
                                    onClick={handleAddRole}
                                    type="button"
                                >
                                    Add Role
                                </button>
                            </div>
                        </div>
                        <button className="datascope_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
