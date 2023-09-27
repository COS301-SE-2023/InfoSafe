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
import {IoHelpCircle} from "react-icons/io5";
import {HelpPopup} from "../HelpPopup";
import edit_icon from '../../images/edit_icon.png';
import delete_icon from '../../images/delete_icon.png';
import user_icon from '../../images/create_user_icon.png';

export const Users = () => {
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const {showUser, loading, fetchAllUsers} = useGetAllUser();
    const {roles} = useGetPerms();

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const EditUserDiv = ({user}) => {
        const [editUserOpen, setEditUserOpen] = useState(false);
        if (roles.includes("user_edit")) {
            return (
                <div>
                    <div className="usersEditButton">
                        <RiEditBoxFill data-testid="editButton" onClick={() => setEditUserOpen(true)}
                                       className="usersEditIcon"/>
                        {editUserOpen ? (
                            <EditUser
                                popupClose={() => setEditUserOpen(false)}
                                popupOpen={editUserOpen}
                                user={user}
                                onUserEdited={fetchAllUsers}
                            />
                        ) : null}{' '}
                    </div>

                </div>
            )
        } else {
            return null;
        }
    };

    const DeleteFunction = async (email) => {
        const deleteUser = {email}
        try {
            const response = await fetch("http://localhost:8080/api/user/deleteUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                },
                body: JSON.stringify(deleteUser),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
                console.log("user deleted");
            }
            return response.json();

        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    };


    const DeleteUser = ({user}) => {
        const [deleteUserOpen, setDeleteUserOpen] = useState(false);
        if (roles.includes("user_delete")) {
            return (
                <div className="usersDeleteButton">
                    <RiDeleteBin6Fill className="usersDeleteIcon" onClick={() => setDeleteUserOpen(true)}/>
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
        if (roles.includes("user_create") || roles.includes("user_delete") || roles.includes(("user_edit"))) {
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
        if (roles.includes("user_create")) {
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
                            popupOpen={createUserOpen}
                            popupClose={() => setCreateUserOpen(false)}
                            onUserAdded={fetchAllUsers}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null
        }
    };

    const userItems = [];
    showUser.map((user) => userItems.push(<ViewUserItem user={user} key={user.user_id}/>));
    if (userItems.length === 0) {
        userItems[0] = "No Users added yet.";
    }

    const [helpOpen, setHelpOpen] = useState(false);
    const helpMsg = "To view a users information, click on their field in the table." +
        "To edit a user, click the edit ( " + <RiEditBoxFill/> + " ) button" +
        "To delete a user you can click the ( " + <img src={delete_icon} alt='edit icon'/> + " ) button." +
        "To add a user click the Create New User ( " +
        <img src={user_icon} alt='edit icon'/> + " ) button and then fill in all the relevant information.";


    return (
        <div className="display">
            <div className="usersBackground">
                <button className="userHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="userHelpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
                <div className="searchUsers">
                    <input
                        // data-testid="userSearch"
                        className="userSearchInput"
                        type="text"
                        id="userSearchInput"
                        name="userSearch"
                        // onChange={}
                    />
                    <FaSearch className="userSearchIcon"/>

                </div>
                <div className="users">
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>


                    ) : (
                        <ul className="userList">{userItems}</ul>
                    )}
                </div>
                <CreateUser></CreateUser>
            </div>
        </div>

    );
}