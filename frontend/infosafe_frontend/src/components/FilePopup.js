import "../styling/FilePopup.css"
import Popup from "reactjs-popup";
import {IoArrowBackOutline} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import Dropdown from "react-dropdown";
import {useGetFiles} from "./getData/getFiles";

// const FILES = [];

    export const FilePopup = ({ popupOpen, popupClose, datascope }) => {
        const [selectedFile, setSelectedFile] = useState(null);
        const {showFile, loading, fetchAllFiles} = useGetFiles();
        let FILES = [];

        useEffect(() => {
            fetchAllFiles();
        }, []);


        showFile.map((data) =>
            FILES.push(data)
        );

        let fileArray = [];
        for (let i=0; i<FILES.length; i++){
            let fileID = FILES[i].substring(23);
            fileID = fileID.slice(0, 2);

            if(fileID[fileID.length-1] === "-"){
                fileID = fileID.substring(0, fileID.length-1);
            }
            const int = parseInt(fileID);
            if(int === datascope.data_scope_id){
                fileArray.push(FILES[i]);
            }
        }
        FILES = fileArray;

        if (loading === true){
            FILES[0] = "Files Loading.....";
        }
        else if (FILES.length === 0)
        {
            FILES[0] = "No Files added yet.";
        }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        selectedFile.title = "help";
        formData.append("file", selectedFile);

        fetch(`http://localhost:8080/api/storage/upload/${datascope.data_scope_id}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    // Handle the response as needed
                    popupClose();
                    return response.text();
                } else {
                    //console.log(response);
                    throw new Error("File upload failed");
                }
            })
    };

    const handleFileDelete = () => {
        // Check if a file has been selected for deletion
        if (!selectedFile) {
            alert("Please select a file to delete.");
            return;
        }

        // Determine the file name or identifier that you want to delete (you may need to pass it to the server).
        const fileToDelete = selectedFile.value; // Adjust this based on your server's requirements
        fetch(`http://localhost:8080/api/storage/delete/${fileToDelete}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Handle the success case (file deleted) as needed
                    alert("File deleted successfully");
                    setSelectedFile(null); // Clear the selected file
                    popupClose();
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
        const fileToDownload = selectedFile.value;
        fetch(`http://localhost:8080/api/storage/download/${fileToDownload}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    alert("File downloaded successfully");

                    // Get the response body as a blob
                    const blob = await response.blob();
                    // Create an object URL for the response body
                    const objectUrl = URL.createObjectURL(blob);

                    // Create an invisible anchor element for the download
                    const anchor = document.createElement("a");
                    anchor.href = objectUrl;
                    anchor.target = "_blank";
                    anchor.download = "Privacy_Policy.pdf";

                    // Trigger a click event on the anchor to start the download
                    anchor.click();

                    // Revoke the object URL after the download is complete
                    URL.revokeObjectURL(objectUrl);

                    setSelectedFile(null);
                    console.log(response);

                    popupClose();
                } else {
                    throw new Error("File deletion failed");
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the deletion
                console.error("File deletion error: ", error);
            });
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
                                onChange={(selectedOption) => setSelectedFile(selectedOption)}
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
                            <button className="fileUploadButton" onClick={handleFileUpload}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
}