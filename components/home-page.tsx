"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flower2, Thermometer, Droplets, Sun, Leaf, TrendingUp, Settings } from "lucide-react"

interface HomePageProps {
  onNavigate: (page: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Flower2 className="w-6 h-6 text-primary/20" />
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8 animate-fade-in">
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3734e355-f33e-400d-b9c3-ad8365a3631e-tKs8ozoaoypBtYXxFCsqv6H9Tq1evn.jpeg"
                alt="T-Bloom Logo"
                className="w-32 h-32 object-contain hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-[family-name:var(--font-work-sans)] animate-fade-in-up">
            T-Bloom
          </h1>

          <p className="text-2xl text-primary font-semibold mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            المستقبل الذكي للورد الطائفي 🌸
          </p>

          <div className="max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              مشروع مبتكر يمكّن المزارعين من زراعة الورد الطائفي خارج موسمه الطبيعي عبر محمية ذكية تتحكم في الحرارة
              والرطوبة والإضاءة بدقة، لتحافظ على جودة الورود وتزيد الإنتاجية بطريقة مستدامة.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="relative group">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => onNavigate("dashboard")}
              >
                ابدأ التحكم بالمحمية
              </Button>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                تحكم في البيئة الذكية
              </div>
            </div>
            <div className="relative group">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground transform hover:scale-105 transition-all duration-300"
                onClick={() => onNavigate("analytics")}
              >
                عرض التحليلات
              </Button>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                رسوم بيانية تفاعلية
              </div>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl p-8 shadow-2xl border backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Thermometer className="w-8 h-8 text-red-500 group-hover:animate-pulse" />
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">التحكم في الحرارة</p>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Droplets className="w-8 h-8 text-blue-500 group-hover:animate-bounce" />
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">ضبط الرطوبة</p>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Sun className="w-8 h-8 text-yellow-500 group-hover:animate-spin" />
                  </div>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">تنظيم الإضاءة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted/30 to-muted/20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-work-sans)] animate-fade-in-up">
            مميزات النظام الذكي
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="slide-up hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">تحكم ذكي</h3>
                <p className="text-muted-foreground">
                  نظام تحكم أوتوماتيكي يضبط الظروف البيئية تلقائياً لضمان نمو مثالي للورود
                </p>
              </CardContent>
            </Card>

            <Card
              className="slide-up hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">تحليلات متقدمة</h3>
                <p className="text-muted-foreground">رسوم بيانية تفاعلية لمتابعة أداء المحمية وتحسين الإنتاجية</p>
              </CardContent>
            </Card>

            <Card
              className="slide-up hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm"
              style={{ animationDelay: "0.4s" }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">زراعة مستدامة</h3>
                <p className="text-muted-foreground">
                  تقنيات صديقة للبيئة تقلل استهلاك المياه والطاقة مع زيادة الإنتاج
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
