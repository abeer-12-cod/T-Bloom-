"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Upload, MessageCircle, Heart, Share2, Camera, Users, HelpCircle } from "lucide-react"

export function Community() {
  const [newPost, setNewPost] = useState("")
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
    },
    {
      id: 2,
      user: "فاطمة الخبيرة",
      avatar: "ف",
      time: "منذ 4 ساعات",
      content: "لاحظت بعض البقع على أوراق الورد. هل يمكن أن تكون فطريات؟ أحتاج مساعدة في التشخيص.",
      image: "/rose-leaves-spots.png",
      likes: 8,
      comments: 7,
      category: "مساعدة",
    },
    {
      id: 3,
      user: "محمد التقني",
      avatar: "م",
      time: "منذ يوم",
      content: "نصيحة: استخدموا مستشعرات الرطوبة في التربة لتحسين الري. لاحظت فرق كبير في النمو!",
      likes: 15,
      comments: 5,
      category: "نصيحة",
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
        likes: 0,
        comments: 0,
        category: "عام",
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "نجاح":
        return "bg-green-100 text-green-800"
      case "مساعدة":
        return "bg-red-100 text-red-800"
      case "نصيحة":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-work-sans)]">المجتمع</h1>
        <p className="text-muted-foreground">تواصل مع مزارعين آخرين وشارك تجربتك</p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-muted-foreground">عضو نشط</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold">567</div>
            <div className="text-sm text-muted-foreground">منشور هذا الشهر</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <HelpCircle className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">سؤال تم حله</div>
          </CardContent>
        </Card>
      </div>

      {/* New Post */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>شارك تجربتك</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="اكتب عن تجربتك في زراعة الورد الطائفي..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2 space-x-reverse">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 ml-2" />
                  إضافة صورة
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع ملف
                </Button>
              </div>
              <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                نشر
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 space-x-reverse mb-4">
                <Avatar>
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{post.user}</h3>
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
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex space-x-4 space-x-reverse">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 ml-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 ml-1" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expert Chat Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>دردشة مع الخبراء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-2">الخبراء متاحون للإجابة على أسئلتكم</p>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">3 خبراء متاحون الآن</span>
            </div>
          </div>

          <div className="flex space-x-2 space-x-reverse">
            <Input placeholder="اكتب سؤالك هنا..." className="flex-1" />
            <Button>إرسال</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
