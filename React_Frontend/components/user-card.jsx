"use client"

import { motion } from "framer-motion"
import { Crown, MessageSquare, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function UserCard({ user, rank }) {
  // Generate a consistent avatar URL based on the user's id
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`

  // Determine badge color based on rank
  const getBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-500"
      case 2:
        return "bg-gray-300"
      case 3:
        return "bg-amber-600"
      default:
        return "bg-primary/70"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm h-full">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-xl" />
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />

          <div className="relative p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full ${getBadgeColor(rank)} blur-sm opacity-40`} />
                  <motion.div
                    className="relative rounded-full overflow-hidden border-2 border-white/20 h-16 w-16"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={avatarUrl || "/placeholder.svg"}
                      alt={user.username}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-lg font-bold">{user.username}</h3>
                  <p className="text-sm text-muted-foreground">@{user.username.toLowerCase()}</p>
                </div>
              </div>

              <div className={`flex items-center justify-center h-8 w-8 rounded-full ${getBadgeColor(rank)}`}>
                {rank === 1 ? (
                  <Crown className="h-4 w-4 text-black" />
                ) : rank <= 3 ? (
                  <Award className="h-4 w-4 text-black" />
                ) : (
                  <span className="text-sm font-bold text-black">{rank}</span>
                )}
              </div>
            </div>

            <CardContent className="px-0 pt-6 pb-0">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{user.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-2xl font-bold">{user.followers}</p>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                  <p className="text-xs font-medium">{Math.round(user.engagement * 100)}%</p>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${user.engagement * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

