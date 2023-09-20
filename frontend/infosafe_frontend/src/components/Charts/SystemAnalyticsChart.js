import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const SystemAnalyticsChart = () => {
    const chartReference = useRef(null);

    useEffect(() => {
        const chartContext = chartReference.current.getContext("2d");
        new Chart(chartContext, {
            type: "bar",
            data: {
                labels: [
                    "Data Scopes",
                    "Compliance Matrix",
                    "Devices",
                    "Asset Requests",
                    "Support Requests",
                ],
                datasets: [
                    {
                        label: "System Total",
                        backgroundColor: "#49D4D0",
                        barThickness: 20,
                        data: [200, 400, 300, 100, 250],
                    },
                    {
                        label: "My Total",
                        backgroundColor: "#E90000",
                        barThickness: 20,
                        data: [20, 50, 10, 5, 8],
                        pointStyle: "circl",
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false,
                            color: "#CECECE",
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
        <div className='systemAnalyticsChartDiv'>
            <canvas className='barChart'ref={chartReference} />
        </div>
    );
};

export default SystemAnalyticsChart;
