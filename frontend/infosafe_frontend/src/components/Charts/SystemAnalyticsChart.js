import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import {useCurrentDataScope} from "./useCurrentDataScope";
import {useCurrentTasks} from "./useCurrentTasks";

const SystemAnalyticsChart = () => {
    const chartReference = useRef(null);

    const {dataScopeCount, myDataScopeCount, assetCount, totalAssets} = useCurrentDataScope();
    const {taskCount, totalTasks} = useCurrentTasks();
    useEffect(() => {
        const chartContext = chartReference.current.getContext("2d");
        new Chart(chartContext, {
            type: "bar",
            data: {
                labels: [
                    'Data Scopes',
                    'Tasks',
                    'Devices',
                    'Asset Requests',
                    'Support Requests',
                ],
                datasets: [
                    {
                        label: 'System Total',
                        backgroundColor: '#49D4D0',
                        barThickness: 20,
                        data: [dataScopeCount, totalTasks, totalAssets, 100, 250],
                    },
                    {
                        label: 'My Total',
                        backgroundColor: '#9E0000',
                        barThickness: 20,
                        data: [myDataScopeCount, taskCount, assetCount, 5, 8],
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
    }, []);

    return (
        <div className="systemAnalyticsChartDiv">
            <canvas className="barChart" ref={chartReference} />
        </div>
    );
};

export default SystemAnalyticsChart;
