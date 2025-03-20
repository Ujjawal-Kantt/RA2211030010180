"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, RefreshCw } from "lucide-react"
import PostCard from "@/components/post-card"
import PageHeader from "@/components/page-header"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"
import { Button } from "@/components/ui/button"

export default function LiveFeedPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const observerRef = useRef(null)
  const loadingRef = useRef(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) setRefreshing(true)
      if (pageNum === 1) setLoading(true)

      // In a real app, this would be an environment variable
      const response = await axios.get(`http://localhost:5000/posts?type=latest&page=${pageNum}`)

      if (response.data.length === 0) {
        setHasMore(false)
      } else {
        if (refresh || pageNum === 1) {
          setPosts(response.data)
        } else {
          setPosts((prev) => [...prev, ...response.data])
        }
      }

      setLoading(false)
      setRefreshing(false)
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError("Failed to load live feed. Please try again later.")
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchPosts()

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchPosts(1, true)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !refreshing) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1 },
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, loading, refreshing])

  useEffect(() => {
    if (page > 1) {
      fetchPosts(page)
    }
  }, [page])

  const handleRefresh = () => {
    fetchPosts(1, true)
  }

  if (loading && page === 1) return <LoadingState />
  if (error) return <ErrorState message={error} />

  return (
    <div className="container mx-auto">
      <PageHeader
        title="Live Feed"
        description="Real-time updates of the latest posts"
        icon={<Activity className="h-6 w-6" />}
        action={
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled={refreshing} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        }
      />

      <AnimatePresence>
        {refreshing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary/10 text-primary text-sm p-2 rounded-md mb-4 text-center"
          >
            Refreshing feed...
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 gap-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMore && (
          <div ref={loadingRef} className="py-4 text-center">
            {loading && page > 1 && (
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

