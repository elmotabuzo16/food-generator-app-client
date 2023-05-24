import React from 'react';

const NutritionalDoughnutChart = () => {
  const chartSize = 200; // Adjust the size of the chart as needed
  const radius = chartSize / 2;

  const carbPercentage = 12;
  const proteinPercentage = 37;
  const fatPercentage = 32;

  const carbStartAngle = 0;
  const proteinStartAngle = (carbPercentage / 100) * 360;
  const fatStartAngle = ((carbPercentage + proteinPercentage) / 100) * 360;

  const carbEndAngle = proteinStartAngle;
  const proteinEndAngle = fatStartAngle;
  const fatEndAngle = 360;

  return (
    <svg
      width={chartSize}
      height={chartSize}
      viewBox={`0 0 ${chartSize} ${chartSize}`}
    >
      <circle cx={radius} cy={radius} r={radius} fill='#fff' />
      <path
        d={`M ${radius} ${radius} L ${radius} 0 A ${radius} ${radius} 0 ${
          carbPercentage > 180 ? 1 : 0
        } 1 ${Math.cos((carbEndAngle * Math.PI) / 180) * radius + radius} ${
          Math.sin((carbEndAngle * Math.PI) / 180) * radius + radius
        } Z`}
        fill='#FF6384'
      />
      <path
        d={`M ${radius} ${radius} L ${radius} 0 A ${radius} ${radius} 0 ${
          proteinPercentage > 180 ? 1 : 0
        } 1 ${Math.cos((proteinEndAngle * Math.PI) / 180) * radius + radius} ${
          Math.sin((proteinEndAngle * Math.PI) / 180) * radius + radius
        } Z`}
        fill='#36A2EB'
      />
      <path
        d={`M ${radius} ${radius} L ${radius} 0 A ${radius} ${radius} 0 ${
          fatPercentage > 180 ? 1 : 0
        } 1 ${Math.cos((fatEndAngle * Math.PI) / 180) * radius + radius} ${
          Math.sin((fatEndAngle * Math.PI) / 180) * radius + radius
        } Z`}
        fill='#FFCE56'
      />
    </svg>
  );
};

export default NutritionalDoughnutChart;
