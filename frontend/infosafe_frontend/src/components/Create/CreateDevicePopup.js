import React, {useEffect, useState} from "react";
import "../../styling/CreateDevicePopup.css";
import Popup from "reactjs-popup";

import {IoArrowBackOutline} from "react-icons/io5";
import Dropdown from "react-dropdown";
import Select from "react-select";

const STATUS_OPTIONS = ["CLEAN", "FULL", "BROKEN"];
const NEW_OPTIONS = ["YES", "NO"];
const AVAILABILITY_OPTIONS = ["YES", "NO"];
export const CreateDevicePopup = ({popupOpen, popupClose}) => {
        //const current = new Date();
        //const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        const [asset_name, setAsset_name] = useState("")
        const [asset_description, setAsset_description] = useState("")
        const [availability, setAvailability] = useState("")
        const [used, setUsed] = useState("")
        const [current_assignee] = useState("")
        //const [previous_assignee, setPrevious_assignee] = useState("")
        const [status, setStatus] = useState("CLEAN")
        const [device_type, setDevice_type] = useState("")
        //const [selectedUsers, setSelectedUsers] = useState([]);
        const [users, setUsers] = useState([]);
        const [selectedUsers1, setSelectedUsers1] = useState({});
        const [selectedUsers2, setSelectedUsers2] = useState({});

        const handleClick = (e) => {
            e.preventDefault()
            const asset = {
                asset_name,
                asset_description,
                current_assignee,
                // previous_assignee,
                status,
                used,
                availability,
                device_type
            }
            console.log(asset)
            fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/asset/addAsset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken")
                },
                body: JSON.stringify(asset)
            }).then(() => {
                console.log("New Asset added")
            })
            popupClose()
        }
        useEffect(() => {
            fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/getAll", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("accessToken")
                }
            })
                .then((res) => res.json())
                .then((result) => {
                    setUsers(result);
                });
        }, []);
        const handleSelect = (selectedOptions, dropdownIndex) => {
            if (dropdownIndex === 1) {
                if (!selectedUsers2[selectedOptions.value]) {
                    setSelectedUsers1((prevSelectedUsers1) => ({
                        ...prevSelectedUsers1,
                        [selectedOptions.value]: selectedOptions,
                    }));
                }
            } else if (dropdownIndex === 2) {
                if (!selectedUsers1[selectedOptions.value]) {
                    setSelectedUsers2((prevSelectedUsers2) => ({
                        ...prevSelectedUsers2,
                        [selectedOptions.value]: selectedOptions,
                    }));
                }
            }
        };

        const selectedUsersArray1 = Object.values(selectedUsers1);
        const selectedUsersArray2 = Object.values(selectedUsers2);

        const filteredUsersForDropdown1 = users.filter((user) => {
            const userIdsInDropdown2 = selectedUsersArray2.map((selectedUser) => selectedUser.value);
            return !userIdsInDropdown2.includes(user.user_id);
        });

        // const filteredUsersForDropdown2 = users.filter((user) => {
        //     const userIdsInDropdown1 = selectedUsersArray1.map((selectedUser) => selectedUser.value);
        //     return !userIdsInDropdown1.includes(user.user_id);
        // });

        return (
            <Popup open={popupOpen} closeOnDocumentClick={false} position='center center'>
                <div className='createDeviceOverlay'>
                    <div className='createDeviceBorder'>
                        <button className='backButton' onClick={popupClose}>
                            <IoArrowBackOutline className='backIcon'/>
                        </button>
                        <form>
                            <p className='createDeviceLabel'>Add Device</p>
                            <p className='deviceNameLabel'>Device Name</p>
                            <input className='deviceNameInput'
                                   value={asset_name} onChange={(e) => setAsset_name(e.target.value)}
                            />
                            <p className='deviceTypeLabel'>Device Type</p>
                            <input
                                className='deviceTypeInput'
                                value={device_type} onChange={(e) => setDevice_type(e.target.value)}
                            />
                            <p className='deviceDescriptionLabel'>Device Description</p>
                            <textarea className='deviceDescriptionInput'
                                      value={asset_description} onChange={(e) => setAsset_description(e.target.value)}/>
                            <p className='deviceNewLabel'>New</p>
                            <Dropdown
                                options={NEW_OPTIONS}
                                value={NEW_OPTIONS[0]}  //onChange={(e)=>setAsset_description(e.target.value)}/>
                                className='newDropdown'
                                name='used'
                                onChange={(selectedOption) => setUsed(selectedOption.value)}
                            />
                            <p className='deviceAvailabilityLabel'>Available</p>
                            <Dropdown
                                options={AVAILABILITY_OPTIONS}
                                value={AVAILABILITY_OPTIONS[0]}  //onChange={(e)=>setAsset_description(e.target.value)}/>
                                className='availableDropdown'
                                name='availability'
                                onChange={(selectedOption) => setAvailability(selectedOption.value)}
                            />
                            <p className='deviceStatusLabel'>Status</p>
                            <Dropdown
                                options={STATUS_OPTIONS}
                                value={STATUS_OPTIONS[0]}
                                className='createDeviceStatusDropdown'
                                name='status'
                                onChange={(selectedOption) => setStatus(selectedOption.value)}
                            />
                            <br/>
                            <p className='currentCustodianLabel'>Current Custodian</p>
                            {filteredUsersForDropdown1.length > 0 ? (
                                <Select
                                    options={filteredUsersForDropdown1.map((data) => ({
                                        value: data.user_id,
                                        label: data.email
                                    }))}
                                    value={selectedUsersArray1}
                                    className='datascopeDropdown'
                                    name='datascopeDropdown1'
                                    placeholder={'Add Assignees'}
                                    onChange={(selectedOption) => handleSelect(selectedOption, 1)}
                                    isSearchable={true}
                                />
                            ) : (
                                <p>No available users</p>
                            )}
                            {/*<p className='previousCustodianLabel'>Previous Custodian</p>*/}
                            {/*{filteredUsersForDropdown2.length > 0 ? (*/}
                            {/*    <Select*/}
                            {/*        options={filteredUsersForDropdown2.map((data) => ({*/}
                            {/*            value: data.user_id,*/}
                            {/*            label: data.email*/}
                            {/*        }))}*/}
                            {/*        value={selectedUsersArray2}*/}
                            {/*        className='datascopeDropdown'*/}
                            {/*        name='datascopeDropdown2'*/}
                            {/*        placeholder={'Add Assignees'}*/}
                            {/*        onChange={(selectedOption) => handleSelect(selectedOption, 2)}*/}
                            {/*        isSearchable={true}*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    <p>No available users</p>*/}
                            {/*)}*/}
                            <button className='createDeviceFinish' onClick={handleClick}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </Popup>
        );
    }
;
