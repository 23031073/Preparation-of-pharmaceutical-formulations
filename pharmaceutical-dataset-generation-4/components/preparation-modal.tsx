"use client"

import { useEffect, useState } from "react"
import {
  X,
  Beaker,
  TestTube,
  Info,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ChevronRight,
  Printer,
  Share2,
  Bookmark,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Formulation {
  name: string
  form: string
  description: string
  activeIngredients: string[]
  preparationSteps: string[]
  instructions: string
  warnings: string
  shelfLife: string
}

interface PreparationModalProps {
  formulation: Formulation
  isOpen: boolean
  onClose: () => void
}

export function PreparationModal({ formulation, isOpen, onClose }: PreparationModalProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  const preparationSteps =
    formulation.preparationSteps && Array.isArray(formulation.preparationSteps) ? formulation.preparationSteps : []

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      setVisibleSteps([])
      document.body.style.overflow = "hidden"

      // تأخير ظهور الخطوات واحدة تلو الأخرى
      preparationSteps.forEach((_, i) => {
        setTimeout(
          () => {
            setVisibleSteps((prev) => [...prev, i])
          },
          300 + i * 150,
        )
      })
    } else {
      document.body.style.overflow = "auto"
      setVisibleSteps([])
      setActiveStep(null)
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen, preparationSteps.length])

  if (!isOpen) return null

  const references = [
    "دستور الأدوية البريطاني (British Pharmacopoeia)",
    "دستور الأدوية الأمريكي (USP-NF)",
    "مرجع مارتنديل الصيدلاني",
    "الدليل الصيدلاني العربي الموحد",
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      {/* خلفية ضبابية */}
      <div
        className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-500 ${isAnimating ? "opacity-100" : "opacity-0"}`}
      />

      {/* المحتوى */}
      <div
        className={`relative w-full max-w-4xl max-h-[95vh] bg-card border-2 border-emerald-500 rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-500/20 overflow-hidden transition-all duration-500 ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* الخلفية المتحركة */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-violet-500 p-4 sm:p-6">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 pr-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Beaker className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">{formulation.name}</h2>
              <p className="text-white/80 text-sm sm:text-base mt-1">{formulation.form}</p>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex items-center gap-2 mt-4">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30 text-xs sm:text-sm"
            >
              <Printer className="h-4 w-4 ml-1" />
              طباعة
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30 text-xs sm:text-sm"
            >
              <Share2 className="h-4 w-4 ml-1" />
              مشاركة
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/20 text-white border-0 hover:bg-white/30 text-xs sm:text-sm"
            >
              <Bookmark className="h-4 w-4 ml-1" />
              حفظ
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative overflow-y-auto max-h-[calc(95vh-180px)] p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* الوصف */}
          <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Info className="h-4 w-4 text-emerald-500" />
              </div>
              الوصف والاستخدام
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{formulation.description}</p>
          </div>

          {/* المكونات الفعالة */}
          <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <TestTube className="h-4 w-4 text-violet-500" />
              </div>
              المكونات الفعالة
            </h3>
            <div className="flex flex-wrap gap-2">
              {formulation.activeIngredients.map((ing, i) => (
                <Badge
                  key={i}
                  className="bg-gradient-to-r from-emerald-500/20 to-violet-500/20 text-foreground border border-emerald-500/30 px-3 py-1.5 text-sm"
                >
                  <Sparkles className="h-3 w-3 ml-1 text-emerald-500" />
                  {ing}
                </Badge>
              ))}
            </div>
          </div>

          {/* خطوات التحضير */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-violet-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-emerald-500">
            <h3 className="font-bold text-foreground mb-4 sm:mb-6 flex items-center gap-3 text-lg sm:text-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center shadow-lg">
                <Beaker className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-violet-500">
                خطوات التحضير التفصيلية
              </span>
              <span className="bg-emerald-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full mr-auto">
                {preparationSteps.length} خطوات
              </span>
            </h3>

            {preparationSteps.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {preparationSteps.map((step, i) => (
                  <div
                    key={i}
                    className={`relative transition-all duration-500 ease-out ${
                      visibleSteps.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div
                      className={`flex gap-3 sm:gap-4 bg-card rounded-xl p-4 sm:p-5 border-2 transition-all duration-300 cursor-pointer ${
                        activeStep === i
                          ? "border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.02]"
                          : "border-border hover:border-emerald-500/50"
                      }`}
                    >
                      {/* رقم الخطوة */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                            activeStep === i
                              ? "bg-gradient-to-br from-emerald-500 to-violet-500 text-white scale-110"
                              : "bg-emerald-500/20 text-emerald-500"
                          }`}
                        >
                          {i + 1}
                        </div>
                      </div>

                      {/* محتوى الخطوة */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <ChevronRight
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-all duration-300 ${
                              activeStep === i ? "text-emerald-500 translate-x-1" : "text-muted-foreground"
                            }`}
                          />
                          <p
                            className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                              activeStep === i ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      </div>

                      {/* علامة التحقق */}
                      <div
                        className={`flex-shrink-0 transition-all duration-300 ${
                          activeStep === i ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        }`}
                      >
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      </div>
                    </div>

                    {/* خط الوصل */}
                    {i < preparationSteps.length - 1 && (
                      <div className="absolute right-[1.375rem] sm:right-[1.625rem] top-full w-0.5 h-3 sm:h-4 bg-gradient-to-b from-emerald-500/50 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Beaker className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>لا تتوفر خطوات تحضير لهذه التركيبة حالياً</p>
              </div>
            )}
          </div>

          {/* تعليمات الاستخدام */}
          <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              تعليمات الاستخدام
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{formulation.instructions}</p>
          </div>

          {/* التحذيرات */}
          <div className="bg-red-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-red-500/30">
            <h3 className="font-bold text-red-500 mb-2 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              تحذيرات هامة
            </h3>
            <p className="text-red-400 text-sm sm:text-base leading-relaxed">{formulation.warnings}</p>
          </div>

          {/* مدة الصلاحية */}
          <div className="bg-secondary/50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-border">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              مدة الصلاحية
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">{formulation.shelfLife}</p>
          </div>

          {/* المصادر والمراجع */}
          <div className="bg-gradient-to-br from-violet-500/10 to-emerald-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-violet-500/30">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-base sm:text-lg">
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-violet-500" />
              </div>
              المصادر والمراجع العلمية
            </h3>
            <ul className="space-y-2">
              {references.map((ref, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
                  <div className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0" />
                  {ref}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground/70 border-t border-border pt-3">
              * جميع التركيبات مبنية على معايير الصيدلة السريرية المعتمدة دولياً ويجب استشارة صيدلي متخصص قبل التحضير.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
