import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip);

export default function DoughnutChart({
  calories,
  carbs,
  protein,
  fat,
  sugar,
  cholesterol,
}) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartPlugins, setChartPlugins] = useState({});

  const data = {
    labels: ['Carbs', 'Protein', 'Fat'],
    datasets: [
      {
        data: [carbs, protein, fat],
        backgroundColor: ['#F94642', '#3177BB', '#FDA120'],
        hoverBackgroundColor: ['#F94642', '#3177BB', '#FDA120'],
      },
    ],
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = 'bolder 20px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.baseline = 'middle';
      ctx.fillText('Calories', xCoor, yCoor - 5);

      ctx.font = 'bolder 20px sans-serif';
      ctx.fillStyle = 'black';
      ctx.fillText(calories, xCoor, yCoor + 20);
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  useEffect(() => {
    // const data = {};

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    setChartPlugins(textCenter);
    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <>
      <div className=' flex  nutrients__layout my-5'>
        <div className='nutrients-layout__wrapper'>
          <div className='nutrients-info'>
            <div className='mb-1'>
              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#F94642' }}
                ></i>{' '}
              </span>
              <span> {carbs}g Carbs &nbsp;</span>
            </div>

            <div className='mb-1'>
              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#3177BB' }}
                ></i>{' '}
              </span>
              <span> {protein}g Protein &nbsp;</span>
            </div>

            <div className='mb-1'>
              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#FDA120' }}
                ></i>{' '}
              </span>
              <span> {fat}g Fat</span>
            </div>

            <div className='mb-1'>
              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#36A2EB' }}
                ></i>{' '}
              </span>
              <span> {sugar}g Sugar</span>
            </div>

            <div className='mb-1'>
              <span>
                <i
                  className='fa-solid fa-circle'
                  style={{ color: '#FFCE56' }}
                ></i>{' '}
              </span>
              <span> {cholesterol}g Cholesterol</span>
            </div>
          </div>
        </div>
        <div>
          <Chart
            type='doughnut'
            data={data}
            options={options}
            plugins={[textCenter]}
            style={{ height: '250px', width: 'auto' }}
          />
        </div>
      </div>

      <div className='flex justify-content-center'></div>
    </>
  );
}
