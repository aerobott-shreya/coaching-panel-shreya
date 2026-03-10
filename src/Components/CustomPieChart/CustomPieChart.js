import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 100 },
   
];
const COLORS = ['#0088FE'];

function CustomPieChart() {
    return (
        <>
            <PieChart width={'300px'} height={'400px'} margin={{ top: 0, left: 0, right: 0, bottom: 0 }} >
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </>
    )
}

export default CustomPieChart;