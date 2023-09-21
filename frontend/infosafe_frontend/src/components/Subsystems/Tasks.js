import React, {useState} from "react";
import {ViewTask} from "../View/ViewTaskPopup";
import {CreateTask} from "../Create/CreateTaskPopup";
import {UpdateTask} from "../Edit/UpdateTaskPopup";
import {TaskApproval} from "../TaskApprovalPopup";
import "../../styling/Tasks.css";
import {FaSearch} from "react-icons/fa";
import {useGetPerms} from "../getData/getPerms";
import {useGetTask} from "../getData/getTask";

export const Tasks = () => {
    const {showTask} = useGetTask()
    const {roles} = useGetPerms();
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
    const [approveTaskOpen, setApproveTaskOpen] = useState(false);

    const EditTask = () => {
        if(roles.includes("tasks_create")) {
            return (
                <div className="UpdateTaskDiv">
                    <button
                        className="UpdateTaskButton"
                        onClick={() => setUpdateTaskOpen(true)}
                    >
                        Update Task
                    </button>
                    {updateTaskOpen ? (
                        <UpdateTask
                            popupClose={() => setUpdateTaskOpen(false)}
                            popupOpen={updateTaskOpen}
                            task={showTask}
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
        if(roles.includes("tasks_create") || roles.includes("tasks_edit") || roles.includes("tasks_delete") || roles.includes("tasks_approve")) {
            return (
                <li key={task.task_id}>
                    <p onClick={() => setViewTaskOpen(!viewTaskOpen)}>
                        Task {task.task_id}
                        {viewTaskOpen ? (
                            <ViewTask
                                popupClose={() => setViewTaskOpen(false)}
                                popupOpen={viewTaskOpen}
                                task={task}
                            />
                        ) : null}
                    </p>
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

    const ApproveTask = () => {
        if(roles.includes("tasks_approve")) {
            return (
                <div className="ApproveTaskDiv">
                    <button
                        className="ApproveTaskButton"
                        onClick={() => setApproveTaskOpen(true)}
                    >
                        Task Approval
                    </button>
                    {approveTaskOpen ? (
                        <TaskApproval
                            popupClose={() => setApproveTaskOpen(false)}
                            popupOpen={approveTaskOpen}
                            task={showTask}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null;
        }
    }

    const complianceItems = [];
    showTask.map((task) =>
        complianceItems.push(<ViewTaskItems task={task} key={task.task_id}/>)
    );

    return(
        <div className="display">
            <div className="tasksBackground">
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
                    <EditTask></EditTask>
                    <ApproveTask></ApproveTask>
                </div>
            </div>

        </div>
    );
}