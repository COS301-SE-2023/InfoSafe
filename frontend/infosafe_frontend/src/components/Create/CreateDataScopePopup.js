import React, {useState, useEffect} from 'react';
import '../../styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import {IoArrowBackOutline} from 'react-icons/io5';

export const CreateDataScopePopup = ({popupOpen, popupClose}) => {
    const [newRole, setNewRole] = useState({role: '', roledescription: ''});
    const [ds_name, setDsName] = useState('')
    const [ds_description, setDsDesc] = useState('')
    const [role_type, setRoleType] = useState('')
    const [role_description, setRoleDesc] = useState('')
    const [data_scope_id, setDsId] = useState('')
    const [data, setData] =useState([])
    const [roles, setRoles] = useState(data);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewRole((prevRole) => ({...prevRole, [name]: value}));
    };

    const handleAddRole = (e) => {
        e.preventDefault();
        const dataScopeRoles = {data_scope_id, role_description, role_type};
        if (newRole.role && newRole.roledescription) {
            setRoles((prevRoles) => [...prevRoles, newRole]);
            setNewRole({role: '', roledescription: ''});
        }

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
    };

    const datascoperoles = ['Admin', 'Employee'];
    const role_descriptions = ['Access all', 'Work'];
    const handleClick = (e) => {
        const currentDate = new Date().toISOString().split('T')[0];
        e.preventDefault();
        const ds_status = "Pending";
        const datascope = {date_captured: currentDate, ds_description, ds_name, ds_status};

        fetch(`http://localhost:8080/api/datascope/checkName?dsname=${ds_name}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
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

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDataScopeOverlay">
                <div className="popupBackground">
                    <div className="createDataScopeBorder">
                        <button className="createDataScopeBackButton" onClick={popupClose}>
                            <IoArrowBackOutline className="backIcon"/>
                        </button>
                        <p className="datascopeLabel">Create Data Scope</p>
                        <form>
                            <div className="CreateDataScopeForm">
                                <div className="datascope_info">
                                    <div className="datascope_name">
                                        <p className="datascopeNameLabel">Name</p>
                                        <input className="datascopeNameInput" data-testid="nameInput" value={ds_name}
                                               onChange={(e) => setDsName(e.target.value)}/>
                                    </div>
                                    <div className="datascope_description">
                                        <p className="descriptionLabel">Description</p>
                                        <textarea className="createDataScopeDescriptionInput" data-testid="Description" value={ds_description}
                                                  onChange={(e) => setDsDesc(e.target.value)}/>
                                    </div>
                                    <div className="datascope_roles" data-testid="roles">
                                        <p className="roleLabel">Data Scope Roles</p>
                                        <div className="dataScopeRoles">
                                            <ul className="dataScopeRolesList">
                                                {datascoperoles.map((item, i) => (
                                                    <li key={i}>
                                                        <p>{item}: {role_descriptions[i]}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>



                                        </div>
                                    </div>
                                <div className="datascope_addrole">
                                    <p className="AddRoleNameLabel">Role Type</p>
                                    <input
                                        className="AddRoleNameInput"
                                        data-testid="addRole"
                                        name="role"
                                        value={newRole.role_type}
                                        onChange={handleInputChange}
                                    />
                                    <p className="AddRoleDescriptionLabel">Role Description</p>
                                    <textarea
                                        className="AddRoleDescriptionInput"
                                        data-testid="addRoleDescription"
                                        name="roledescription"
                                        value={newRole.role_description}
                                        onChange={handleInputChange}
                                    />

                                </div>
                            </div>
                            <div className="createDataScopeButtonsDiv">
                                <button
                                    className="AddRoleButton"
                                    data-testid="addRoleButton"
                                    onClick={handleAddRole}
                                    type="button"
                                >
                                    Add Role
                                </button>
                                <button className="datascope_finish" data-testid="addDataScope" onClick={handleClick}>
                                    Submit
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </Popup>
    );
};