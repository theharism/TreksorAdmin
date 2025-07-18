"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb, Plus, Loader2, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface PowerThought {
  _id: string
  thought: string
  date: string
}

export default function PowerThoughtsPage() {
  const [thoughts, setThoughts] = useState<PowerThought[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchPowerThoughts()
  }, [])

  const fetchPowerThoughts = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/power-thoughts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setThoughts(data.data || [])
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch power thoughts",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  const handleDeleteThought = async (_id: any) => {
    if (!confirm("Are you sure you want to delete this Power Thought?")) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/power-thoughts/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Power Thought deleted successfully",
        })
        fetchPowerThoughts()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete power thought",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading power thoughts...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Power Thoughts</h2>
          <p className="text-muted-foreground">Inspirational thoughts to motivate and guide</p>
        </div>
        <Button onClick={() => router.push("/dashboard/power-thoughts/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Power Thought
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {thoughts.map((thought) => (
          <Card key={thought._id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                <span className="text-xs text-muted-foreground">{formatDate(thought.date)}</span>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteThought(thought._id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-base">{thought.thought}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {thoughts.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No power thoughts yet</h3>
          <p className="text-muted-foreground mb-4">Create your first power thought to get started</p>
          <Button onClick={() => router.push("/dashboard/power-thoughts/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Power Thought
          </Button>
        </div>
      )}
    </div>
  )
}
