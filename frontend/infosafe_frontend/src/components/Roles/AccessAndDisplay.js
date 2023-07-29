import {useEffect, useState} from "react";

const AccessAndDisplay = () => {
    const [createUserOpen, setCreateUserOpen] = useState(false); // ISO DISO
    const [showUser, setShowUser] = useState([]); // ISO DISO
    const [showDatascope, setShowDatascope] = useState([]); // ISO DS DISO Employee AM
    const [showAsset, setShowAsset] = useState([]); // ISO DISO DS Employee AM
    const [showRisk, setShowRisk] = useState([]);
    const [showAccess, setShowAccess] = useState([]);
    const [showMatrix, setShowMatrix] = useState([]);
    const [showSupport, setShowSupport] = useState([]);


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
        fetch('http://localhost:8080/api/matrix/getM', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowMatrix(result);
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
                setShowSupport(result);
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
        showMatrix,
        setShowMatrix,
        showSupport,
        setShowSupport
    };
};
export default AccessAndDisplay;