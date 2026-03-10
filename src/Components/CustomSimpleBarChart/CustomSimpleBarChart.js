import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

// Custom bar shape component
const CurvedBar = (props) => {
  const { fill, x, y, width, height } = props;
  const radius = 10; // Radius for the curved top
  if (height === 0) return null; // Check if height is zero and return null to avoid drawing below y-axis

  return (
    // <g>
    //   <rect x={x} y={y} width={width} height={height} fill={fill} rx={radius} ry={radius} />
    // </g>
    <g>
    <path
      d={`M${x},${y + radius} 
          A${radius},${radius} 0 0 1 ${x + radius},${y} 
          L${x + width - radius},${y} 
          A${radius},${radius} 0 0 1 ${x + width},${y + radius} 
          L${x + width},${y + height} 
          L${x},${y + height} 
          Z`}
      fill={fill}
    />
  </g>
  );
};

// Custom tooltip component
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label}`}</p>
//         <p className="intro">{`Subjective: ${payload[0].value}`}</p>
//         <p className="intro">{`Objective: ${payload[1].value}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

export default class CustomSimpleBarChart extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    const {val} = this.props;

    console.log(val, "bargraphdata");

    const transformData = () => {
      const transformedData = Object.keys(val.data).map((month) => {
        return {
          month: val.data[month].month,
          Worksheet: val.data[month].subjective,
          MCQ: val.data[month].objective,
          SelfDoIt: val.data[month].self_do_it,
        };
      });
  
      return transformedData;
    };

    const formattedData = transformData();

    console.log(formattedData, "newformatteddata");

    return (
      <ResponsiveContainer width="100%" height="70%">
        <BarChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="subjective" fill="#817AF3" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="objective" fill="#46A46C" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
          <Bar dataKey="Worksheet" fill="#615EFC" shape={<CurvedBar />} />
          <Bar dataKey="MCQ" fill="#FBA834" shape={<CurvedBar />} />
          <Bar dataKey="SelfDoIt" fill="#FF6969" shape={<CurvedBar />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
