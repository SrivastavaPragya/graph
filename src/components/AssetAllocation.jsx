// AssetAllocation.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const AssetAllocation = () => {
  // Register the datalabels plugin
  Chart.register(ChartDataLabels);

  // Data for Asset Allocation
  const data = {
    labels: ['Domestic', 'International', 'Bonds', 'Cash'],
    datasets: [
      {
        label: 'Asset Allocation',
        data: [48.5, 20.1, 17, 14.4], // Dummy data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2, 
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      datalabels: {
        color: '#000',
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%'; // Round to two digits
          return percentage;
        },
        anchor: 'end',
        align: 'start',
        offset: -10
      }
    }
  };

  return <Pie data={data} options={options} />;
};

export default AssetAllocation;


