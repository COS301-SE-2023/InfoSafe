import React, {useEffect, useRef, useState} from "react";
import {Chart} from "chart.js/auto";

const SystemAnalyticsChart = () => {
    const chartReference = useRef(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = sessionStorage.getItem('accessToken');

            const fetchPromises = [
                await fetch('https://infosafe.live/api/datascope/getTotal', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/user/dataScopeCount', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/user/countDevices', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/asset/getTotalAssets', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/user/taskCount', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/task/totalTasks', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/supportrequest/getTotal', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/supportrequest/getMyTotal', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/assetrequest/getTotal', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),
                await fetch('https://infosafe.live/api/assetrequest/getMyTotal', {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }),

            ];

            try {
                const responses = await Promise.all(fetchPromises);
                const data = await Promise.all(responses.map((res) => res.json()));

                const [dataScopeCount, myDataScopeCount, assetCount, totalAssets, myTotalTasks, totalTasks, suppTotal, mySuppTotal, assetTotal, myAssetTotal] = data;
                setChartData({dataScopeCount, myDataScopeCount, assetCount, totalAssets, myTotalTasks, totalTasks, suppTotal, mySuppTotal, assetTotal, myAssetTotal});
                setDataLoaded(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dataLoaded && chartData) {
            const {dataScopeCount, myDataScopeCount, assetCount, totalAssets, myTotalTasks, totalTasks, suppTotal, mySuppTotal, assetTotal, myAssetTotal} = chartData;

            const chartContext = chartReference.current.getContext("2d");
            new Chart(chartContext, {
                type: "bar",
                data: {
                    labels: [
                        'Data Scopes',
                        'Tasks',
                        'Devices',
                        'Support Requests',
                        'Asset Requests'
                    ],
                    datasets: [
                        {
                            label: 'System Total',
                            backgroundColor: '#50C9CE',
                            barThickness: 20,
                            data: [dataScopeCount, totalTasks, totalAssets, suppTotal, assetTotal],
                        },
                        {
                            label: 'My Total',
                            backgroundColor: '#00003E',
                            barThickness: 20,
                            data: [myDataScopeCount, myTotalTasks, assetCount, mySuppTotal, myAssetTotal],
                            pointStyle: 'circle',
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            stacked: false,
                            grid: {
                                display: false,
                                color: '#CECECE',
                            },
                        },
                        y: {
                            stacked: false,
                        },
                    },
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });
        }
    }, [dataLoaded, chartData]);

    return (
        <div className="systemAnalyticsChartDiv">
            <canvas className="barChart" ref={chartReference}/>
        </div>
    );
};

export default SystemAnalyticsChart;


