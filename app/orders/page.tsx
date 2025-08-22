"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, CheckCircle, Clock, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"

interface Order {
  id: string
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
  items: Array<{
    id: string
    name: string
    image: string
    quantity: number
    price: number
  }>
  totalPrice: number
  createdAt: string
  estimatedDelivery?: string
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock fetch orders
    const mockOrders: Order[] = [
      {
        id: "ORD-1703123456789",
        status: "shipping",
        items: [
          {
            id: "1",
            name: "Áo Sơ Mi Nam Cao Cấp",
            image: "/placeholder.svg?height=80&width=80",
            quantity: 1,
            price: 299000,
          },
          {
            id: "2",
            name: "Túi Xách Nữ Thời Trang",
            image: "/placeholder.svg?height=80&width=80",
            quantity: 1,
            price: 599000,
          },
        ],
        totalPrice: 898000,
        createdAt: "2024-12-21T10:30:00Z",
        estimatedDelivery: "2024-12-24T17:00:00Z",
      },
      {
        id: "ORD-1703023456789",
        status: "delivered",
        items: [
          {
            id: "3",
            name: "Giày Thể Thao Nam",
            image: "/placeholder.svg?height=80&width=80",
            quantity: 1,
            price: 1299000,
          },
        ],
        totalPrice: 1299000,
        createdAt: "2024-12-15T14:20:00Z",
      },
      {
        id: "ORD-1702923456789",
        status: "confirmed",
        items: [
          {
            id: "4",
            name: "Điện Thoại Thông Minh",
            image: "/placeholder.svg?height=80&width=80",
            quantity: 1,
            price: 8999000,
          },
        ],
        totalPrice: 8999000,
        createdAt: "2024-12-18T09:15:00Z",
        estimatedDelivery: "2024-12-25T17:00:00Z",
      },
    ]

    setOrders(mockOrders)
    setLoading(false)
  }, [])

  const getStatusInfo = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return { label: "Chờ xác nhận", color: "bg-yellow-500", icon: Clock }
      case "confirmed":
        return { label: "Đã xác nhận", color: "bg-blue-500", icon: Package }
      case "shipping":
        return { label: "Đang giao", color: "bg-orange-500", icon: Truck }
      case "delivered":
        return { label: "Đã giao", color: "bg-green-500", icon: CheckCircle }
      case "cancelled":
        return { label: "Đã hủy", color: "bg-red-500", icon: Package }
      default:
        return { label: "Không xác định", color: "bg-gray-500", icon: Package }
    }
  }

  const filterOrdersByStatus = (status?: Order["status"]) => {
    if (!status) return orders
    return orders.filter((order) => order.status === status)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold font-heading mb-4">Vui lòng đăng nhập</h1>
            <p className="text-muted-foreground mb-6">Bạn cần đăng nhập để xem đơn hàng của mình</p>
            <Button asChild>
              <Link href="/login">Đăng nhập</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Đang tải đơn hàng...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Đơn hàng của tôi</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý các đơn hàng của bạn</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Tất cả ({orders.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Đã xác nhận ({filterOrdersByStatus("confirmed").length})</TabsTrigger>
            <TabsTrigger value="shipping">Đang giao ({filterOrdersByStatus("shipping").length})</TabsTrigger>
            <TabsTrigger value="delivered">Đã giao ({filterOrdersByStatus("delivered").length})</TabsTrigger>
            <TabsTrigger value="cancelled">Đã hủy ({filterOrdersByStatus("cancelled").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <OrderList orders={orders} getStatusInfo={getStatusInfo} />
          </TabsContent>
          <TabsContent value="confirmed" className="mt-6">
            <OrderList orders={filterOrdersByStatus("confirmed")} getStatusInfo={getStatusInfo} />
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <OrderList orders={filterOrdersByStatus("shipping")} getStatusInfo={getStatusInfo} />
          </TabsContent>
          <TabsContent value="delivered" className="mt-6">
            <OrderList orders={filterOrdersByStatus("delivered")} getStatusInfo={getStatusInfo} />
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            <OrderList orders={filterOrdersByStatus("cancelled")} getStatusInfo={getStatusInfo} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}

function OrderList({
  orders,
  getStatusInfo,
}: {
  orders: Order[]
  getStatusInfo: (status: Order["status"]) => { label: string; color: string; icon: any }
}) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Chưa có đơn hàng nào</h3>
        <p className="text-muted-foreground mb-6">Bạn chưa có đơn hàng nào trong danh mục này</p>
        <Button asChild>
          <Link href="/products">Tiếp tục mua sắm</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const statusInfo = getStatusInfo(order.status)
        const StatusIcon = statusInfo.icon

        return (
          <Card key={order.id} className="border-animation">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Đơn hàng #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Đặt ngày: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                  {order.estimatedDelivery && (
                    <p className="text-sm text-muted-foreground">
                      Dự kiến giao: {new Date(order.estimatedDelivery).toLocaleDateString("vi-VN")}
                    </p>
                  )}
                </div>
                <Badge className={`${statusInfo.color} text-white`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusInfo.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">Số lượng: {item.quantity}</span>
                        <span className="font-medium">{item.price.toLocaleString()}đ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="text-lg font-bold text-primary">{order.totalPrice.toLocaleString()}đ</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Xem chi tiết
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Đánh giá
                  </Button>
                )}
                {order.status === "confirmed" && (
                  <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                    Hủy đơn
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button size="sm" className="diagonal-hover">
                    Mua lại
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
