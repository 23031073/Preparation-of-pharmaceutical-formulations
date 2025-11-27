"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Download,
  Database,
  FileJson,
  Pill,
  FlaskConical,
  Loader2,
  Sparkles,
  Beaker,
  ClipboardList,
} from "lucide-react"
import { generatePharmData, type PharmDataset } from "@/lib/pharm-data"

export function PharmDataGenerator() {
  const [commercialCount, setCommercialCount] = useState(1200)
  const [formulationCount, setFormulationCount] = useState(800)
  const [isGenerating, setIsGenerating] = useState(false)
  const [dataset, setDataset] = useState<PharmDataset | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const data = generatePharmData(commercialCount, formulationCount)
    setDataset(data)
    setIsGenerating(false)
  }

  const downloadJSON = () => {
    if (!dataset) return
    const blob = new Blob([JSON.stringify(dataset, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pharm_dataset.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadSQL = () => {
    if (!dataset) return
    const sql = generateSQL(dataset)
    const blob = new Blob([sql], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pharm_dataset.sql"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <Badge variant="outline" className="mb-4 border-primary/50 text-primary">
          أداة توليد البيانات
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">مولد البيانات الصيدلانية</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          أنشئ مجموعات بيانات صيدلانية واقعية تحتوي على أدوية تجارية وتركيبات صيدلانية مع طرق التحضير
        </p>
      </header>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Settings Panel */}
        <Card className="lg:col-span-1 bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-5 w-5 text-primary" />
              إعدادات التوليد
            </CardTitle>
            <CardDescription>حدد عدد السجلات المطلوبة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="commercial" className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-primary" />
                الأدوية التجارية
              </Label>
              <Input
                id="commercial"
                type="number"
                value={commercialCount}
                onChange={(e) => setCommercialCount(Number(e.target.value))}
                min={100}
                max={5000}
                className="bg-secondary border-border"
              />
              <p className="text-xs text-muted-foreground">الحد الأقصى: 5000 سجل</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="formulation" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-primary" />
                التركيبات الصيدلانية
              </Label>
              <Input
                id="formulation"
                type="number"
                value={formulationCount}
                onChange={(e) => setFormulationCount(Number(e.target.value))}
                min={100}
                max={5000}
                className="bg-secondary border-border"
              />
              <p className="text-xs text-muted-foreground">الحد الأقصى: 5000 سجل</p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">إجمالي السجلات</span>
                <span className="text-foreground font-semibold">
                  {(commercialCount + formulationCount).toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جارٍ التوليد...
                </>
              ) : (
                <>
                  <Database className="ml-2 h-4 w-4" />
                  توليد البيانات
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">نتائج التوليد</CardTitle>
            <CardDescription>
              {dataset
                ? `تم توليد ${dataset.products.length + dataset.formulations.length} سجل بنجاح`
                : "اضغط على زر التوليد لإنشاء البيانات"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dataset ? (
              <Tabs defaultValue="products" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-secondary">
                  <TabsTrigger value="products">الأدوية</TabsTrigger>
                  <TabsTrigger value="formulations">التركيبات</TabsTrigger>
                  <TabsTrigger value="stats">إحصائيات</TabsTrigger>
                  <TabsTrigger value="download">تحميل</TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="mt-4">
                  <ScrollArea className="h-96 rounded-lg border border-border">
                    <div className="p-4 space-y-4">
                      {dataset.products.slice(0, 10).map((product) => (
                        <Card key={product.id} className="bg-secondary/50 border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{product.trade_name}</h3>
                              <Badge variant="outline" className="text-primary border-primary/50">
                                {product.category}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <p>
                                <span className="text-foreground">الاسم العلمي:</span> {product.scientific_name}
                              </p>
                              <p>
                                <span className="text-foreground">الشركة:</span> {product.manufacturer}
                              </p>
                              <p>
                                <span className="text-foreground">الشكل:</span> {product.dosage_form}
                              </p>
                              <p>
                                <span className="text-foreground">التركيز:</span> {product.strength}
                              </p>
                              <p>
                                <span className="text-foreground">السعر:</span> {product.price} ر.س
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <p className="text-center text-muted-foreground text-sm py-2">
                        عرض 10 من {dataset.products.length} دواء
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="formulations" className="mt-4">
                  <ScrollArea className="h-96 rounded-lg border border-border">
                    <div className="p-4 space-y-4">
                      {dataset.formulations.slice(0, 5).map((formulation) => (
                        <Card key={formulation.id} className="bg-secondary/50 border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-foreground flex items-center gap-2">
                                <Beaker className="h-4 w-4 text-primary" />
                                {formulation.name}
                              </h3>
                              <Badge variant="secondary">{formulation.form}</Badge>
                            </div>
                            <div className="space-y-3 text-sm">
                              <p className="text-muted-foreground">
                                <span className="text-foreground font-medium">المكونات الفعالة:</span>{" "}
                                {formulation.active_ingredients}
                              </p>
                              <p className="text-muted-foreground">
                                <span className="text-foreground font-medium">التعليمات:</span>{" "}
                                {formulation.instructions}
                              </p>
                              <p className="text-muted-foreground">
                                <span className="text-foreground font-medium">مدة الصلاحية:</span>{" "}
                                {formulation.shelf_life}
                              </p>
                              <div className="mt-4 p-3 bg-background rounded-lg border border-border">
                                <h4 className="font-medium text-foreground flex items-center gap-2 mb-2">
                                  <ClipboardList className="h-4 w-4 text-primary" />
                                  طريقة التحضير:
                                </h4>
                                <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans leading-relaxed">
                                  {formulation.preparation_method}
                                </pre>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <p className="text-center text-muted-foreground text-sm py-2">
                        عرض 5 من {dataset.formulations.length} تركيبة
                      </p>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="stats" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard
                      icon={<Pill className="h-5 w-5" />}
                      label="أدوية تجارية"
                      value={dataset.products.length}
                    />
                    <StatCard
                      icon={<FlaskConical className="h-5 w-5" />}
                      label="تركيبات صيدلانية"
                      value={dataset.formulations.length}
                    />
                    <StatCard
                      icon={<Database className="h-5 w-5" />}
                      label="إجمالي السجلات"
                      value={dataset.products.length + dataset.formulations.length}
                    />
                    <StatCard
                      icon={<FileJson className="h-5 w-5" />}
                      label="حجم JSON التقريبي"
                      value={`${Math.round(JSON.stringify(dataset).length / 1024)} KB`}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="download" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={downloadJSON}
                      className="h-24 flex-col gap-2 border-border hover:bg-secondary bg-transparent"
                    >
                      <FileJson className="h-8 w-8 text-primary" />
                      <span>تحميل JSON</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={downloadSQL}
                      className="h-24 flex-col gap-2 border-border hover:bg-secondary bg-transparent"
                    >
                      <Database className="h-8 w-8 text-primary" />
                      <span>تحميل SQL</span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Database className="h-16 w-16 mb-4 opacity-50" />
                <p>لم يتم توليد أي بيانات بعد</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <section className="grid md:grid-cols-4 gap-6 mt-12">
        <FeatureCard
          icon={<Pill className="h-6 w-6" />}
          title="أدوية تجارية"
          description="بيانات شاملة تتضمن الاسم التجاري والعلمي والجرعة والسعر"
        />
        <FeatureCard
          icon={<FlaskConical className="h-6 w-6" />}
          title="تركيبات صيدلانية"
          description="معلومات التركيبات مع المكونات الفعالة والتعليمات"
        />
        <FeatureCard
          icon={<Beaker className="h-6 w-6" />}
          title="طرق التحضير"
          description="خطوات تفصيلية لتحضير المستحضرات الصيدلانية"
        />
        <FeatureCard
          icon={<Download className="h-6 w-6" />}
          title="تصدير متعدد"
          description="تحميل البيانات بصيغة JSON أو SQL جاهزة للاستخدام"
        />
      </section>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-secondary p-4">
      <div className="flex items-center gap-2 text-primary mb-2">{icon}</div>
      <p className="text-2xl font-bold text-foreground">{typeof value === "number" ? value.toLocaleString() : value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="rounded-lg bg-primary/10 w-12 h-12 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

function generateSQL(dataset: PharmDataset): string {
  let sql = `-- Pharmaceutical Dataset SQL Export
-- Generated on ${new Date().toISOString()}

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  trade_name VARCHAR(255),
  scientific_name VARCHAR(255),
  manufacturer VARCHAR(255),
  dosage_form VARCHAR(100),
  strength VARCHAR(100),
  price DECIMAL(10,2),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS formulations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  active_ingredients TEXT,
  form VARCHAR(100),
  instructions TEXT,
  shelf_life VARCHAR(50),
  preparation_method TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`
  dataset.products.forEach((p) => {
    sql += `INSERT INTO products (trade_name, scientific_name, manufacturer, dosage_form, strength, price, category) VALUES ('${p.trade_name.replace(/'/g, "''")}', '${p.scientific_name.replace(/'/g, "''")}', '${p.manufacturer.replace(/'/g, "''")}', '${p.dosage_form.replace(/'/g, "''")}', '${p.strength.replace(/'/g, "''")}', ${p.price}, '${p.category.replace(/'/g, "''")}');\n`
  })

  sql += "\n"

  dataset.formulations.forEach((f) => {
    sql += `INSERT INTO formulations (name, active_ingredients, form, instructions, shelf_life, preparation_method) VALUES ('${f.name.replace(/'/g, "''")}', '${f.active_ingredients.replace(/'/g, "''")}', '${f.form.replace(/'/g, "''")}', '${f.instructions.replace(/'/g, "''")}', '${f.shelf_life.replace(/'/g, "''")}', '${f.preparation_method.replace(/'/g, "''").replace(/\n/g, "\\n")}');\n`
  })

  return sql
}
