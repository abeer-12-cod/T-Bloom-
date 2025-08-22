"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Thermometer, Droplets, Sun, Zap, AlertTriangle, CheckCircle } from "lucide-react"

export function Dashboard() {
  const [temperature, setTemperature] = useState([22])
  const [humidity, setHumidity] = useState([65])
  const [lighting, setLighting] = useState([75])
  const [autoMode, setAutoMode] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])

  // Check for alerts when values change
  useEffect(() => {
    const newAlerts: string[] = []

    if (temperature[0] < 18 || temperature[0] > 28) {
      newAlerts.push("درجة الحرارة خارج النطاق المثالي (18-28°م)")
    }
    if (humidity[0] < 50 || humidity[0] > 80) {
      newAlerts.push("الرطوبة خارج النطاق المثالي (50-80%)")
    }
    if (lighting[0] < 60 || lighting[0] > 90) {
      newAlerts.push("الإضاءة خارج النطاق المثالي (60-90%)")
    }

    setAlerts(newAlerts)
  }, [temperature, humidity, lighting])

  // Auto mode adjustments
  useEffect(() => {
    if (autoMode) {
      const interval = setInterval(() => {
        setTemperature([23 + Math.random() * 2 - 1]) // 22-24°C
        setHumidity([65 + Math.random() * 10 - 5]) // 60-70%
        setLighting([80 + Math.random() * 10 - 5]) // 75-85%
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [autoMode])

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return "text-secondary"
    return "text-destructive"
  }

  const getStatusIcon = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) {
      return <CheckCircle className="w-5 h-5 text-secondary" />
    }
    return <AlertTriangle className="w-5 h-5 text-destructive" />
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-work-sans)]">لوحة التحكم</h1>
        <p className="text-muted-foreground">تحكم في ظروف المحمية الذكية لزراعة الورد الطائفي</p>
      </div>

      {/* Auto Mode Toggle */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Zap className="w-6 h-6 text-primary" />
              <div>
                <h3 className="font-semibold">الوضع الذكي</h3>
                <p className="text-sm text-muted-foreground">تشغيل الضبط الأوتوماتيكي للظروف البيئية</p>
              </div>
            </div>
            <Switch checked={autoMode} onCheckedChange={setAutoMode} />
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{alert}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Control Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Temperature Control */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Thermometer className="w-5 h-5 text-red-500" />
                <span>درجة الحرارة</span>
              </div>
              {getStatusIcon(temperature[0], 18, 28)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getStatusColor(temperature[0], 18, 28)}`}>
                  {temperature[0].toFixed(1)}°م
                </div>
                <div className="text-sm text-muted-foreground">النطاق المثالي: 18-28°م</div>
              </div>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                max={35}
                min={10}
                step={0.1}
                disabled={autoMode}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Humidity Control */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span>الرطوبة</span>
              </div>
              {getStatusIcon(humidity[0], 50, 80)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getStatusColor(humidity[0], 50, 80)}`}>
                  {humidity[0].toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">النطاق المثالي: 50-80%</div>
              </div>
              <Slider
                value={humidity}
                onValueChange={setHumidity}
                max={100}
                min={0}
                step={1}
                disabled={autoMode}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lighting Control */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Sun className="w-5 h-5 text-yellow-500" />
                <span>الإضاءة</span>
              </div>
              {getStatusIcon(lighting[0], 60, 90)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getStatusColor(lighting[0], 60, 90)}`}>
                  {lighting[0].toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">النطاق المثالي: 60-90%</div>
              </div>
              <Slider
                value={lighting}
                onValueChange={setLighting}
                max={100}
                min={0}
                step={1}
                disabled={autoMode}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setTemperature([23])
                setHumidity([65])
                setLighting([80])
              }}
              disabled={autoMode}
            >
              الإعدادات المثالية
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTemperature([20])
                setHumidity([70])
                setLighting([60])
              }}
              disabled={autoMode}
            >
              وضع الليل
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTemperature([25])
                setHumidity([60])
                setLighting([90])
              }}
              disabled={autoMode}
            >
              وضع النهار
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTemperature([22])
                setHumidity([75])
                setLighting([70])
              }}
              disabled={autoMode}
            >
              وضع الإنبات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
