import {CreateUserPopup} from "../Create/CreateUserPopup";
import React, {useState} from "react";
import ViewUser from "../View/ViewUser";
import {FaRegEdit} from "react-icons/fa";
import EditUser from "../Edit/EditUser";
import {RiDeleteBin6Fill} from "react-icons/ri";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
import '../../styling/Users.css';


export const Users = () => {
    const {
        showUser,
        createUserOpen,
        setCreateUserOpen,
        roles
    } = AccessAndDisplay()

    const EditUser = ({user}) => {
        const [editUserOpen, setEditUserOpen] = useState(false);
        if(roles.includes("user_edit")) {
            return (
                <div className="EditIcon">
                    <FaRegEdit data-testid="editButton" onClick={() => setEditUserOpen(true)}/>
                    {editUserOpen ? (
                        <EditUser
                            popupClose={() => setEditUserOpen(false)}
                            popupOpen={editUserOpen}
                            user={user}
                        />
                    ) : null}{' '}
                </div>
            )
        } else {
            return null;
        }
    };

    const DeleteUser = () => {
        if(roles.includes("user_delete")) {
            return (
                <RiDeleteBin6Fill className="DeleteIcon"/>
            )
        } else {
            return null;
        }
    }

    const ViewUserItem = ({user}) => {
        //const CURRENT = user;
        const [viewUserOpen, setViewUserOpen] = useState(false);
        const [editUserOpen, setEditUserOpen] = useState(false);
        if(roles.includes("user_create") || roles.includes("user_delete") || roles.includes(("user_edit"))) {
            return (
                <li key={user.id}>
                    <p onClick={() => setViewUserOpen(!viewUserOpen)}>
                        User {user.user_id}: {user.first_name} {user.last_name}
                        {viewUserOpen && (
                            <ViewUser
                                popupClose={() => setViewUserOpen(false)}
                                popupOpen={viewUserOpen}
                                user={user}
                            />
                        )}
                    </p>
                    <EditUser/>
                    <DeleteUser></DeleteUser>
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
    showUser.map((user) => userItems.push(<ViewUserItem user={user} key={user.id}/>));

    return (
        <div className="display">
            <div className="users">
                <ul className="userList">{userItems}</ul>
            </div>
            <CreateUser></CreateUser>
        </div>
    );
}