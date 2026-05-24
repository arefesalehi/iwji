'use client'
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts'

const RADIAN = Math.PI / 180
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  )
}

const MyPieCharts = ({
  users,
  registercourse,
  iiwMembership,
  webinarUsers,
}) => {
  const data = [
    { name: 'کاربران سایت ', value: users?.length || 0 },
    { name: 'ثبت نامی دوره', value: registercourse?.length || 0 },
    { name: 'ثبت نامی عضویت در IIW ', value: iiwMembership?.length || 0 },
    { name: 'ثبت نامی وبینار ', value: webinarUsers?.length || 0 },
  ] 
  return (
    <ResponsiveContainer width="100%" height="80%">
      <PieChart width={400} height={400} >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        
        >
          {data.map((entry, index) => (
            <Cell
              
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" layout="horizontal" />

      </PieChart>
    </ResponsiveContainer>
  )
}

export default MyPieCharts
