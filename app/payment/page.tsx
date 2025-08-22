"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Shield, Lock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"

interface CardInfo {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
}

interface BankInfo {
  bankCode: string
  accountNumber: string
  accountName: string
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderData, setOrderData] = useState<any>(null)

  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  })

  const [bankInfo, setBankInfo] = useState<BankInfo>({
    bankCode: "",
    accountNumber: "",
    accountName: "",
  })

  useEffect(() => {
    const method = searchParams.get("method")
    const storedOrderData = localStorage.getItem("checkout_data")

    if (!method || !storedOrderData) {
      router.push("/checkout")
      return
    }

    setPaymentMethod(method)
    setOrderData(JSON.parse(storedOrderData))
  }, [searchParams, router])

  const banks = [
    { code: "VCB", name: "Vietcombank" },
    { code: "TCB", name: "Techcombank" },
    { code: "VTB", name: "Vietinbank" },
    { code: "BIDV", name: "BIDV" },
    { code: "ACB", name: "ACB" },
    { code: "MB", name: "MB Bank" },
  ]

  const handleCardInputChange = (field: keyof CardInfo, value: string) => {
    if (field === "cardNumber") {
      // Format card number with spaces
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (value.length > 19) return // Max 16 digits + 3 spaces
    }
    if (field === "cvv" && value.length > 3) return
    if ((field === "expiryMonth" || field === "expiryYear") && value.length > 2) return

    setCardInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleBankInputChange = (field: keyof BankInfo, value: string) => {
    setBankInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const paymentData: any = {
        ...orderData,
        paymentMethod,
      }

      if (paymentMethod === "card") {
        // Validate card info
        if (
          !cardInfo.cardNumber ||
          !cardInfo.expiryMonth ||
          !cardInfo.expiryYear ||
          !cardInfo.cvv ||
          !cardInfo.cardholderName
        ) {
          alert("Vui lòng điền đầy đủ thông tin thẻ")
          setLoading(false)
          return
        }

        paymentData.cardInfo = {
          ...cardInfo,
          cardNumber: cardInfo.cardNumber.replace(/\s/g, ""), // Remove spaces for processing
        }
      } else if (paymentMethod === "bank") {
        // Validate bank info
        if (!bankInfo.bankCode || !bankInfo.accountNumber || !bankInfo.accountName) {
          alert("Vui lòng điền đầy đủ thông tin chuyển khoản")
          setLoading(false)
          return
        }

        paymentData.bankInfo = bankInfo
      }

      // Process payment
      const response = await fetch("/api/payment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // Clear cart and redirect to success
        clearCart()
        localStorage.removeItem("checkout_data")
        router.push(`/order-success?orderId=${result.orderId}&paymentId=${result.paymentId}`)
      } else {
        throw new Error(result.message || "Thanh toán thất bại")
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Thanh toán thất bại. Vui lòng thử lại!")
    } finally {
      setLoading(false)
    }
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Đang tải...</div>
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
            href="/checkout"
            className="inline-flex items-center text-muted-foreground hover:text-foreground hover-underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại thanh toán
          </Link>
          <h1 className="text-3xl font-bold font-heading">
            {paymentMethod === "card" ? "Thanh toán bằng thẻ" : "Chuyển khoản ngân hàng"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="border-animation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {paymentMethod === "card" ? <CreditCard className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                  {paymentMethod === "card" ? "Thông tin thẻ" : "Thông tin chuyển khoản"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {paymentMethod === "card" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Số thẻ *</Label>
                        <Input
                          id="cardNumber"
                          value={cardInfo.cardNumber}
                          onChange={(e) => handleCardInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Tên chủ thẻ *</Label>
                        <Input
                          id="cardholderName"
                          value={cardInfo.cardholderName}
                          onChange={(e) => handleCardInputChange("cardholderName", e.target.value)}
                          placeholder="NGUYEN VAN A"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryMonth">Tháng *</Label>
                          <Select
                            value={cardInfo.expiryMonth}
                            onValueChange={(value) => handleCardInputChange("expiryMonth", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                  {String(i + 1).padStart(2, "0")}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expiryYear">Năm *</Label>
                          <Select
                            value={cardInfo.expiryYear}
                            onValueChange={(value) => handleCardInputChange("expiryYear", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="YY" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => (
                                <SelectItem key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                                  {String(new Date().getFullYear() + i).slice(-2)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            type="password"
                            value={cardInfo.cvv}
                            onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="bankCode">Ngân hàng *</Label>
                        <Select
                          value={bankInfo.bankCode}
                          onValueChange={(value) => handleBankInputChange("bankCode", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn ngân hàng" />
                          </SelectTrigger>
                          <SelectContent>
                            {banks.map((bank) => (
                              <SelectItem key={bank.code} value={bank.code}>
                                {bank.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Số tài khoản *</Label>
                        <Input
                          id="accountNumber"
                          value={bankInfo.accountNumber}
                          onChange={(e) => handleBankInputChange("accountNumber", e.target.value)}
                          placeholder="Nhập số tài khoản"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountName">Tên tài khoản *</Label>
                        <Input
                          id="accountName"
                          value={bankInfo.accountName}
                          onChange={(e) => handleBankInputChange("accountName", e.target.value)}
                          placeholder="NGUYEN VAN A"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Thông tin thanh toán của bạn được bảo mật bằng mã hóa SSL 256-bit
                    </p>
                  </div>

                  <Button type="submit" className="w-full diagonal-hover" disabled={loading}>
                    {loading ? "Đang xử lý..." : `Thanh toán ${orderData.finalTotal.toLocaleString()}đ`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderData.items.map((item: any) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                          <span className="text-sm font-medium">{(item.price * item.quantity).toLocaleString()}đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{orderData.totalPrice.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>
                      {orderData.shippingFee === 0 ? "Miễn phí" : `${orderData.shippingFee.toLocaleString()}đ`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary">{orderData.finalTotal.toLocaleString()}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
