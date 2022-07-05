import React from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

interface ContributionsChartProps {
  totalAmount: number;
  pledgedPercentage: number;
}

interface PieChartLabelRendererProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieChartLabelRendererProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ContributionsChart({
  totalAmount,
  pledgedPercentage,
}: ContributionsChartProps) {
  return (
    <PieChart width={200} height={200}>
      <Pie
        startAngle={-270}
        data={[
          {
            name: "Pending",
            value: (totalAmount * (100 - pledgedPercentage)) / 100,
          },
          { name: "Received", value: totalAmount * (pledgedPercentage / 100) },
        ]}
        dataKey="value"
        labelLine={false}
        label={renderCustomizedLabel}
      >
        <Cell fill="rgba(52, 73, 94,0.2)" stroke="rgba(52, 73, 94,0.8)" />
        <Cell fill="rgba(106, 176, 76,0.3)" stroke="rgba(106, 176, 76,1.0)" />
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
