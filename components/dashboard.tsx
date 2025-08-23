"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Droplets, Sun, Zap, AlertTriangle, CheckCircle, Activity, Flower2 } from "lucide-react"

export function Dashboard() {
  const [temperature, setTemperature] = useState([22])
  const [humidity, setHumidity] = useState([65])
  const [lighting, setLighting] = useState([75])
  const [autoMode, setAutoMode] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState("")

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

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return "text-secondary"
    if (value < min - 5 || value > max + 5) return "text-destructive"
    return "text-yellow-600"
  }

  const getStatusIcon = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) {
      return <CheckCircle className="w-5 h-5 text-secondary animate-pulse" />
    }
    if (value < min - 5 || value > max + 5) {
      return <AlertTriangle className="w-5 h-5 text-destructive animate-bounce" />
    }
    return <Activity className="w-5 h-5 text-yellow-600" />
  }

  const getAlertSeverity = (value: number, min: number, max: number) => {
    if (value < min - 5 || value > max + 5) return "critical"
    if (value < min || value > max) return "warning"
    return "normal"
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-background via-muted/10 to-background min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
            <Flower2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-work-sans)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          لوحة التحكم
        </h1>
        <p className="text-muted-foreground text-lg">تحكم في ظروف المحمية الذكية لزراعة الورد الطائفي</p>
      </div>

      {successMessage && (
        <Alert className="mb-6 border-secondary bg-secondary/10 animate-fade-in-up">
          <CheckCircle className="h-4 w-4 text-secondary" />
          <AlertDescription className="text-secondary font-medium">{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Auto Mode Toggle */}
      <Card className="mb-6 bg-gradient-to-r from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">الوضع الذكي</h3>
                <p className="text-sm text-muted-foreground">تشغيل الضبط الأوتوماتيكي للظروف البيئية</p>
                <Badge variant={autoMode ? "default" : "secondary"} className="mt-1">
                  {autoMode ? "مفعل" : "معطل"}
                </Badge>
              </div>
            </div>
            <Switch
              checked={autoMode}
              onCheckedChange={(checked) => {
                setAutoMode(checked)
                showSuccess(checked ? "تم تفعيل الوضع الذكي" : "تم إيقاف الوضع الذكي")
              }}
            />
          </div>
        </CardContent>
      </Card>

      {alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {alerts.map((alert, index) => {
            const severity =
              index === 0
                ? getAlertSeverity(temperature[0], 18, 28)
                : index === 1
                  ? getAlertSeverity(humidity[0], 50, 80)
                  : getAlertSeverity(lighting[0], 60, 90)

            return (
              <Alert
                key={index}
                variant={severity === "critical" ? "destructive" : "default"}
                className={`animate-fade-in-up ${
                  severity === "critical"
                    ? "border-red-500 bg-red-50"
                    : severity === "warning"
                      ? "border-yellow-500 bg-yellow-50"
                      : ""
                }`}
              >
                <AlertTriangle className={`h-4 w-4 ${severity === "critical" ? "animate-bounce" : "animate-pulse"}`} />
                <AlertDescription className="font-medium">{alert}</AlertDescription>
              </Alert>
            )
          })}
        </div>
      )}

      {/* Control Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Temperature Control */}
        <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-red-500" />
                </div>
                <span>درجة الحرارة</span>
              </div>
              {getStatusIcon(temperature[0], 18, 28)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold transition-colors duration-300 ${getStatusColor(temperature[0], 18, 28)}`}
                >
                  {temperature[0].toFixed(1)}°م
                </div>
                <div className="text-sm text-muted-foreground">النطاق المثالي: 18-28°م</div>
                <Badge
                  variant={temperature[0] >= 18 && temperature[0] <= 28 ? "default" : "destructive"}
                  className="mt-2"
                >
                  {temperature[0] >= 18 && temperature[0] <= 28 ? "مثالي" : "يحتاج تعديل"}
                </Badge>
              </div>
              <Slider
                value={temperature}
                onValueChange={(value) => {
                  setTemperature(value)
                  showSuccess("تم تعديل درجة الحرارة بنجاح")
                }}
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
        <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <span>الرطوبة</span>
              </div>
              {getStatusIcon(humidity[0], 50, 80)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold transition-colors duration-300 ${getStatusColor(humidity[0], 50, 80)}`}
                >
                  {humidity[0].toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">النطاق المثالي: 50-80%</div>
                <Badge variant={humidity[0] >= 50 && humidity[0] <= 80 ? "default" : "destructive"} className="mt-2">
                  {humidity[0] >= 50 && humidity[0] <= 80 ? "مثالي" : "يحتاج تعديل"}
                </Badge>
              </div>
              <Slider
                value={humidity}
                onValueChange={(value) => {
                  setHumidity(value)
                  showSuccess("تم تعديل الرطوبة بنجاح")
                }}
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
        <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center">
                  <Sun className="w-5 h-5 text-yellow-500" />
                </div>
                <span>الإضاءة</span>
              </div>
              {getStatusIcon(lighting[0], 60, 90)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div
                  className={`text-4xl font-bold transition-colors duration-300 ${getStatusColor(lighting[0], 60, 90)}`}
                >
                  {lighting[0].toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">النطاق المثالي: 60-90%</div>
                <Badge variant={lighting[0] >= 60 && lighting[0] <= 90 ? "default" : "destructive"} className="mt-2">
                  {lighting[0] >= 60 && lighting[0] <= 90 ? "مثالي" : "يحتاج تعديل"}
                </Badge>
              </div>
              <Slider
                value={lighting}
                onValueChange={(value) => {
                  setLighting(value)
                  showSuccess("تم تعديل الإضاءة بنجاح")
                }}
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
      <Card className="bg-gradient-to-r from-card to-card/80 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Activity className="w-5 h-5 text-primary" />
            <span>إجراءات سريعة</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="bg-gradient-to-r from-secondary/10 to-secondary/20 hover:from-secondary hover:to-secondary/80 hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setTemperature([23])
                setHumidity([65])
                setLighting([80])
                showSuccess("تم تطبيق الإعدادات المثالية")
              }}
              disabled={autoMode}
            >
              الإعدادات المثالية
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setTemperature([20])
                setHumidity([70])
                setLighting([60])
                showSuccess("تم تطبيق وضع الليل")
              }}
              disabled={autoMode}
            >
              وضع الليل
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-500 hover:to-yellow-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setTemperature([25])
                setHumidity([60])
                setLighting([90])
                showSuccess("تم تطبيق وضع النهار")
              }}
              disabled={autoMode}
            >
              وضع النهار
            </Button>
            <Button
              variant="outline"
              className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-500 hover:to-green-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                setTemperature([22])
                setHumidity([75])
                setLighting([70])
                showSuccess("تم تطبيق وضع الإنبات")
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
