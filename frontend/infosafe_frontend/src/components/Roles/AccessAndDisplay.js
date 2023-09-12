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
    const [showAssetRequests, setShowAssetRequests] = useState([]);

    useEffect(() => {
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/datascope/getDs', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/asset/getAsset', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/user/getAll', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/accessrequest/getAr', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/asset/getAsset', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/risk/getRisk', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/task/getTask', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/supportrequest/getSr', {
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
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/user/getId', {
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
                fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/supportrequest/getSrById/' + id, {
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

    useEffect(() => {
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/assetrequest/getAr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAssetRequests(result);
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
        setShowMySupport,
        showAssetRequests
    };
};
export default AccessAndDisplay;