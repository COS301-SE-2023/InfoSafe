import {CreateUserPopup} from "../Create/CreateUserPopup";
import React, {useState} from "react";
import ViewUser from "../View/ViewUser";
import {FaRegEdit} from "react-icons/fa";
import EditUser from "../Edit/EditUser";
import {RiDeleteBin6Fill} from "react-icons/ri";
import AccessAndDisplay from "../Roles/AccessAndDisplay";


const Users = () => {
    const {
        showUser,
        createUserOpen,
        setCreateUserOpen
    } = AccessAndDisplay()

    const EditUser = ({user}) => {
        const [editUserOpen, setEditUserOpen] = useState(false);
        return(
            <div className="EditIcon">
                <FaRegEdit  data-testid="editButton" onClick={() => setEditUserOpen(true)}/>
                {editUserOpen ? (
                    <EditUser
                        popupClose={() => setEditUserOpen(false)}
                        popupOpen={editUserOpen}
                        user={user}
                    />
                ) : null}{' '}
            </div>
        )
    };

    const DeleteUser = () => {
        return(
            <RiDeleteBin6Fill className="DeleteIcon"/>
        )
    }

    const ViewUserItem = ({user}) => {
        //const CURRENT = user;
        const [viewUserOpen, setViewUserOpen] = useState(false);

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
                <EditUser></EditUser>
                <DeleteUser></DeleteUser>
            </li>
        );
    };

    const CreateUser = () => {
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