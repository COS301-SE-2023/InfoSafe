import {useEffect, useState} from "react";

const AccessAndDisplay = () => {
    const [createUserOpen, setCreateUserOpen] = useState(false); // ISO DISO
    const [showUser, setShowUser] = useState([]); // ISO DISO
    const [showDatascope, setShowDatascope] = useState([]); // ISO DS DISO Employee AM
    const [showAsset, setShowAsset] = useState([]); // ISO DISO DS Employee AM
    const [showRisk, setShowRisk] = useState([]);
    const [showTask, setShowTask] = useState([]);
    const [showAccess, setShowAccess] = useState([]);
    const [showAllSupport, setShowAllSupport] = useState([]);
    const [showMySupport, setShowMySupport] = useState([]);
    const [userId, setUserId] = useState([]);
    let id = null;

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowDatascope(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/getAsset', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAsset(result);
            });
    }, []);


    useEffect(() => {
        fetch('http://localhost:8080/api/user/getAll', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowUser(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/accessrequest/getAr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAccess(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/getAsset', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAsset(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/risk/getRisk', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowRisk(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/task/getTask', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowTask(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/supportrequest/getSr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAllSupport(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getId', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                const id = result; // Store the id in a local variable
                console.log(id); // Check if the id is fetched correctly

                // Use the id in the second fetch request
                fetch('http://localhost:8080/api/supportrequest/getSrById/' + id, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        setShowMySupport(result);
                    });
            });
    }, []);


    return {
        createUserOpen,
        setCreateUserOpen,
        showUser,
        setShowUser,
        showDatascope,
        setShowDatascope,
        showAsset,
        setShowAsset,
        showRisk,
        setShowRisk,
        showAccess,
        setShowAccess,
        showTask,
        setShowTask,
        showAllSupport,
        setShowAllSupport,
        showMySupport,
        setShowMySupport
    };
};
export default AccessAndDisplay;