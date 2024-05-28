import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this line to include all chart types

const Graph = () => {
    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday', 'Sunday'],
      datasets: [
        {
          label: 'Tasks Given',
          data: [5, 9, 8, 1, 5, 5, 4],
          backgroundColor: 'rgba(173, 216, 230, 0.7)', // Light Blue with 20% opacity
          borderColor: 'rgba(173, 216, 230, 1)',       // Light Blue with 100% opacity
          borderWidth: 1,
        },
        {
            label: 'Tasks Completed',
            data: [4, 2, 5, 1, 3, 4, 2],
            backgroundColor: 'rgba(173, 216, 100, 0.7)', // Light Blue with 20% opacity
            borderColor: 'rgba(173, 216, 100, 1)',       // Light Blue with 100% opacity
            borderWidth: 1,
          },
      ],
      
    };
  
    const options = {
      scales: {
        x: {
          type: 'category', // Use category scale for X-axis
          title: {
            display: true,
            text: 'Days',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Tasks',
          },
        },
      },
    };
  
    return (
      <div style={{marginTop:'10%', maxWidth: '600px', margin: 'auto' }}>
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  export default Graph;