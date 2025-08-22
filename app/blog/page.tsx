import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Fashion Trends to Watch This Season",
      excerpt: "Discover the latest fashion trends that are taking the world by storm this season.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Fashion",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Smart Home Technology",
      excerpt: "Transform your home into a smart haven with these cutting-edge technologies.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Mike Chen",
      date: "March 12, 2024",
      category: "Technology",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Sustainable Shopping: Making Eco-Friendly Choices",
      excerpt: "Learn how to make environmentally conscious decisions while shopping online.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Emily Davis",
      date: "March 10, 2024",
      category: "Lifestyle",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Health & Wellness Products for a Better Life",
      excerpt: "Explore the best health and wellness products to improve your daily routine.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Dr. James Wilson",
      date: "March 8, 2024",
      category: "Health",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Kitchen Gadgets That Will Change Your Cooking",
      excerpt: "Revolutionary kitchen tools and gadgets that every home chef needs.",
      image: "/placeholder.svg?height=300&width=400",
      author: "Chef Maria Rodriguez",
      date: "March 5, 2024",
      category: "Home & Garden",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "The Future of E-commerce: Trends and Predictions",
      excerpt: "What to expect in the world of online shopping in the coming years.",
      image: "/placeholder.svg?height=300&width=400",
      author: "John Smith",
      date: "March 3, 2024",
      category: "Business",
      readTime: "9 min read",
    },
  ]

  const categories = ["All", "Fashion", "Technology", "Lifestyle", "Health", "Home & Garden", "Business"]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends, tips, and insights from our experts.
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search articles..." className="pl-10" />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className="diagonal-hover"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-animation"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary">{post.category}</Badge>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold font-heading line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          Read More
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="diagonal-hover bg-transparent">
                Load More Articles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
