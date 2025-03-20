"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import PostCard from "@/components/post-card"
import PageHeader from "@/components/page-header"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"

export default function TrendingPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an environment variable
        const response = await axios.get("http://localhost:5000/posts?type=popular")
        setPosts(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load trending posts. Please try again later.")
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Trending Posts"
        description="Posts with the highest engagement and comments"
        icon={<TrendingUp className="h-6 w-6" />}
      />

      <motion.div className="grid grid-cols-1 gap-6 mt-8" variants={container} initial="hidden" animate="show">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} trending={true} />
        ))}
      </motion.div>
    </div>
  )
}

