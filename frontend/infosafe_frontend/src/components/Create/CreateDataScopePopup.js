import React, {useState, useEffect} from 'react';
import '../../styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import {IoArrowBackOutline} from 'react-icons/io5';

export const CreateDataScopePopup = ({popupOpen, popupClose}) => {
    const [ds_name, setDsName] = useState('')
    const [ds_description, setDsDesc] = useState('')

    const handleClick = (e) => {
        const currentDate = new Date().toISOString().split('T')[0];
        e.preventDefault();

        if ( document.getElementById("dsName").value === '' || document.getElementById("dsDescription").value === '') {
            document.getElementById("createDataScopeError").style.display = "block";
            return;
        }


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



    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDataScopeOverlay">
                <div className="popupBackground">
                    <div className="createDataScopeBorder">
                        <button className="createDataScopeBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="backIcon"/>
                        </button>
                        <p className="datascopeLabel">Create Data Scope</p>
                        <form>
                            <div className="CreateDataScopeForm">
                                <div className="datascope_info">
                                    <div className="datascope_name">
                                        <p className="datascopeNameLabel">Name</p>
                                        <input
                                            className="datascopeNameInput"
                                            data-testid="nameInput"
                                            value={ds_name}
                                            onChange={(e) => setDsName(e.target.value)}
                                            id="dsName"
                                        />
                                    </div>
                                    <div className="datascope_description">
                                        <p className="descriptionLabel">Description</p>
                                        <textarea
                                            className="createDataScopeDescriptionInput"
                                            data-testid="Description"
                                            value={ds_description}
                                            onChange={(e) => setDsDesc(e.target.value)}
                                            id="dsDescription"
                                        />
                                    </div>
                                </div>
                                <p className="createDataScopeError" id="createDataScopeError">Please ensure all fields are completed.</p>
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

export default CreateDataScopePopup;
