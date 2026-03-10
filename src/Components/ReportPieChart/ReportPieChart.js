import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";

function ReportPieChart() {
    const [pieData, setPieData] = useState([
        { name: "Navel Officer", value: 0 },
        { name: "Army Officer", value: 0 },
        { name: "Software Developer", value: 0 },
        { name: "Teacher", value: 0 },
        { name: "Football Player", value: 0 },
      ]);
      const [activeIndex, setActiveIndex] = useState([...Array(pieData.length).keys()]);

    
      useEffect(() => {
        setPieData([
          { name: "Navel Officer", value: 9 },
          { name: "Army Officer", value: 8 },
          { name: "Software Developer", value: 3 },
          { name: "Teacher", value: 2 },
          { name: "Football Player", value: 1 },
        ])
      },[])
    const data02 = [{
        value:100
    }]
    const generateColors = (count) => {
        return Array.from({ length: count }, (_, i) => `hsl(${(i * 360) / count}, 70%, 50%)`);
      };
      
    //   const COLORS = generateColors(pieData.length);
    //   const COLORS = ["url(#gradient2)", "url(#gradient1)"];
    const COLORS = [
        "#F28C28", "#E974A7", "#A78BFA", "#5DADEC", "#8BC34A", "#FF7F50", "#FF6F61", "#FFB6C1", "#FFC0CB", "#E6A8D7", 
        "#D8BFD8", "#C3B1E1", "#9370DB", "#8A2BE2", "#7B68EE", "#6A5ACD", "#4169E1", "#4682B4", "#87CEEB", "#00BFFF", 
        "#1E90FF", "#6495ED", "#5F9EA0", "#4682B4", "#40E0D0", "#48D1CC", "#20B2AA", "#008080", "#008B8B", "#3CB371", 
        "#2E8B57", "#228B22", "#006400", "#ADFF2F", "#7FFF00", "#32CD32", "#00FF00", "#00FA9A", "#00CED1", "#5F9EA0", 
        "#B0E0E6", "#ADD8E6", "#87CEFA", "#00BFFF", "#1E90FF", "#6495ED", "#4169E1", "#0000FF", "#0000CD", "#00008B", 
        "#000080", "#191970", "#8B0000", "#B22222", "#DC143C", "#FF0000", "#FF4500", "#FF6347", "#FF7F50", "#FF8C00", 
        "#FFA500", "#FFD700", "#FFFF00", "#FFFFE0", "#FFFACD", "#FAFAD2", "#FFE4B5", "#FFDAB9", "#EEE8AA", "#F0E68C", 
        "#BDB76B", "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00", "#32CD32", "#98FB98", "#00FA9A", "#00FF7F", "#2E8B57", 
        "#228B22", "#008000", "#006400", "#9ACD32", "#6B8E23", "#808000", "#556B2F", "#66CDAA", "#8FBC8F", "#20B2AA", 
        "#008B8B", "#008080", "#00CED1", "#48D1CC", "#40E0D0", "#AFEEEE", "#7FFFD4", "#B0E0E6", "#ADD8E6", "#87CEEB", 
        "#87CEFA", "#00BFFF", "#1E90FF", "#6495ED", "#4682B4", "#4169E1", "#0000FF", "#0000CD", "#00008B", "#000080", 
        "#191970", "#8B0000", "#B22222", "#DC143C", "#FF0000", "#FF4500", "#FF6347", "#FF7F50", "#FF8C00", "#FFA500", 
        "#FFD700", "#FFFF00", "#FFFFE0", "#FFFACD", "#FAFAD2", "#FFE4B5", "#FFDAB9", "#EEE8AA", "#F0E68C", "#BDB76B", 
        "#ADFF2F", "#7FFF00", "#7CFC00", "#00FF00", "#32CD32", "#98FB98", "#00FA9A", "#00FF7F", "#2E8B57", "#228B22", 
        "#008000", "#006400", "#9ACD32", "#6B8E23", "#808000", "#556B2F", "#66CDAA", "#8FBC8F", "#20B2AA", "#008B8B", 
        "#008080", "#00CED1", "#48D1CC", "#40E0D0", "#AFEEEE", "#7FFFD4", "#B0E0E6", "#ADD8E6", "#87CEEB", "#87CEFA", 
        "#00BFFF", "#1E90FF", "#6495ED", "#4682B4", "#4169E1", "#0000FF", "#0000CD", "#00008B", "#000080", "#191970"
      ];
    
      // Custom active shape for the sector
      const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 0) * cos;
        const sy = cy + (outerRadius + 0) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";
    
        return (
          <g>
            {/* <text x={cx} y={cy} dy={0} textAnchor="middle" fill="#000">
           Total
          </text>
          <text x={cx} y={cy} dy={14} textAnchor="middle" fill="#000">
           {totalCount.activeCount} Blocks
          </text> */}
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
              cornerRadius={10} 
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="black" strokeDasharray="4 2" fill="none" />
            {/* <circle cx={ex} cy={ey} r={2} fill="black" stroke="none" /> */}
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={fill} style={{ fontSize: "30px", fontWeight: "700" }}  >{value}%</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} style={{ fontSize: "16px", fontWeight: "600" }} fill="#4F4F4F">
              {`${payload.name}`}
            </text>
          </g>
        );
      };
    
      const onPieEnter = (_, index) => {
        setActiveIndex(index);
      };
  return (
    <div style={{ width: "100%",  margin: "0 auto" }}>
      {/* ResponsiveContainer makes the chart responsive */}
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          {/* <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#FF6801", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#FF9340", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#FFDFBE", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#FFB48A", stopOpacity: 1 }} />
            </linearGradient>
          </defs> */}
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={pieData}
            cx="50%"
            cy="50%"
            // startAngle={90} // Start from 90 degrees
            endAngle={-360} // Rotate clockwise
            labelLine={false}
            outerRadius="70%" // Adjust dynamically with parent width
            innerRadius="50%"
            dataKey="value"
            // onMouseEnter={onPieEnter}
            paddingAngle={5}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius="25%" stroke="none"  outerRadius="40%" fill="#15838C1A" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ReportPieChart
