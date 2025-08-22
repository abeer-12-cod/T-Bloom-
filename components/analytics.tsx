"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Calendar, Thermometer, Droplets, Sun } from "lucide-react"

export function Analytics() {
  const [timeRange, setTimeRange] = useState<"day" | "week">("day")
  const [data, setData] = useState<any[]>([])

  // Generate sample data
  useEffect(() => {
    const generateData = () => {
      if (timeRange === "day") {
        return Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          temperature: 22 + Math.sin(i * 0.3) * 3 + Math.random() * 2,
          humidity: 65 + Math.cos(i * 0.2) * 10 + Math.random() * 5,
          lighting: i < 6 || i > 18 ? 20 + Math.random() * 10 : 80 + Math.random() * 15,
        }))
      } else {
        return Array.from({ length: 7 }, (_, i) => ({
          time: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][i],
          temperature: 23 + Math.random() * 4 - 2,
          humidity: 65 + Math.random() * 20 - 10,
          lighting: 75 + Math.random() * 20 - 10,
        }))
      }
    }

    setData(generateData())
  }, [timeRange])

  const averages = data.reduce(
    (acc, curr) => ({
      temperature: acc.temperature + curr.temperature / data.length,
      humidity: acc.humidity + curr.humidity / data.length,
      lighting: acc.lighting + curr.lighting / data.length,
    }),
    { temperature: 0, humidity: 0, lighting: 0 },
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-work-sans)]">التحليلات</h1>
        <p className="text-muted-foreground">تحليل أداء المحمية الذكية وتتبع الظروف البيئية</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-4 space-x-reverse mb-6">
        <Calendar className="w-5 h-5 text-muted-foreground" />
        <div className="flex space-x-2 space-x-reverse">
          <Button variant={timeRange === "day" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("day")}>
            اليوم
          </Button>
          <Button variant={timeRange === "week" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("week")}>
            الأسبوع
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الحرارة</p>
                <p className="text-2xl font-bold text-red-500">{averages.temperature.toFixed(1)}°م</p>
              </div>
              <Thermometer className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الرطوبة</p>
                <p className="text-2xl font-bold text-blue-500">{averages.humidity.toFixed(0)}%</p>
              </div>
              <Droplets className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط الإضاءة</p>
                <p className="text-2xl font-bold text-yellow-500">{averages.lighting.toFixed(0)}%</p>
              </div>
              <Sun className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Temperature Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Thermometer className="w-5 h-5 text-red-500" />
            <span>تغيرات درجة الحرارة</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(1)}°م`, "درجة الحرارة"]}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Humidity Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span>تغيرات الرطوبة</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(0)}%`, "الرطوبة"]}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Lighting Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span>مستويات الإضاءة</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(0)}%`, "الإضاءة"]}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Bar dataKey="lighting" fill="#eab308" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
