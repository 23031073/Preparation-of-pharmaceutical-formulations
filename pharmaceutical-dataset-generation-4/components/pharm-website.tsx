"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Pill, FlaskConical, Beaker, Search, Sparkles, BookOpen, Activity, Menu, Droplets, Eye } from "lucide-react"
import { formulationsData } from "@/lib/formulations-data"
import { extendedFormulationsData } from "@/lib/extended-formulations"
import { detailedFormulations } from "@/lib/ointments-syrups-data"
import { PreparationModal } from "@/components/preparation-modal"

function TabletsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="7" cy="7" r="5" />
      <circle cx="17" cy="17" r="5" />
      <path d="M12 12L3.5 3.5M12 12l8.5 8.5" />
    </svg>
  )
}

function CapsuleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.5 3.5a7 7 0 0 1 9.9 9.9l-6.4 6.4a7 7 0 0 1-9.9-9.9l6.4-6.4z" />
      <path d="M14 10L8 16" />
    </svg>
  )
}

function EarIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
      <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
    </svg>
  )
}

// Merge all formulation data
const allFormulationsData: { id: string; name: string; formulations: any[] }[] = [
  ...formulationsData,
  ...extendedFormulationsData,
  ...detailedFormulations,
]

const totalFormulations = allFormulationsData.reduce((acc, cat) => acc + cat.formulations.length, 0)
const totalCategories = allFormulationsData.length

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  creams: <FlaskConical className="h-6 w-6 sm:h-8 sm:w-8" />,
  solutions: <Beaker className="h-6 w-6 sm:h-8 sm:w-8" />,
  drops: <Droplets className="h-6 w-6 sm:h-8 sm:w-8" />,
  powders: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
  vitamins: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
  antibiotics: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
  painkillers: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
  cardiac: <Activity className="h-6 w-6 sm:h-8 sm:w-8" />,
  tablets: <TabletsIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
  capsules: <CapsuleIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
  injections: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
  suppositories: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
  syrups: <Beaker className="h-6 w-6 sm:h-8 sm:w-8" />,
  ointments: <FlaskConical className="h-6 w-6 sm:h-8 sm:w-8" />,
  nasal: <Droplets className="h-6 w-6 sm:h-8 sm:w-8" />,
  ear: <EarIcon className="h-6 w-6 sm:h-8 sm:w-8" />,
  dental: <Pill className="h-6 w-6 sm:h-8 sm:w-8" />,
}

function FloatingPillsCSS() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-[10%] right-[8%] opacity-30 hidden md:block"
        style={{ animation: "float 8s ease-in-out infinite" }}
      >
        <div className="w-24 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-violet-500 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 w-1/2 bg-white/10" />
        </div>
      </div>
      <div
        className="absolute top-[25%] left-[12%] opacity-25 hidden sm:block"
        style={{ animation: "float 6s ease-in-out infinite 1s" }}
      >
        <div className="w-16 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 w-1/2 bg-white/10" />
        </div>
      </div>
      <div
        className="absolute bottom-[15%] right-[15%] opacity-20 hidden lg:block"
        style={{ animation: "float 7s ease-in-out infinite 2s" }}
      >
        <div className="w-20 h-9 rounded-full bg-gradient-to-r from-violet-400 to-pink-400 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 w-1/2 bg-white/10" />
        </div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  )
}

