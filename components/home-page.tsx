"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Flower2, Thermometer, Droplets, Sun, Leaf, TrendingUp, Settings } from "lucide-react"

interface HomePageProps {
  onNavigate: (page: string) => void
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center pulse-rose">
              <Flower2 className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-[family-name:var(--font-work-sans)]">
            T-Bloom
          </h1>

          <p className="text-2xl text-primary font-semibold mb-8">المستقبل الذكي للورد الطائفي 🌸</p>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              مشروع مبتكر يمكّن المزارعين من زراعة الورد الطائفي خارج موسمه الطبيعي عبر محمية ذكية تتحكم في الحرارة
              والرطوبة والإضاءة بدقة، لتحافظ على جودة الورود وتزيد الإنتاجية بطريقة مستدامة.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => onNavigate("dashboard")}>
              ابدأ التحكم بالمحمية
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent"
              onClick={() => onNavigate("analytics")}
            >
              عرض التحليلات
            </Button>
          </div>

          {/* Greenhouse Illustration */}
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-lg border">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Thermometer className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-sm font-medium">التحكم في الحرارة</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Droplets className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">ضبط الرطوبة</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sun className="w-8 h-8 text-yellow-500" />
                  </div>
                  <p className="text-sm font-medium">تنظيم الإضاءة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-work-sans)]">
            مميزات النظام الذكي
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="slide-up">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">تحكم ذكي</h3>
                <p className="text-muted-foreground">
                  نظام تحكم أوتوماتيكي يضبط الظروف البيئية تلقائياً لضمان نمو مثالي للورود
                </p>
              </CardContent>
            </Card>

            <Card className="slide-up">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">تحليلات متقدمة</h3>
                <p className="text-muted-foreground">رسوم بيانية تفاعلية لمتابعة أداء المحمية وتحسين الإنتاجية</p>
              </CardContent>
            </Card>

            <Card className="slide-up">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
