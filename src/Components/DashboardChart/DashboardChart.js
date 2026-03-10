import React from "react";
import { PieChart, Pie } from "recharts";

export default function DashboardChart({
  teachers,
  students,
  staff,
  ...props
}) {
  return (
    <PieChart width={400} height={310} style={{ bottom: "50px", margin: "auto" }}>
      <Pie
        data={students}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={20}
        outerRadius={30}
        // fill={data01.fill}
      />
      <Pie
        data={teachers}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={50}
        outerRadius={60}
        // fill={data02.fill}
        // label
      />
      <Pie
        data={staff}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={80}
        outerRadius={90}
        // fill={data02.fill}
        // label
      />
    </PieChart>
  );
}
