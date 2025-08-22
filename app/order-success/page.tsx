"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, ArrowRight, Home } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface OrderInfo {
  id: string
  paymentId?: string
  status: string
  createdAt: string
  estimatedDelivery: string
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)

  useEffect(() => {
    const orderId = searchParams.get("orderId")
    const paymentId = searchParams.get("paymentId")

    if (orderId) {
      // Mock order info
      setOrderInfo({
        id: orderId,
        paymentId: paymentId || undefined,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      })
    }
  }, [searchParams])

  if (!orderInfo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Đang tải thông tin đơn hàng...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold font-heading text-green-600">Đặt hàng thành công!</h1>
            <p className="text-muted-foreground text-lg">
              Cảm ơn bạn đã mua sắm tại VietShop. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
            </p>
          </div>

          {/* Order Details */}
          <Card className="border-animation">
            <CardHeader>
              <CardTitle>Thông tin đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
                  <p className="font-semibold">#{orderInfo.id}</p>
                </div>
                {orderInfo.paymentId && (
                  <div>
                    <p className="text-sm text-muted-foreground">Mã thanh toán</p>
                    <p className="font-semibold">#{orderInfo.paymentId}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Trạng thái</p>
                  <p className="font-semibold text-green-600">Đã xác nhận</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày đặt hàng</p>
                  <p className="font-semibold">{new Date(orderInfo.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Dự kiến giao hàng</p>
                  <p className="font-semibold text-primary">
                    {new Date(orderInfo.estimatedDelivery).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Các bước tiếp theo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Chuẩn bị hàng</h3>
                    <p className="text-sm text-muted-foreground">
                      Chúng tôi sẽ chuẩn bị và đóng gói sản phẩm của bạn trong vòng 24 giờ
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Vận chuyển</h3>
                    <p className="text-sm text-muted-foreground">
                      Đơn hàng sẽ được giao đến địa chỉ của bạn trong 2-3 ngày làm việc
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Nhận hàng</h3>
                    <p className="text-sm text-muted-foreground">Kiểm tra sản phẩm và xác nhận hoàn thành đơn hàng</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="diagonal-hover">
              <Link href="/orders">
                Xem đơn hàng của tôi
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Về trang chủ
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/products">Tiếp tục mua sắm</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Cần hỗ trợ?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nếu bạn có bất kỳ câu hỏi nào về đơn hàng, vui lòng liên hệ với chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/contact">Liên hệ hỗ trợ</Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="tel:1900-1234">Gọi hotline: 1900-1234</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
