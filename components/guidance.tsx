"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Calendar, Thermometer, Droplets, Sun, Flower2 } from "lucide-react"
import { useState } from "react"

export function Guidance() {
  const [searchTerm, setSearchTerm] = useState("")

  const guidanceData = [
    {
      id: 1,
      title: "زراعة الورد الطائفي في الشتاء",
      category: "موسمي",
      icon: Calendar,
      content:
        "خلال فصل الشتاء، يحتاج الورد الطائفي إلى درجة حرارة 18-22°م ورطوبة 60-70%. قم بتقليل الري وزيادة الإضاءة الاصطناعية.",
      tips: ["تقليل الري إلى مرتين أسبوعياً", "زيادة الإضاءة إلى 12 ساعة يومياً", "مراقبة الآفات الشتوية"],
    },
    {
      id: 2,
      title: "التحكم في درجة الحرارة",
      category: "تقني",
      icon: Thermometer,
      content: "الحفاظ على درجة حرارة مثالية أمر بالغ الأهمية. استخدم أجهزة التدفئة والتبريد بذكاء لتوفير الطاقة.",
      tips: ["استخدام مستشعرات متعددة", "برمجة تغيرات تدريجية", "عزل المحمية جيداً"],
    },
    {
      id: 3,
      title: "إدارة الرطوبة المثلى",
      category: "تقني",
      icon: Droplets,
      content: "الرطوبة المناسبة تمنع الأمراض الفطرية وتحسن نمو الورود. استخدم أنظمة الرش والتهوية.",
      tips: ["مراقبة الرطوبة كل ساعة", "تهوية منتظمة", "تجنب الرطوبة الزائدة ليلاً"],
    },
    {
      id: 4,
      title: "أنظمة الإضاءة الذكية",
      category: "تقني",
      icon: Sun,
      content: "الإضاءة LED توفر الطيف المناسب للنمو مع توفير الطاقة. برمج دورات الإضاءة حسب مراحل النمو.",
      tips: ["استخدام LED طيف كامل", "برمجة دورات 16/8 ساعات", "تدرج شدة الإضاءة"],
    },
    {
      id: 5,
      title: "العناية بالورود الصغيرة",
      category: "زراعي",
      icon: Flower2,
      content: "الشتلات الصغيرة تحتاج عناية خاصة. وفر لها بيئة محمية ومراقبة مستمرة.",
      tips: ["حماية من التيارات الهوائية", "ري خفيف ومنتظم", "تسميد متوازن"],
    },
    {
      id: 6,
      title: "مكافحة الآفات طبيعياً",
      category: "زراعي",
      icon: BookOpen,
      content: "استخدم الطرق الطبيعية لمكافحة الآفات. الوقاية خير من العلاج.",
      tips: ["فحص دوري للنباتات", "استخدام المفترسات الطبيعية", "تنظيف المحمية باستمرار"],
    },
  ]

  const filteredGuidance = guidanceData.filter(
    (item) => item.title.includes(searchTerm) || item.content.includes(searchTerm),
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "موسمي":
        return "bg-blue-100 text-blue-800"
      case "تقني":
        return "bg-green-100 text-green-800"
      case "زراعي":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-work-sans)]">الإرشاد الزراعي</h1>
        <p className="text-muted-foreground">نصائح وإرشادات لزراعة الورد الطائفي بنجاح</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="ابحث في الإرشادات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Guidance Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredGuidance.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{item.content}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">نصائح مهمة:</h4>
                  <ul className="space-y-1">
                    {item.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 ml-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Video Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <BookOpen className="w-5 h-5" />
            <span>مقاطع فيديو تعليمية</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Flower2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">زراعة الورد الطائفي</h3>
              <p className="text-sm text-muted-foreground mb-3">دليل شامل لزراعة الورد الطائفي من البذرة إلى الإزهار</p>
              <Button size="sm" variant="outline">
                مشاهدة
              </Button>
            </div>

            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Thermometer className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">إعداد المحمية الذكية</h3>
              <p className="text-sm text-muted-foreground mb-3">كيفية تركيب وضبط أنظمة التحكم في المحمية</p>
              <Button size="sm" variant="outline">
                مشاهدة
              </Button>
            </div>

            <div className="bg-muted rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sun className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">حل المشاكل الشائعة</h3>
              <p className="text-sm text-muted-foreground mb-3">تشخيص وحل أهم المشاكل في زراعة الورود</p>
              <Button size="sm" variant="outline">
                مشاهدة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
