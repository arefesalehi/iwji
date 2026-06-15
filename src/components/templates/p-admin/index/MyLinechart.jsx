
'use client'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import dayjs from 'dayjs'

// لیبل روی نقطه‌ها
const CustomizedLabel = ({ x, y, stroke, value }) => {
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fill={stroke}
      fontSize={10}
      textAnchor="middle"
    >
      {value}
    </text>
  )
}

// لیبل محور X
const CustomizedAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  )
}

const MyLinechart = ({ iiwMembership = [], registercourse = [] }) => {
  // گروه‌بندی داده‌ها بر اساس ماه
  const groupByMonth = (items) => {
    const counts = {}
    items.forEach((item) => {
      const month = dayjs(item.createdAt).format('YYYY-MM') // مثل 2025-09
      counts[month] = (counts[month] || 0) + 1
    })
    return counts
  }

  const membersByMonth = groupByMonth(iiwMembership)
  const registerByMonth = groupByMonth(registercourse)

  // ادغام همه ماه‌ها
  const allMonths = Array.from(
    new Set([...Object.keys(membersByMonth), ...Object.keys(registerByMonth)])
  ).sort()

  // ساختن دیتای نهایی برای چارت
  const data = allMonths.map((month) => ({
    name: month,
    members: membersByMonth[month] || 0,
    register: registerByMonth[month] || 0,
  }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="members"
          stroke="#82ca9d"
          label={<CustomizedLabel />}
        />
        <Line
          type="monotone"
          dataKey="register"
          stroke="#8884d8"
          label={<CustomizedLabel />}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MyLinechart
