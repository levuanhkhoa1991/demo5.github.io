"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, ShoppingCart, Filter, Grid, List, Search } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import CarDetailModal, { type CarProduct } from "@/components/car-detail-modal"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
  category: string
  description: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [selectedProduct, setSelectedProduct] = useState<CarProduct | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    // Mock fetch products
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Áo Sơ Mi Nam Cao Cấp",
        price: 299000,
        originalPrice: 399000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 124,
        badge: "Bán chạy",
        category: "fashion",
        description: "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại",
      },
      {
        id: "2",
        name: "Điện Thoại Thông Minh",
        price: 8999000,
        originalPrice: 9999000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 89,
        badge: "Giảm 10%",
        category: "electronics",
        description: "Điện thoại thông minh với camera chất lượng cao",
      },
      {
        id: "3",
        name: "Túi Xách Nữ Thời Trang",
        price: 599000,
        originalPrice: 799000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 156,
        badge: "Mới",
        category: "fashion",
        description: "Túi xách nữ da thật, thiết kế sang trọng",
      },
      {
        id: "4",
        name: "Giày Thể Thao Nam",
        price: 1299000,
        originalPrice: 1599000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 203,
        badge: "Khuyến mãi",
        category: "fashion",
        description: "Giày thể thao nam êm ái, phù hợp vận động",
      },
      {
        id: "5",
        name: "Laptop Gaming",
        price: 25999000,
        originalPrice: 28999000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 67,
        badge: "Hot",
        category: "electronics",
        description: "Laptop gaming hiệu năng cao cho game thủ",
      },
      {
        id: "6",
        name: "Đồng Hồ Thông Minh",
        price: 3999000,
        originalPrice: 4999000,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 145,
        badge: "Giảm 20%",
        category: "electronics",
        description: "Đồng hồ thông minh theo dõi sức khỏe",
      },
    ]

    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy, priceRange])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    })
  }

  const openModal = (product: Product) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge,
      description: product.description,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Đang tải sản phẩm...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Tất cả sản phẩm</h1>
          <p className="text-muted-foreground">Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold font-heading mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                </h3>

                {/* Search */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Tìm kiếm</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Danh mục</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="fashion">Thời trang</SelectItem>
                      <SelectItem value="electronics">Điện tử</SelectItem>
                      <SelectItem value="home">Gia dụng</SelectItem>
                      <SelectItem value="beauty">Sức khỏe & Làm đẹp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Khoảng giá</label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={30000000}
                      step={100000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{priceRange[0].toLocaleString()}đ</span>
                      <span>{priceRange[1].toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-muted-foreground">Hiển thị {filteredProducts.length} sản phẩm</div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Tên A-Z</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="reviews">Nhiều đánh giá nhất</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-animation ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    onClick={() => openModal(product)}
                  >
                    <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-48" : "rounded-t-lg"}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                            viewMode === "list" ? "w-full h-full" : "w-full h-64"
                          }`}
                        />
                        {product.badge && <Badge className="absolute top-3 left-3 bg-secondary">{product.badge}</Badge>}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className={`p-4 space-y-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <h3 className="font-semibold font-heading line-clamp-2">{product.name}</h3>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-primary">{product.price.toLocaleString()}đ</span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toLocaleString()}đ
                            </span>
                          )}
                        </div>

                        {viewMode === "list" && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        )}

                        <Button
                          className="w-full diagonal-hover"
                          onClick={(e) => { e.stopPropagation(); openModal(product) }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Xem & Mua
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <CarDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
