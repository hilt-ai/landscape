'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  LabelList,
} from 'recharts';
import { useRef } from 'react';

const AngledXAxisTick = ({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string };
}) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={10}
      textAnchor="end"
      fill="#525252"
      fontSize={12}
      transform="rotate(-45)"
    >
      {payload?.value}
    </text>
  </g>
);

interface ChartData {
  [key: string]: string | number;
}

interface StatsChartProps {
  data: ChartData[];
  type: 'bar' | 'pie' | 'line' | 'horizontalBar';
  className?: string;
  height?: number;
  dataKey?: string; // numeric value key (e.g. count, amount)
  xKey?: string; // x-axis/category key (e.g. category, year)
  yKey?: string; // y-axis/category key for horizontal bar (e.g. location)
  nameKey?: string; // name key for pie legend/tooltip (e.g. status)
  colorMap?: Record<string, string>; // map label/name -> color for pie slices
}

export function StatsChart({
  data,
  type,
  className = '',
  height = 300,
  dataKey = 'count',
  xKey,
  yKey,
  nameKey,
  colorMap,
}: StatsChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const colors = {
    primary: '#ffe020',
    secondary: '#51a2ff',
    success: '#10b981',
    purple: '#8b5cf6',
    orange: '#f59e0b',
    red: '#ef4444',
    gray: '#6b7280',
  };

  const pieColors = [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.purple,
    colors.orange,
  ];

  const renderChart = () => {
    switch (type) {
      case 'bar': {
        const maxVal = Math.max(
          ...data.map((d) =>
            typeof d[dataKey] === 'number' ? (d[dataKey] as number) : 0
          )
        );
        return (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis
              dataKey={xKey || 'category'}
              stroke="#525252"
              height={80}
              tick={<AngledXAxisTick />}
            />
            <YAxis
              stroke="#525252"
              fontSize={11}
              domain={[0, Math.ceil(maxVal * 1.2)]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#171717',
              }}
              itemStyle={{ color: '#171717' }}
            />
            <Bar dataKey={dataKey} fill={colors.primary} radius={[4, 4, 0, 0]}>
              <LabelList
                dataKey={dataKey}
                position="top"
                style={{ fill: '#525252', fontSize: 11, fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        );
      }

      case 'horizontalBar':
        return (
          <BarChart
            data={data}
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis type="number" stroke="#525252" fontSize={11} />
            <YAxis
              dataKey={yKey || 'location'}
              type="category"
              stroke="#525252"
              fontSize={12}
              width={120}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar
              dataKey={dataKey}
              fill={colors.success}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey={dataKey}
              nameKey={nameKey || 'name'}
            >
              {data.map((entry, index) => {
                const label =
                  nameKey && typeof entry[nameKey] === 'string'
                    ? String(entry[nameKey])
                    : undefined;
                const mappedColor =
                  label && colorMap ? colorMap[label] : undefined;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={mappedColor || pieColors[index % pieColors.length]}
                  />
                );
              })}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        );

      case 'line':
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="year" stroke="#525252" fontSize={11} />
            <YAxis stroke="#525252" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors.secondary}
              strokeWidth={3}
              dot={{ fill: colors.secondary, strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: colors.secondary, strokeWidth: 2 }}
            />
          </LineChart>
        );

      default:
        return null;
    }
  };

  const safeHeight = Math.max(1, height);
  return (
    <div
      ref={containerRef}
      className={`w-full min-w-0 ${className}`}
      style={{ height: safeHeight, minHeight: safeHeight, minWidth: 0 }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={0}
        minHeight={safeHeight}
      >
        {renderChart() ?? <g />}
      </ResponsiveContainer>
    </div>
  );
}
