'use client'
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartUser = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        let chartInstance = null;

        const randomData = () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

        const config = {
            type: 'line',
            data: {
                labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                datasets: [
                    {
                        label: 'Sales',
                        backgroundColor: 'rgba(75, 99, 132, 0.2)',
                        borderColor: 'rgba(75, 99, 132, 1)',
                        borderWidth: 2,
                        data: randomData(),
                        fill: true,
                    },
                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        ticks: {
                            color: 'rgba(0,0,0,0.5)',
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                        },
                    },
                },
            },
        };

        const ctx = chartRef.current.getContext('2d');

        // Check if chart instance exists, destroy it before reinitializing
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Initialize Chart.js
        chartInstance = new Chart(ctx, config);

        // Clean up function to destroy the chart on component unmount
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
                chartInstance = null;
            }
        };
    }, []);

    return (
        <div className="relative h-96">
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default ChartUser;
