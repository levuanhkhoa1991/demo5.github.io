"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Minus, X, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold font-heading mb-4">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!
            </p>
            <Button asChild className="diagonal-hover">
              <Link href="/products">
                Tiếp tục mua sắm
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
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
          <Link
            href="/products"
            className="inline-flex items-center text-muted-foreground hover:text-foreground hover-underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tiếp tục mua sắm
          </Link>
          <h1 className="text-3xl font-bold font-heading">Giỏ hàng ({totalItems} sản phẩm)</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.variant}`} className="border-animation">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold font-heading">{item.name}</h3>
                          {item.variant && <p className="text-sm text-muted-foreground">{item.variant}</p>}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(`${item.id}-${item.variant}`)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(`${item.id}-${item.variant}`, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(`${item.id}-${item.variant}`, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            {(item.price * item.quantity).toLocaleString()}đ
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {(item.originalPrice * item.quantity).toLocaleString()}đ
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart} className="bg-transparent">
                Xóa tất cả
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/products">Tiếp tục mua sắm</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính ({totalItems} sản phẩm):</span>
                  <span>{totalPrice.toLocaleString()}đ</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">{totalPrice.toLocaleString()}đ</span>
                  </div>
                </div>

                <Button className="w-full diagonal-hover" asChild>
                  <Link href="/checkout">
                    Tiến hành thanh toán
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Coupon */}
            <Card>
              <CardHeader>
                <CardTitle>Mã giảm giá</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Nhập mã giảm giá" />
                  <Button variant="outline" className="bg-transparent">
                    Áp dụng
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Nhập mã giảm giá để được ưu đãi thêm</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
