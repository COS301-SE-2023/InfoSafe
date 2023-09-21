import {useState, useEffect} from "react";
import {useGetPerms} from "../getData/getPerms";

export const useCurrentDataScope = () => {
    const {roles} = useGetPerms();
    const [dataScopeCount, setDataScopeCount] = useState();
    if(roles.includes("data_scope_create")){
        useEffect(() => {
            fetch('http://localhost:8080/api/datascope/get', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            }).then((res) => res.json())
                .then((result) => {
                    setDataScopeCount(result);
                });
        }, []);
    }else {
        useEffect(() => {
            fetch('http://localhost:8080/api/user/dataScopeCount', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            }).then((res) => res.json())
                .then((result) => {
                    setDataScopeCount(result);
                });
        }, []);
    }
    return {
        dataScopeCount
    }

}