function Header({
  searchQuery,
  setSearchQuery,
  onCategorySelect,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onCategorySelect: (category: string | null) => void
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => onCategorySelect(null)}>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center shadow-lg">
              <Pill className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-violet-400 text-transparent bg-clip-text">
                PharmFormula
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                موسوعة التركيبات الصيدلانية
              </p>
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث عن تركيبة صيدلانية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-secondary/50 border-border rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
                dir="rtl"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full text-xs sm:text-sm">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-400" />
              <span className="text-muted-foreground">
                <span className="text-emerald-400 font-bold">{totalFormulations}</span> تركيبة
              </span>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm p-0" dir="rtl">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center">
                      <Pill className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-foreground">PharmFormula</h2>
                      <p className="text-xs text-muted-foreground">{totalFormulations} تركيبة متاحة</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="ابحث..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 bg-secondary/50 text-sm"
                      dir="rtl"
                    />
                  </div>
                </div>
                <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                  <h3 className="text-sm font-bold text-muted-foreground mb-3">الفئات</h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        onCategorySelect(null)
                        setMobileMenuOpen(false)
                      }}
                    >
                      <BookOpen className="h-4 w-4 ml-2" />
                      جميع التركيبات
                    </Button>
                    {allFormulationsData.map((category) => (
                      <Button
                        key={category.id}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => {
                          onCategorySelect(category.id)
                          setMobileMenuOpen(false)
                        }}
                      >
                        <span className="ml-2">{categoryIcons[category.id] || <Pill className="h-4 w-4" />}</span>
                        {category.name}
                        <Badge variant="secondary" className="mr-auto text-xs">
                          {category.formulations.length}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="ابحث عن تركيبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 bg-secondary/50 border-border rounded-xl text-sm"
              dir="rtl"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function HeroSection({ onCategorySelect }: { onCategorySelect: (category: string | null) => void }) {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      <FloatingPillsCSS />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-violet-500/10" />
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge
            variant="outline"
            className="mb-4 sm:mb-6 border-emerald-500/50 text-emerald-400 px-3 sm:px-4 py-1 sm:py-1.5 bg-background/50 backdrop-blur-sm text-xs sm:text-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
            أكثر من {totalFormulations} تركيبة صيدلانية احترافية
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
              موسوعة التركيبات
            </span>
            <br />
            <span className="text-foreground">الصيدلانية الشاملة</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            مرجعك الأول للتركيبات الدوائية مع طرق التحضير المفصلة والإرشادات الاحترافية
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => onCategorySelect(null)}
              className="bg-gradient-to-r from-emerald-500 to-violet-500 hover:from-emerald-600 hover:to-violet-600 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              استعرض التركيبات
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-xl sm:rounded-2xl bg-transparent"
            >
              <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              {totalCategories} فئة متاحة
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoriesSection({ onCategorySelect }: { onCategorySelect: (category: string) => void }) {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <Badge
            variant="outline"
            className="mb-3 sm:mb-4 border-emerald-500/50 text-emerald-400 px-3 sm:px-4 py-1 sm:py-1.5 bg-background/50 backdrop-blur-sm text-xs sm:text-sm"
          >
            <Pill className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
            الفئات الصيدلانية
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-500">
              {totalCategories} فئة
            </span>{" "}
            من التركيبات
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          {allFormulationsData.map((category, index) => (
            <Card
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="bg-card/50 backdrop-blur-md border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group hover:border-emerald-500/50"
            >
              <CardContent className="p-3 sm:p-4 md:p-6 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-emerald-400 group-hover:from-emerald-500 group-hover:to-violet-500 group-hover:text-white transition-all duration-300 mb-2 sm:mb-3 md:mb-4">
                  {categoryIcons[category.id] || <Pill className="h-6 w-6 sm:h-8 sm:w-8" />}
                </div>
                <h3 className="font-bold text-foreground text-xs sm:text-sm md:text-base mb-1 sm:mb-2 line-clamp-2">
                  {category.name}
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5"
                >
                  {category.formulations.length} تركيبة
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

interface Formulation {
  name: string
  form: string
  description: string
  activeIngredients: string[]
  preparationSteps: string[]
  instructions: string
  warnings: string
  shelfLife: string
  categoryName?: string
}

function FormulationCard({ formulation, index }: { formulation: Formulation; index: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getFormIcon = (form: string) => {
    if (form.includes("أقراص") || form.includes("حبوب")) return <TabletsIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    if (form.includes("كبسول")) return <CapsuleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    if (form.includes("شراب") || form.includes("محلول") || form.includes("معلق"))
      return <Beaker className="h-5 w-5 sm:h-6 sm:w-6" />
    if (form.includes("كريم") || form.includes("مرهم") || form.includes("جل"))
      return <FlaskConical className="h-5 w-5 sm:h-6 sm:w-6" />
    if (form.includes("قطر")) return <Droplets className="h-5 w-5 sm:h-6 sm:w-6" />
    if (form.includes("حقن") || form.includes("تحاميل")) return <Pill className="h-5 w-5 sm:h-6 sm:w-6" />
    if (form.includes("بخاخ")) return <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
    return <Pill className="h-5 w-5 sm:h-6 sm:w-6" />
  }

  const preparationSteps =
    formulation.preparationSteps && Array.isArray(formulation.preparationSteps) ? formulation.preparationSteps : []
  const hasSteps = preparationSteps.length > 0

  return (
    <>
      <Card
        onClick={() => setIsModalOpen(true)}
        className="bg-card/50 backdrop-blur-md border-border cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group h-full hover:border-emerald-500/50 hover:scale-[1.02]"
      >
        <CardHeader className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/30 to-violet-500/30 flex items-center justify-center text-emerald-400 group-hover:from-emerald-500 group-hover:to-violet-500 group-hover:text-white transition-all duration-300 shadow-lg">
                {getFormIcon(formulation.form)}
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-sm sm:text-base md:text-lg text-foreground leading-tight truncate">
                  {formulation.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
                  {formulation.form}
                </CardDescription>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 transition-colors flex-shrink-0">
              <Eye className="h-4 w-4 text-emerald-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2 sm:mb-3 md:mb-4">
            {formulation.description}
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
            {formulation.activeIngredients.slice(0, 2).map((ing, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-[10px] sm:text-xs bg-secondary/80 px-1.5 sm:px-2 py-0.5"
              >
                {ing.length > 20 ? ing.substring(0, 20) + "..." : ing}
              </Badge>
            ))}
            {formulation.activeIngredients.length > 2 && (
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs border-emerald-500/50 text-emerald-400 px-1.5 sm:px-2 py-0.5"
              >
                +{formulation.activeIngredients.length - 2}
              </Badge>
            )}
          </div>
          <div className="mt-2 sm:mt-3 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-emerald-400">
            <Beaker className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{hasSteps ? `${preparationSteps.length} خطوات تحضير` : "عرض التفاصيل"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Modal from separate component for preparation steps */}
      <PreparationModal formulation={formulation} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

function FormulationsGrid({ searchQuery, selectedCategory }: { searchQuery: string; selectedCategory: string | null }) {
  const filteredFormulations = allFormulationsData
    .filter((category) => !selectedCategory || category.id === selectedCategory)
    .flatMap((category) =>
      category.formulations.map((formulation) => ({
        ...formulation,
        categoryName: category.name,
        preparationSteps: Array.isArray(formulation.preparationSteps) ? formulation.preparationSteps : [],
      })),
    )
    .filter(
      (formulation) =>
        !searchQuery ||
        formulation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formulation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formulation.activeIngredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())),
    )

  return (
    <section className="py-10 sm:py-16 md:py-20 relative">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <Badge
            variant="outline"
            className="mb-3 sm:mb-4 border-emerald-500/50 text-emerald-400 px-3 sm:px-4 py-1 sm:py-1.5 bg-background/50 backdrop-blur-sm text-xs sm:text-sm"
          >
            <FlaskConical className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
            {selectedCategory ? allFormulationsData.find((c) => c.id === selectedCategory)?.name : "جميع التركيبات"}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-500">
            {filteredFormulations.length} تركيبة متاحة
          </h2>
        </div>

        {filteredFormulations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredFormulations.map((formulation, index) => (
              <FormulationCard key={`${formulation.name}-${index}`} formulation={formulation} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-secondary/50 flex items-center justify-center mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
            <p className="text-sm sm:text-base text-muted-foreground">جرب البحث بكلمات مختلفة</p>
          </div>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-violet-500 flex items-center justify-center">
              <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="font-bold text-foreground text-sm sm:text-base">PharmFormula</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            موسوعة التركيبات الصيدلانية - مرجعك الشامل للتركيبات الدوائية
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>{totalFormulations} تركيبة</span>
            <span>•</span>
            <span>{totalCategories} فئة</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PharmWebsite() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
    if (category) {
      setTimeout(() => {
        document.getElementById("formulations-section")?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onCategorySelect={handleCategorySelect} />
      <main>
        {!selectedCategory && !searchQuery && (
          <>
            <HeroSection onCategorySelect={handleCategorySelect} />
            <CategoriesSection onCategorySelect={handleCategorySelect} />
          </>
        )}
        <div id="formulations-section">
          <FormulationsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
