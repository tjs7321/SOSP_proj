import React, { useEffect, useRef, useContext } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ThemeContext } from "../context/ThemeContext"


ChartJS.register(CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend)

export default function Chart({ forms }) {

    const { darkMode, toggleDarkMode } = useContext(ThemeContext)

    let gridColor = 'black'
    if (darkMode){
        gridColor = 'rgb(160, 160, 160)'
    }

    function getMonthName(monthNumber) {
        const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
        ]
        return monthNames[monthNumber]
    }

    const updatedData = forms.map(form => {
        const dateObj = new Date(form.created_at)
        const month = getMonthName(dateObj.getMonth())
        return { ...form, month }
    });

    function numFormsByMonthAndType(label, type) {
    const formsByMonth = updatedData.filter(form => form.month === label)
    const monthFormsByType = formsByMonth.filter(form => form.type === type)
    return monthFormsByType.length
    }

    const labels = Array.from(new Set(updatedData.map(item => item.month))).reverse()

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14,
                        family: 'monospace',
                        weight: 'bold'
                    }
                }
            },
            title: {
                display: true,
                text: 'Submissions by Month',
                font: {
                    size: 16,
                    family: 'monospace',
                    weight: 'bold'
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: gridColor
                }
            },
            y: {
                beginAtZero: true,
                suggestedMax: Math.ceil((Math.max(...labels.map(label => {
                const maxFormCount = Math.max(
                    numFormsByMonthAndType(label, 'Meetings'),
                    numFormsByMonthAndType(label, 'Radiation Protection'),
                    numFormsByMonthAndType(label, 'Safety'),
                    numFormsByMonthAndType(label, 'Environmental')
                )
                return maxFormCount
                }))) / 10) * 10,
                grid: {
                    color: gridColor
                }
            },
        },
    }

    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current

        if (chartInstance) {
            chartInstance.data.datasets[0].backgroundColor = 'rgba(255, 99, 132, 0.65)'
            chartInstance.data.datasets[1].backgroundColor = 'rgba(53, 162, 235, 0.65)'
            chartInstance.data.datasets[2].backgroundColor = 'rgba(87, 43, 250, 0.65)'
            chartInstance.data.datasets[3].backgroundColor = 'rgba(66, 245, 87, 0.65)'
            chartInstance.update()
        }
    }, [labels])

    console.log(labels)

    const data = {
        labels,
        datasets: [
        {
            label: 'Meetings',
            data: labels.map(label => numFormsByMonthAndType(label, 'Meetings')),
        },
        {
            label: 'Radiation Protection',
            data: labels.map(label => numFormsByMonthAndType(label, 'Radiation Protection')),
        },
        {
            label: 'Safety',
            data: labels.map(label => numFormsByMonthAndType(label, 'Safety')),
        },
        {
            label: 'Environmental',
            data: labels.map(label => numFormsByMonthAndType(label, 'Environmental')),
        },
        ],
    };

    return <Bar ref={chartRef} options={options} data={data} />

}