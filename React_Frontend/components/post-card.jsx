"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Heart, Share2, Bookmark, Flame } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function PostCard({ post, trending = false }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [saved, setSaved] = useState(false)

  // Generate a consistent avatar URL based on the user's id
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card className="overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl opacity-60" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl opacity-60" />

          <div className="relative p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={avatarUrl} alt={post.username} />
                  <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{post.username}</p>
                    {trending && (
                      <div className="flex items-center gap-1 text-xs bg-orange-500/20 text-orange-500 px-2 py-0.5 rounded-full">
                        <Flame className="h-3 w-3" />
                        <span>Trending</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(post.date)}</p>
                </div>
              </div>
            </div>

            <CardContent className="px-0 py-4">
              <p className="mb-4">{post.content}</p>

              {post.image && (
                <div className="rounded-lg overflow-hidden border border-white/10 mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post image"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=300&width=500"
                    }}
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                {post.tags &&
                  post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
              </div>
            </CardContent>

            <CardFooter className="px-0 pt-2 pb-0 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm" onClick={handleLike}>
                  <motion.div whileTap={{ scale: 1.5 }} transition={{ duration: 0.2 }}>
                    <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  </motion.div>
                  <span>{likes}</span>
                </Button>

                <div className="flex items-center gap-1 text-sm">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full ${trending ? "bg-orange-500" : "bg-primary"} blur-sm opacity-30`}
                      />
                      <div
                        className={`relative flex items-center gap-1 ${trending ? "text-orange-500" : "text-primary"} px-2 py-1 rounded-full border ${trending ? "border-orange-500/20" : "border-primary/20"}`}
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
                  <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

