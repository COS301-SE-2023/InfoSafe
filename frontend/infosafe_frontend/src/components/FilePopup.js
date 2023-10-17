import "../styling/FilePopup.css"
import Popup from "reactjs-popup";
import {IoArrowBackOutline} from "react-icons/io5";
import React, {useState} from "react";
import Dropdown from "react-dropdown";

const FILES = ['FILE1','FILE2','FILE3'];

    export const FilePopup = ({ popupOpen, popupClose, datascope }) => {
        const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        fetch("http://localhost:8080/api/storage/upload", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Handle the response as needed
                    return response.json();
                } else {
                    throw new Error("File upload failed");
                }
            })
            // .then((data) => {
            //     console.log("File upload response: ", data);
            //     popupClose();
            // })
            // .catch((error) => {
            //     console.error("File upload error: ", error);
            // });
    };

        const handleFileDelete = () => {
            // Check if a file has been selected for deletion
            if (!selectedFile) {
                alert("Please select a file to delete.");
                return;
            }

            // Determine the file name or identifier that you want to delete (you may need to pass it to the server).
            const fileToDelete = selectedFile.name; // Adjust this based on your server's requirements

            fetch(`api/storage/delete/${fileToDelete}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        // Handle the success case (file deleted) as needed
                        alert("File deleted successfully");
                        setSelectedFile(null); // Clear the selected file
                        // You can also update your UI or perform other actions here
                    } else {
                        throw new Error("File deletion failed");
                    }
                })
                .catch((error) => {
                    // Handle any errors that occur during the deletion
                    console.error("File deletion error: ", error);
                });
        };

        const handleFileDownload = () => {
            // Check if a file has been selected for download
            if (!selectedFile) {
                alert("Please select a file to download.");
                return;
            }

            // Assuming the server provides a direct download URL for the selected file
            const downloadUrl = `api/storage/download/${selectedFile.name}`; // Adjust this URL based on your server's requirements

            // Create an invisible anchor element for the download
            const anchor = document.createElement("a");
            anchor.href = downloadUrl;
            anchor.target = "_blank";
            anchor.download = selectedFile.name;

            // Trigger a click event on the anchor to start the download
            anchor.click();
        };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="fileOverlay">
                <div className="popupBackground">
                    <div className="fileBorder">
                        <button className="fileBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="backIcon"/>
                        </button>
                        <p className="filePageTitle">Files</p>
                        <div className="fileContent">
                            <p className="fileLabel">Choose File</p>
                            <Dropdown
                                options={FILES}
                                value={FILES[0]}
                                className="fileDropdown"
                                name="createRiskProbabilityDropdown"
                                //onChange={}
                            />
                            <div className="fileButtonsDiv">
                                <button className="fileDownload" onClick={handleFileDownload}>
                                    Download
                                </button>
                                <button className="fileDelete" onClick={handleFileDelete}>
                                    Delete
                                </button>
                            </div>
                            <p className="uploadLabel">Upload File</p>
                            <input type="file" className="fileUpload" onChange={handleFileChange}/>
                            <button className="fileUpload" onClick={handleFileUpload}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
}