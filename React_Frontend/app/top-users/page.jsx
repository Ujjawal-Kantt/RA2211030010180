"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Users } from "lucide-react"
import UserCard from "@/components/user-card"
import PageHeader from "@/components/page-header"
import LoadingState from "@/components/loading-state"
import ErrorState from "@/components/error-state"

export default function TopUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an environment variable
        const response = await axios.get("http://localhost:5000/users")

        // Sort users by post count and get top 5
        const sortedUsers = response.data.sort((a, b) => b.posts - a.posts).slice(0, 5)

        setUsers(sortedUsers)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to load users. Please try again later.")
        setLoading(false)
      }
    }

    fetchUsers()
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
        title="Top Users"
        description="Users with the most engagement and posts"
        icon={<Users className="h-6 w-6" />}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {users.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </motion.div>
    </div>
  )
}

