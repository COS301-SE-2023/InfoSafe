import {CreateUserPopup} from "../Create/CreateUserPopup";
import React, {useEffect, useState} from "react";
import ViewUser from "../View/ViewUser";
import {FaRegEdit, FaSearch} from "react-icons/fa";
import EditUser from "../Edit/EditUser";
import {RiDeleteBin6Fill, RiEditBoxFill} from "react-icons/ri";
import '../../styling/Users.css';
import '../../styling/Dropdown.css';
import {useGetPerms} from "../getData/getPerms";
import {useGetAllUser} from "../getData/getAllUser";
import {ConfirmDelete} from "../ConfirmDelete";

export const Users = () => {
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const {showUser, loading} = useGetAllUser()
    const {roles} = useGetPerms();

    const EditUserDiv = ({user}) => {
        const [editUserOpen, setEditUserOpen] = useState(false);
        if(roles.includes("user_edit")) {
            return (
                <div>
                    <div className="usersEditButton">
                        <RiEditBoxFill data-testid="editButton" onClick={() => setEditUserOpen(true)} className="usersEditIcon" />
                        {editUserOpen ? (
                            <EditUser
                                popupClose={() => setEditUserOpen(false)}
                                popupOpen={editUserOpen}
                                user={user}
                            />
                        ) : null}{' '}
                    </div>

                </div>
            )
        } else {
            return null;
        }
    };

    const DeleteFunction = (email) => {
        const deleteUser = {email}
        try {
            return fetch("http://localhost:8080/api/user/deleteUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                },
                body: JSON.stringify(deleteUser),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("Delete operation successful", data);
                    return data; // You can return data if needed
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                    throw error;
                });
        } catch (error) {
            console.error("Unexpected error:", error);
            throw error;
        }
    };



    const DeleteUser = ({user}) => {
        const [deleteUserOpen, setDeleteUserOpen] = useState(false);
        if(roles.includes("user_delete")) {
            return (
                <div className="usersDeleteButton">
                    <RiDeleteBin6Fill className="usersDeleteIcon" onClick={()=> setDeleteUserOpen(true)}/>
                    {deleteUserOpen ? (
                        <ConfirmDelete
                            popupClose={() => setDeleteUserOpen(false)}
                            popupOpen={deleteUserOpen}
                            yesDelete={() => DeleteFunction(user.email)}
                        />
                    ) : null}{' '}
                </div>
            )
        } else {
            return null;
        }
    }

    const ViewUserItem = ({user}) => {
        const [viewUserOpen, setViewUserOpen] = useState(false);
        if(roles.includes("user_create") || roles.includes("user_delete") || roles.includes(("user_edit"))) {
            return (
                <li key={user.user_id}>
                    <p onClick={() => setViewUserOpen(!viewUserOpen)}>
                        {user.first_name} {user.last_name}
                        {viewUserOpen && (
                            <ViewUser
                                popupClose={() => setViewUserOpen(false)}
                                popupOpen={viewUserOpen}
                                user={user}
                            />
                        )}
                    </p>
                    <EditUserDiv user={user}/>
                    <DeleteUser user={user}></DeleteUser>
                </li>
            );
        } else {
            return (null)
        }
    };

    const CreateUser = () => {
        if(roles.includes("user_create")) {
            return (
                <div className="CreateUserButtonDiv">
                    <button
                        className="CreateUserButton"
                        data-testid="CreateUserButton"
                        onClick={() => setCreateUserOpen(true)}
                    >
                        Create New User
                    </button>
                    {createUserOpen ? (
                        <CreateUserPopup
                            popupClose={() => setCreateUserOpen(false)}
                            popupOpen={createUserOpen}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    };

    const userItems = [];
    showUser.map((user) => userItems.push(<ViewUserItem user={user} key={user.user_id}/>));

    return (
        <div className="display">
            <div className="usersBackground">
                <div className="searchUsers">
                    <input
                        // data-testid="userSearch"
                        className="userSearchInput"
                        type="text"
                        id="userSearchInput"
                        name="userSearch"
                        // onChange={}
                    />
                    <FaSearch className="userSearchIcon" />
                </div>
                <div className="users">
                    {loading ? (
                        <p>Loading...</p> // Display a loading message while data is being fetched
                    ) : (
                    <ul className="userList">{userItems}</ul>
                    )}
                </div>
                <CreateUser></CreateUser>
            </div>

        </div>
    );
}