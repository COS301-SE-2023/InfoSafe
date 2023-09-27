import React, {useState} from "react";
import {ViewTask} from "../View/ViewTaskPopup";
import {CreateTask} from "../Create/CreateTaskPopup";
import {UpdateTask} from "../Edit/EditTaskPopup";
import {TaskApproval} from "../TaskApprovalPopup";
import "../../styling/Tasks.css";
import {FaSearch} from "react-icons/fa";
import {RiEditBoxFill} from "react-icons/ri";
import EditDevice from "../Edit/EditDevice";
import {ReviewRisk} from "../Reviews/ReviewRiskPopup";
import {useGetPerms} from "../getData/getPerms";
import {useGetTask} from "../getData/getTask";
import {IoHelpCircle} from "react-icons/io5";
import {HelpPopup} from "../HelpPopup";


export const Tasks = () => {
    const {showTask} = useGetTask()
    const {roles} = useGetPerms();
    const {myTasks} = useGetTask();
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    let viewMyTasks = false;
    const EditTask = ({ task }) => {
        const [editTaskOpen, setEditTaskOpen] = useState(false);
        if(roles.includes("tasks_create")) {
            return (
                <div className="taskEditButton">
                    <RiEditBoxFill onClick={() => setEditTaskOpen(!editTaskOpen)} className="taskEditIcon"/>
                    {editTaskOpen ? (
                        <UpdateTask
                            popupClose={() => setEditTaskOpen(false)}
                            popupOpen={editTaskOpen}
                            task={task}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null;
        }
    }

    const ViewTaskItems = ({ task }) => {
        const [viewTaskOpen, setViewTaskOpen] = useState(false)
        if(roles.includes("tasks_create") || roles.includes("tasks_edit") || roles.includes("tasks_delete") || roles.includes("tasks_approve") || viewMyTasks) {
            return (
                <li key={task.task_id}>
                    <p onClick={() => setViewTaskOpen(!viewTaskOpen)}>
                        Task {task.task_id} : {task.task_name}
                        {viewTaskOpen ? (
                            <ViewTask
                                popupClose={() => setViewTaskOpen(false)}
                                popupOpen={viewTaskOpen}
                                task={task}
                            />
                        ) : null}
                    </p>
                    <EditTask task={task}></EditTask>
                </li>
            );
        } else {
            return null;
        }
    };

    const CreateTaskDiv = () => {
        if(roles.includes("tasks_create")) {
            return (
                <div className="CreateTaskDiv">
                    <button
                        className="CreateTaskButton"
                        onClick={() => setCreateTaskOpen(true)}
                    >
                        Create New Task
                    </button>
                    {createTaskOpen ? (
                        <CreateTask
                            popupClose={() => setCreateTaskOpen(false)}
                            popupOpen={createTaskOpen}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null;
        }
    }

    const ApproveTask = ({ task }) => {
        const [approveTaskOpen, setApproveTaskOpen] = useState(false);
        if(roles.includes("tasks_approve")) {
            return (
                <div className="reviewTaskButtonDiv">
                    <button className="reviewTaskButton"
                        onClick={() => setApproveTaskOpen(true)}>
                        Review
                    </button>
                    {approveTaskOpen ? (
                        <TaskApproval
                            popupClose={() => setApproveTaskOpen(false)}
                            popupOpen={approveTaskOpen}
                            task={task}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null;
        }
    }

    const complianceItems = [];
    if (roles.includes("tasks_create") || roles.includes("tasks_edit") || roles.includes("tasks_delete") || roles.includes("tasks_approve")) {
        if (showTask && showTask.length > 0) {
            showTask.map((task) =>
                complianceItems.push(<ViewTaskItems task={task} key={task.task_id}/>)
            );
        }
    } else {
        if (myTasks && myTasks.length > 0) {
            viewMyTasks = true;
            myTasks.map((task) =>
                complianceItems.push(<ViewTaskItems task={task} key={task.task_id} />)
            );
        }
    }


    const [helpOpen,setHelpOpen] = useState(false);
    const helpMsg = "";

    return(
        <div className="display">
            <div className="tasksBackground">
                <button  className="taskHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="taskHelpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
                <div className="searchTasks">
                    <input
                        // data-testid="userSearch"
                        className="taskSearchInput"
                        type="text"
                        id="taskSearchInput"
                        name="taskSearch"
                        // onChange={}
                    />
                    <FaSearch className="userSearchIcon" />
                </div>
                <div className="tasks">
                    <ul className="taskList">{complianceItems}</ul>
                </div>
                <div className="buttons">
                    <CreateTaskDiv></CreateTaskDiv>
                </div>
            </div>

        </div>
    );
}