"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"
import { Calendar, Thermometer, Droplets, Sun, TrendingUp, TrendingDown, Activity, Flower2 } from "lucide-react"

export function Analytics() {
  const [timeRange, setTimeRange] = useState<"day" | "week">("day")
  const [data, setData] = useState<any[]>([])
  const [roseGrowthData, setRoseGrowthData] = useState<any[]>([])

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

    const generateRoseGrowthData = () => {
      return Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        height: 5 + i * 0.8 + Math.random() * 2,
        buds: Math.floor(i / 5) + Math.random() * 2,
        blooms: Math.max(0, Math.floor((i - 15) / 3) + Math.random()),
      }))
    }

    setData(generateData())
    setRoseGrowthData(generateRoseGrowthData())
  }, [timeRange])

  const averages = data.reduce(
    (acc, curr) => ({
      temperature: acc.temperature + curr.temperature / data.length,
      humidity: acc.humidity + curr.humidity / data.length,
      lighting: acc.lighting + curr.lighting / data.length,
    }),
    { temperature: 0, humidity: 0, lighting: 0 },
  )

  const getTrend = (values: number[]) => {
    if (values.length < 2) return 0
    const recent = values.slice(-3).reduce((a, b) => a + b, 0) / 3
    const previous = values.slice(-6, -3).reduce((a, b) => a + b, 0) / 3
    return recent - previous
  }

  const tempTrend = getTrend(data.map((d) => d.temperature))
  const humidityTrend = getTrend(data.map((d) => d.humidity))
  const lightingTrend = getTrend(data.map((d) => d.lighting))

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-background via-muted/10 to-background min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-work-sans)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          التحليلات
        </h1>
        <p className="text-muted-foreground text-lg">تحليل أداء المحمية الذكية وتتبع الظروف البيئية</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
        <Calendar className="w-5 h-5 text-muted-foreground" />
        <div className="flex space-x-2 space-x-reverse bg-muted rounded-lg p-1">
          <Button
            variant={timeRange === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("day")}
            className="transition-all duration-300"
          >
            اليوم
          </Button>
          <Button
            variant={timeRange === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeRange("week")}
            className="transition-all duration-300"
          >
            الأسبوع
          </Button>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">متوسط الحرارة</p>
                <p className="text-3xl font-bold text-red-600">{averages.temperature.toFixed(1)}°م</p>
                <div className="flex items-center mt-2">
                  {tempTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${tempTrend > 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(tempTrend).toFixed(1)}°
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center">
                <Thermometer className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <Badge
              variant={averages.temperature >= 18 && averages.temperature <= 28 ? "default" : "destructive"}
              className="mt-3"
            >
              {averages.temperature >= 18 && averages.temperature <= 28 ? "مثالي" : "يحتاج تعديل"}
            </Badge>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">متوسط الرطوبة</p>
                <p className="text-3xl font-bold text-blue-600">{averages.humidity.toFixed(0)}%</p>
                <div className="flex items-center mt-2">
                  {humidityTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${humidityTrend > 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(humidityTrend).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <Badge
              variant={averages.humidity >= 50 && averages.humidity <= 80 ? "default" : "destructive"}
              className="mt-3"
            >
              {averages.humidity >= 50 && averages.humidity <= 80 ? "مثالي" : "يحتاج تعديل"}
            </Badge>
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">متوسط الإضاءة</p>
                <p className="text-3xl font-bold text-yellow-600">{averages.lighting.toFixed(0)}%</p>
                <div className="flex items-center mt-2">
                  {lightingTrend > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${lightingTrend > 0 ? "text-green-500" : "text-red-500"}`}>
                    {Math.abs(lightingTrend).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center">
                <Sun className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <Badge
              variant={averages.lighting >= 60 && averages.lighting <= 90 ? "default" : "destructive"}
              className="mt-3"
            >
              {averages.lighting >= 60 && averages.lighting <= 90 ? "مثالي" : "يحتاج تعديل"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Flower2 className="w-5 h-5 text-primary" />
            <span>تتبع نمو الورد الطائفي</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roseGrowthData}>
                <defs>
                  <linearGradient id="heightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6f91" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ff6f91" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="budsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4caf50" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number, name: string) => {
                    const labels = {
                      height: "الارتفاع (سم)",
                      buds: "البراعم",
                      blooms: "الأزهار المتفتحة",
                    }
                    return [`${value.toFixed(1)}`, labels[name as keyof typeof labels]]
                  }}
                  labelFormatter={(label) => `اليوم: ${label}`}
                />
                <Area type="monotone" dataKey="height" stroke="#ff6f91" strokeWidth={3} fill="url(#heightGradient)" />
                <Area type="monotone" dataKey="buds" stroke="#4caf50" strokeWidth={2} fill="url(#budsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Temperature Chart */}
      <Card className="mb-6 bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #ef4444",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}°م`, "درجة الحرارة"]}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fill="url(#tempGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: "#ef4444", strokeWidth: 2, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Humidity Chart */}
      <Card className="mb-6 bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <defs>
                  <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #3b82f6",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`${value.toFixed(0)}%`, "الرطوبة"]}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#humidityGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Lighting Chart */}
      <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <defs>
                  <linearGradient id="lightingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={1} />
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "1px solid #eab308",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`${value.toFixed(0)}%`, "الإضاءة"]}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Bar
                  dataKey="lighting"
                  fill="url(#lightingGradient)"
                  radius={[6, 6, 0, 0]}
                  stroke="#eab308"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
