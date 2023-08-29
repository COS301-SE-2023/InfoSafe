import React, {useState} from "react";
import {ViewTask} from "../View/ViewTaskPopup";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
import {CreateTask} from "../Create/CreateTaskPopup";
import {UpdateTask} from "../Edit/UpdateTaskPopup";
import {TaskApproval} from "../TaskApprovalPopup";

export const ComplianceMatrix = () => {
    const {showTask} = AccessAndDisplay()
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
    const [approveTaskOpen, setApproveTaskOpen] = useState(false);

    const EditTask = () => {

        return(
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
                    />
                ) : null}
            </div>
        )
    }

    const ViewTaskItems = ({ task }) => {
        const [viewTaskOpen, setViewTaskOpen] = useState(false);
        return(
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
    };

    const CreateTask = () => {

        return(
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
    }

    const ApproveTask = () => {

        return(
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
                    />
                ) : null}
            </div>
        )
    }

    const complianceItems = [];
    showTask.map((task) =>
        complianceItems.push(<ViewTaskItems task={task} key={task.task_id}/>)
    );

    return(
        <div className="display">
            <div className="tasks">
                <ul className="taskList">{complianceItems}</ul>
            </div>
            <div className="buttons">
                <CreateTask></CreateTask>
                <EditTask></EditTask>
                <ApproveTask></ApproveTask>
            </div>
        </div>
    );
}