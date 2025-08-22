"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "vi" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.faq": "FAQ",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.cart": "Cart",
    "nav.profile": "Profile",
    "nav.logout": "Logout",

    // Homepage
    "home.hero.title": "Discover the Heart of Shopping",
    "home.hero.subtitle": "Quality Products at Your Fingertips - Premium E-commerce Experience",
    "home.hero.cta": "Shop Now",
    "home.featured.title": "Featured Products",
    "home.categories.title": "Shop by Category",
    "home.testimonials.title": "What Our Customers Say",

    // Products
    "products.title": "Our Products",
    "products.filter": "Filter",
    "products.sort": "Sort by",
    "products.addToCart": "Add to Cart",
    "products.viewDetails": "View Details",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.remove": "Remove",
    "cart.quantity": "Quantity",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.search": "Search",
    "common.backToTop": "Back to Top",
  },
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.products": "Sản phẩm",
    "nav.about": "Giới thiệu",
    "nav.contact": "Liên hệ",
    "nav.blog": "Blog",
    "nav.faq": "Câu hỏi",
    "nav.login": "Đăng nhập",
    "nav.register": "Đăng ký",
    "nav.cart": "Giỏ hàng",
    "nav.profile": "Hồ sơ",
    "nav.logout": "Đăng xuất",

    // Homepage
    "home.hero.title": "Khám phá trái tim mua sắm",
    "home.hero.subtitle": "Sản phẩm chất lượng trong tầm tay - Trải nghiệm thương mại điện tử cao cấp",
    "home.hero.cta": "Mua ngay",
    "home.featured.title": "Sản phẩm nổi bật",
    "home.categories.title": "Mua theo danh mục",
    "home.testimonials.title": "Khách hàng nói gì về chúng tôi",

    // Products
    "products.title": "Sản phẩm của chúng tôi",
    "products.filter": "Lọc",
    "products.sort": "Sắp xếp theo",
    "products.addToCart": "Thêm vào giỏ",
    "products.viewDetails": "Xem chi tiết",

    // Cart
    "cart.title": "Giỏ hàng",
    "cart.empty": "Giỏ hàng trống",
    "cart.total": "Tổng cộng",
    "cart.checkout": "Thanh toán",
    "cart.remove": "Xóa",
    "cart.quantity": "Số lượng",

    // Common
    "common.loading": "Đang tải...",
    "common.error": "Có lỗi xảy ra",
    "common.success": "Thành công",
    "common.cancel": "Hủy",
    "common.save": "Lưu",
    "common.edit": "Sửa",
    "common.delete": "Xóa",
    "common.search": "Tìm kiếm",
    "common.backToTop": "Về đầu trang",
  },
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.products": "商品",
    "nav.about": "会社概要",
    "nav.contact": "お問い合わせ",
    "nav.blog": "ブログ",
    "nav.faq": "よくある質問",
    "nav.login": "ログイン",
    "nav.register": "登録",
    "nav.cart": "カート",
    "nav.profile": "プロフィール",
    "nav.logout": "ログアウト",

    // Homepage
    "home.hero.title": "ショッピングの心を発見",
    "home.hero.subtitle": "指先で品質の商品 - プレミアムEコマース体験",
    "home.hero.cta": "今すぐ購入",
    "home.featured.title": "注目商品",
    "home.categories.title": "カテゴリー別ショッピング",
    "home.testimonials.title": "お客様の声",

    // Products
    "products.title": "私たちの商品",
    "products.filter": "フィルター",
    "products.sort": "並び替え",
    "products.addToCart": "カートに追加",
    "products.viewDetails": "詳細を見る",

    // Cart
    "cart.title": "ショッピングカート",
    "cart.empty": "カートは空です",
    "cart.total": "合計",
    "cart.checkout": "チェックアウト",
    "cart.remove": "削除",
    "cart.quantity": "数量",

    // Common
    "common.loading": "読み込み中...",
    "common.error": "エラーが発生しました",
    "common.success": "成功",
    "common.cancel": "キャンセル",
    "common.save": "保存",
    "common.edit": "編集",
    "common.delete": "削除",
    "common.search": "検索",
    "common.backToTop": "トップに戻る",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "vi", "ja"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
