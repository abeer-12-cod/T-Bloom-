"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  BookOpen,
  Calendar,
  Thermometer,
  Droplets,
  Sun,
  Flower2,
  AlertTriangle,
  CheckCircle,
  Play,
  Clock,
  Bug,
  Scissors,
} from "lucide-react"
import { useState } from "react"

export function Guidance() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("guides")

  const guidanceData = [
    {
      id: 1,
      title: "زراعة الورد الطائفي في الشتاء",
      category: "موسمي",
      difficulty: "متوسط",
      icon: Calendar,
      content:
        "خلال فصل الشتاء، يحتاج الورد الطائفي إلى درجة حرارة 18-22°م ورطوبة 60-70%. قم بتقليل الري وزيادة الإضاءة الاصطناعية.",
      tips: ["تقليل الري إلى مرتين أسبوعياً", "زيادة الإضاءة إلى 12 ساعة يومياً", "مراقبة الآفات الشتوية"],
      warning: "تجنب التعرض المفاجئ للبرد",
    },
    {
      id: 2,
      title: "التحكم في درجة الحرارة",
      category: "تقني",
      difficulty: "سهل",
      icon: Thermometer,
      content: "الحفاظ على درجة حرارة مثالية أمر بالغ الأهمية. استخدم أجهزة التدفئة والتبريد بذكاء لتوفير الطاقة.",
      tips: ["استخدام مستشعرات متعددة", "برمجة تغيرات تدريجية", "عزل المحمية جيداً"],
      warning: "تجنب التغيرات المفاجئة في الحرارة",
    },
    {
      id: 3,
      title: "إدارة الرطوبة المثلى",
      category: "تقني",
      difficulty: "متوسط",
      icon: Droplets,
      content: "الرطوبة المناسبة تمنع الأمراض الفطرية وتحسن نمو الورود. استخدم أنظمة الرش والتهوية.",
      tips: ["مراقبة الرطوبة كل ساعة", "تهوية منتظمة", "تجنب الرطوبة الزائدة ليلاً"],
      warning: "الرطوبة العالية تسبب الأمراض الفطرية",
    },
    {
      id: 4,
      title: "أنظمة الإضاءة الذكية",
      category: "تقني",
      difficulty: "صعب",
      icon: Sun,
      content: "الإضاءة LED توفر الطيف المناسب للنمو مع توفير الطاقة. برمج دورات الإضاءة حسب مراحل النمو.",
      tips: ["استخدام LED طيف كامل", "برمجة دورات 16/8 ساعات", "تدرج شدة الإضاءة"],
      warning: "الإضاءة المفرطة تضر بالنباتات",
    },
    {
      id: 5,
      title: "العناية بالورود الصغيرة",
      category: "زراعي",
      difficulty: "سهل",
      icon: Flower2,
      content: "الشتلات الصغيرة تحتاج عناية خاصة. وفر لها بيئة محمية ومراقبة مستمرة.",
      tips: ["حماية من التيارات الهوائية", "ري خفيف ومنتظم", "تسميد متوازن"],
      warning: "تجنب الإفراط في الري للشتلات",
    },
    {
      id: 6,
      title: "مكافحة الآفات طبيعياً",
      category: "زراعي",
      difficulty: "متوسط",
      icon: Bug,
      content: "استخدم الطرق الطبيعية لمكافحة الآفات. الوقاية خير من العلاج.",
      tips: ["فحص دوري للنباتات", "استخدام المفترسات الطبيعية", "تنظيف المحمية باستمرار"],
      warning: "تجنب المبيدات الكيميائية القوية",
    },
  ]

  const seasonalCalendar = [
    {
      month: "يناير",
      temperature: "18-20°م",
      humidity: "65-70%",
      lighting: "12 ساعة",
      tasks: ["تقليم خفيف", "تقليل الري", "مراقبة الآفات"],
    },
    {
      month: "فبراير",
      temperature: "19-21°م",
      humidity: "60-65%",
      lighting: "13 ساعة",
      tasks: ["بداية التسميد", "زيادة التهوية", "فحص الجذور"],
    },
    {
      month: "مارس",
      temperature: "20-23°م",
      humidity: "55-65%",
      lighting: "14 ساعة",
      tasks: ["زراعة شتلات جديدة", "تسميد نيتروجيني", "تنظيف المحمية"],
    },
    {
      month: "أبريل",
      temperature: "22-25°م",
      humidity: "50-60%",
      lighting: "15 ساعة",
      tasks: ["بداية الإزهار", "زيادة الري", "مراقبة النمو"],
    },
  ]

  const videoLibrary = [
    {
      id: 1,
      title: "زراعة الورد الطائفي من البذرة",
      duration: "15:30",
      category: "أساسيات",
      thumbnail: "/placeholder-rwvjg.png",
      description: "دليل شامل لزراعة الورد الطائفي من البذرة إلى الإزهار",
    },
    {
      id: 2,
      title: "إعداد المحمية الذكية",
      duration: "22:45",
      category: "تقني",
      thumbnail: "/smart-greenhouse.png",
      description: "كيفية تركيب وضبط أنظمة التحكم في المحمية",
    },
    {
      id: 3,
      title: "تشخيص أمراض الورود",
      duration: "18:20",
      category: "علاج",
      thumbnail: "/rose-disease-diagnosis.png",
      description: "تشخيص وعلاج أهم الأمراض التي تصيب الورود",
    },
    {
      id: 4,
      title: "تقنيات التقليم المتقدمة",
      duration: "12:15",
      category: "عناية",
      thumbnail: "/rose-pruning.png",
      description: "طرق التقليم الصحيحة لتحسين الإنتاجية",
    },
    {
      id: 5,
      title: "نظام الري الذكي",
      duration: "16:40",
      category: "تقني",
      thumbnail: "/smart-irrigation-system.png",
      description: "تصميم وتشغيل نظام ري ذكي للمحمية",
    },
    {
      id: 6,
      title: "حصاد وتجفيف الورود",
      duration: "14:25",
      category: "حصاد",
      thumbnail: "/rose-harvesting-drying.png",
      description: "أفضل الطرق لحصاد وتجفيف الورد الطائفي",
    },
  ]

  const filteredGuidance = guidanceData.filter(
    (item) => item.title.includes(searchTerm) || item.content.includes(searchTerm),
  )

  const filteredVideos = videoLibrary.filter(
    (video) => video.title.includes(searchTerm) || video.description.includes(searchTerm),
  )

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "موسمي":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "تقني":
        return "bg-green-100 text-green-800 border-green-200"
      case "زراعي":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "سهل":
        return "bg-green-100 text-green-800"
      case "متوسط":
        return "bg-yellow-100 text-yellow-800"
      case "صعب":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-background via-muted/10 to-background min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-work-sans)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          الإرشاد الزراعي
        </h1>
        <p className="text-muted-foreground text-lg">نصائح وإرشادات لزراعة الورد الطائفي بنجاح</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="ابحث في الإرشادات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-10 bg-white shadow-lg border-2 focus:border-primary transition-all duration-300"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
          <TabsTrigger value="guides" className="flex items-center space-x-2 space-x-reverse">
            <BookOpen className="w-4 h-4" />
            <span>الإرشادات</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center space-x-2 space-x-reverse">
            <Calendar className="w-4 h-4" />
            <span>التقويم الموسمي</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center space-x-2 space-x-reverse">
            <Play className="w-4 h-4" />
            <span>مكتبة الفيديو</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredGuidance.map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.id}
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                          <div className="flex space-x-2 space-x-reverse">
                            <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                            <Badge className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{item.content}</p>

                    {item.warning && (
                      <Alert className="mb-4 border-yellow-200 bg-yellow-50">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">{item.warning}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        نصائح مهمة:
                      </h4>
                      <ul className="space-y-2">
                        {item.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 ml-2 flex-shrink-0"></span>
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
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="w-5 h-5 text-primary" />
                <span>التقويم الموسمي للورد الطائفي</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {seasonalCalendar.map((month, index) => (
                  <Card
                    key={month.month}
                    className="bg-gradient-to-br from-muted/30 to-muted/10 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-primary">{month.month}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center">
                            <Thermometer className="w-4 h-4 text-red-500 mr-1" />
                            <span>{month.temperature}</span>
                          </div>
                          <div className="flex items-center">
                            <Droplets className="w-4 h-4 text-blue-500 mr-1" />
                            <span>{month.humidity}</span>
                          </div>
                          <div className="flex items-center">
                            <Sun className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{month.lighting}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center">
                            <Scissors className="w-4 h-4 text-green-500 mr-1" />
                            المهام الأساسية:
                          </h4>
                          <ul className="space-y-1">
                            {month.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-sm text-muted-foreground flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 animate-fade-in-up group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-primary ml-1" />
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white border-0">{video.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-white transition-colors bg-transparent"
                    >
                      مشاهدة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
