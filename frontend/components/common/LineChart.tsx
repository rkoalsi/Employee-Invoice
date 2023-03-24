import React from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData } from 'chart.js';
import 'chart.js/auto';
interface PropTypes {
  data: any;
  title: string;
}
const LineChart = ({ data, title }: PropTypes) => {
  const dat = {
    type: 'line',
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
        label: title,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data,
        scales: {
          y: {
            min: 0,
            stepSize: 1,
          },
        },
      },
    ],
  };
  return (
    <div>
      <h2>{title}</h2>
      <Line data={dat} width={400} height={400} />
    </div>
  );
};
export default LineChart;
