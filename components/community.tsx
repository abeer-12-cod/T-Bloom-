"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  MessageCircle,
  Heart,
  Share2,
  Camera,
  Users,
  HelpCircle,
  Star,
  CheckCircle,
  Send,
  Zap,
  TrendingUp,
} from "lucide-react"

export function Community() {
  const [newPost, setNewPost] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [activeTab, setActiveTab] = useState("feed")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "أحمد المزارع",
      avatar: "أ",
      time: "منذ ساعتين",
      content: "حصلت على إزهار رائع هذا الموسم! الورود الطائفية تبدو جميلة جداً 🌹",
      image: "/taif-roses-greenhouse.png",
      likes: 12,
      comments: 3,
      category: "نجاح",
      isLiked: false,
      verified: true,
    },
    {
      id: 2,
      user: "فاطمة الخبيرة",
      avatar: "ف",
      time: "منذ 4 ساعات",
      content: "لاحظت بعض البقع على أوراق الورد. هل يمكن أن تكون فطريات؟ أحتاج مساعدة في التشخيص.",
      image: "/rose-leaves-brown-spots.png",
      likes: 8,
      comments: 7,
      category: "مساعدة",
      isLiked: true,
      verified: false,
    },
    {
      id: 3,
      user: "محمد التقني",
      avatar: "م",
      time: "منذ يوم",
      content: "نصيحة: استخدموا مستشعرات الرطوبة في التربة لتحسين الري. لاحظت فرق كبير في النمو!",
      image: "/single-red-rose.png",
      likes: 15,
      comments: 5,
      category: "نصيحة",
      isLiked: false,
      verified: true,
    },
    {
      id: 4,
      user: "سارة المبتدئة",
      avatar: "س",
      time: "منذ يومين",
      content: "أول محصول لي من الورد الطائفي! شكراً للمجتمع على كل النصائح والدعم 💚",
      image: "/successful-taif-rose-garden.png",
      likes: 23,
      comments: 12,
      category: "نجاح",
      isLiked: true,
      verified: false,
    },
  ])

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "د. علي الخبير",
      avatar: "ع",
      message: "مرحباً بكم! أنا متاح للإجابة على أسئلتكم حول زراعة الورد الطائفي",
      time: "10:30",
      isExpert: true,
    },
    {
      id: 2,
      user: "أحمد",
      avatar: "أ",
      message: "دكتور، ما هي أفضل درجة حرارة للإنبات؟",
      time: "10:32",
      isExpert: false,
    },
    {
      id: 3,
      user: "د. علي الخبير",
      avatar: "ع",
      message: "درجة الحرارة المثالية للإنبات هي 22-24°م مع رطوبة 70-75%",
      time: "10:35",
      isExpert: true,
    },
  ])

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: "أنت",
        avatar: "أ",
        time: "الآن",
        content: newPost,
        image: selectedImage,
        likes: 0,
        comments: 0,
        category: "عام",
        isLiked: false,
        verified: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
      setSelectedImage(null)
    }
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        user: "أنت",
        avatar: "أ",
        message: chatMessage,
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
        isExpert: false,
      }
      setChatMessages([...chatMessages, message])
      setChatMessage("")
    }
  }

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleImageUpload = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "نجاح":
        return "bg-green-100 text-green-800 border-green-200"
      case "مساعدة":
        return "bg-red-100 text-red-800 border-red-200"
      case "نصيحة":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-background via-muted/10 to-background min-h-screen">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-work-sans)] bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          المجتمع
        </h1>
        <p className="text-muted-foreground text-lg">تواصل مع مزارعين آخرين وشارك تجربتك</p>
      </div>

      {/* Enhanced Community Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">1,234</div>
            <div className="text-sm text-blue-600 font-medium">عضو نشط</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">+12% هذا الشهر</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">567</div>
            <div className="text-sm text-green-600 font-medium">منشور هذا الشهر</div>
            <div className="flex items-center justify-center mt-2">
              <Zap className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-xs text-yellow-600">نشاط عالي</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">89</div>
            <div className="text-sm text-purple-600 font-medium">سؤال تم حله</div>
            <div className="flex items-center justify-center mt-2">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600">معدل حل 94%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50">
          <TabsTrigger value="feed" className="flex items-center space-x-2 space-x-reverse">
            <MessageCircle className="w-4 h-4" />
            <span>التغذية الإخبارية</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center space-x-2 space-x-reverse">
            <Users className="w-4 h-4" />
            <span>دردشة الخبراء</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Enhanced New Post */}
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>شارك تجربتك</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="اكتب عن تجربتك في زراعة الورد الطائفي..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                  className="resize-none focus:ring-2 focus:ring-primary/20"
                />

                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="صورة مرفقة"
                      className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-primary/30"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      إزالة
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleImageUpload("/taif-roses-greenhouse.png")}
                      className="hover:bg-primary/10 transition-colors"
                    >
                      <Camera className="w-4 h-4 ml-2" />
                      إضافة صورة
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-secondary/10 transition-colors bg-transparent"
                    >
                      <Upload className="w-4 h-4 ml-2" />
                      رفع ملف
                    </Button>
                  </div>
                  <Button
                    onClick={handleSubmitPost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300"
                  >
                    نشر
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Posts Feed */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className="bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 space-x-reverse mb-4">
                    <Avatar className="ring-2 ring-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-bold">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <h3 className="font-semibold">{post.user}</h3>
                            {post.verified && <CheckCircle className="w-4 h-4 text-blue-500" title="خبير معتمد" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{post.time}</p>
                        </div>
                        <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 leading-relaxed">{post.content}</p>

                  {post.image && (
                    <div className="mb-4">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="منشور المستخدم"
                        className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex space-x-4 space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`hover:bg-red-50 transition-colors ${
                          post.isLiked ? "text-red-500" : "text-muted-foreground"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ml-1 transition-all duration-300 ${
                            post.isLiked ? "fill-current animate-pulse" : ""
                          }`}
                        />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-4 h-4 ml-1" />
                        {post.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-green-50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          {/* Expert Status */}
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <span>الخبراء متاحون للإجابة على أسئلتكم</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">3 خبراء متاحون الآن</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Chat Messages */}
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>دردشة مع الخبراء</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4 p-4 bg-muted/20 rounded-lg">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 space-x-reverse ${
                      msg.isExpert ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="ring-2 ring-primary/20">
                      <AvatarFallback
                        className={`${
                          msg.isExpert
                            ? "bg-gradient-to-br from-yellow-200 to-yellow-300 text-yellow-800"
                            : "bg-gradient-to-br from-primary/20 to-secondary/20 text-primary"
                        } font-bold`}
                      >
                        {msg.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex-1 ${msg.isExpert ? "text-right" : ""}`}>
                      <div className="flex items-center space-x-2 space-x-reverse mb-1">
                        <span className="font-semibold text-sm">{msg.user}</span>
                        {msg.isExpert && <Star className="w-4 h-4 text-yellow-500" title="خبير معتمد" />}
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div
                        className={`p-3 rounded-lg max-w-xs ${
                          msg.isExpert
                            ? "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-900 ml-auto"
                            : "bg-gradient-to-r from-primary/10 to-secondary/10"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <Input
                  placeholder="اكتب سؤالك هنا..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
