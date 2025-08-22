"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, MapPin, CreditCard, Truck, Shield } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

interface ShippingInfo {
  fullName: string
  phone: string
  email: string
  address: string
  ward: string
  district: string
  city: string
  note: string
}

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("cod")
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  })

  const paymentMethods: PaymentMethod[] = [
    {
      id: "cod",
      name: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán bằng tiền mặt khi nhận hàng",
      icon: <Truck className="w-5 h-5" />,
    },
    {
      id: "card",
      name: "Thẻ tín dụng/ghi nợ",
      description: "Visa, Mastercard, JCB",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "bank",
      name: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản qua Internet Banking",
      icon: <Shield className="w-5 h-5" />,
    },
  ]

  const shippingFee = totalPrice >= 500000 ? 0 : 30000
  const finalTotal = totalPrice + shippingFee

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      const requiredFields = ["fullName", "phone", "address", "ward", "district", "city"]
      const missingFields = requiredFields.filter((field) => !shippingInfo[field as keyof ShippingInfo])

      if (missingFields.length > 0) {
        alert("Vui lòng điền đầy đủ thông tin giao hàng")
        setLoading(false)
        return
      }

      // Create order
      const orderData = {
        items,
        shippingInfo,
        paymentMethod: selectedPayment,
        totalPrice,
        shippingFee,
        finalTotal,
      }

      if (selectedPayment === "cod") {
        // COD - redirect to success page
        const response = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })

        if (response.ok) {
          const order = await response.json()
          clearCart()
          router.push(`/order-success?orderId=${order.id}`)
        } else {
          throw new Error("Tạo đơn hàng thất bại")
        }
      } else {
        // Card/Bank payment - redirect to payment page
        localStorage.setItem("checkout_data", JSON.stringify(orderData))
        router.push(`/payment?method=${selectedPayment}`)
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Có lỗi xảy ra. Vui lòng thử lại!")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold font-heading mb-4">Giỏ hàng trống</h1>
            <p className="text-muted-foreground mb-6">Bạn cần có sản phẩm trong giỏ hàng để thanh toán</p>
            <Button asChild>
              <Link href="/products">Tiếp tục mua sắm</Link>
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
            href="/cart"
            className="inline-flex items-center text-muted-foreground hover:text-foreground hover-underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại giỏ hàng
          </Link>
          <h1 className="text-3xl font-bold font-heading">Thanh toán</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-animation">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Thông tin giao hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Nhập email (tùy chọn)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Số nhà, tên đường"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ward">Phường/Xã *</Label>
                      <Select value={shippingInfo.ward} onValueChange={(value) => handleInputChange("ward", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phường/xã" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phuong-1">Phường 1</SelectItem>
                          <SelectItem value="phuong-2">Phường 2</SelectItem>
                          <SelectItem value="phuong-3">Phường 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">Quận/Huyện *</Label>
                      <Select
                        value={shippingInfo.district}
                        onValueChange={(value) => handleInputChange("district", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quận/huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quan-1">Quận 1</SelectItem>
                          <SelectItem value="quan-2">Quận 2</SelectItem>
                          <SelectItem value="quan-3">Quận 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                      <Select value={shippingInfo.city} onValueChange={(value) => handleInputChange("city", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn tỉnh/thành" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hcm">TP. Hồ Chí Minh</SelectItem>
                          <SelectItem value="hanoi">Hà Nội</SelectItem>
                          <SelectItem value="danang">Đà Nẵng</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Textarea
                      id="note"
                      value={shippingInfo.note}
                      onChange={(e) => handleInputChange("note", e.target.value)}
                      placeholder="Ghi chú cho đơn hàng (tùy chọn)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border-animation">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment} className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border border-border rounded-lg">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center gap-3 flex-1">
                          {method.icon}
                          <div>
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">
                              {method.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant}`} className="flex gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                          {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                            <span className="text-sm font-medium">
                              {(item.price * item.quantity).toLocaleString()}đ
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{totalPrice.toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span className={shippingFee === 0 ? "text-green-600" : ""}>
                        {shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString()}đ`}
                      </span>
                    </div>
                    {shippingFee === 0 && (
                      <p className="text-xs text-green-600">Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
                    )}
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Tổng cộng:</span>
                      <span className="text-primary">{finalTotal.toLocaleString()}đ</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full diagonal-hover" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Bằng việc đặt hàng, bạn đồng ý với{" "}
                    <Link href="/terms" className="text-primary hover-underline">
                      Điều khoản sử dụng
                    </Link>{" "}
                    của chúng tôi
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
