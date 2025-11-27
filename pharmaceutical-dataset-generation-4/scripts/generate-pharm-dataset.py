# Generating a dataset of 2000 pharmaceutical entries (commercial + compounding)
# The output will create:
# - pharm_dataset_2000.json (JSON array)
# - pharm_dataset_2000.sql (SQL INSERT statements for Postgres 'products' + 'formulations' tables)
# - pharm_dataset_2000.zip (zip of both files)
#
# Structure:
# Each product: id (uuid), name_ar, name_en, type, category, dosage_form, active_ingredient, strength, manufacturer, country, notes
# For 'compounding' entries, include 'formulation' with ingredients (list) and 'procedure'.

import os, json, uuid, random, textwrap, zipfile
from datetime import datetime

random.seed(42)

OUT_DIR = "output"
os.makedirs(OUT_DIR, exist_ok=True)

json_path = os.path.join(OUT_DIR, "pharm_dataset_2000.json")
sql_path = os.path.join(OUT_DIR, "pharm_dataset_2000.sql")
zip_path = os.path.join(OUT_DIR, "pharm_dataset_2000.zip")

categories = [
    "جلدية", "تنفسية", "هضمية", "أطفال", "مسكنات", "مضادات حيوية", "فيتامينات", "مستحضرات عينية",
    "أذنية", "نسائية", "قلبية", "أوردية", "غسيل فم", "مضادات احتقان", "مضادات فطريات"
]
dosage_forms = ["سيروب", "مرهم", "كريم", "كبسولة", "قرص", "محلول للحقن", "قطرة", "جل", "بخاخ", "معجون أسنان", "لبوس"]
manufacturers = ["شركة الأمل", "مجموعة الشفاء", "شركة الحياة", "مصنع النور", "شركة الطب العربي", "MediLab", "PharmaCo"]
countries = ["العراق", "مصر", "السعودية", "الأردن", "تركيا", "الهند", "الصين"]

def make_commercial(i):
    aid = str(uuid.uuid4())
    name_ar = f"دواء تجاري {i}"
    name_en = f"CommercialMed {i}"
    category = random.choice(categories)
    dosage = random.choice(dosage_forms)
    active = random.choice(["Paracetamol", "Amoxicillin", "Ibuprofen", "Cetirizine", "Omeprazole", "Metformin", "Atorvastatin", "Azithromycin"])
    strength = random.choice(["500 mg", "250 mg", "5 mg/mL", "100 mg", "20 mg", "50 mg", "10 mg/mL"])
    manufacturer = random.choice(manufacturers)
    country = random.choice(countries)
    notes = "معلومات مرجعية. يجب مراجعة التعليمات الرسمية للمنتج."
    return {
        "id": aid,
        "name_ar": name_ar,
        "name_en": name_en,
        "type": "commercial",
        "category": category,
        "dosage_form": dosage,
        "active_ingredient": active,
        "strength": strength,
        "manufacturer": manufacturer,
        "country": country,
        "notes": notes,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }

def make_compounding(i):
    aid = str(uuid.uuid4())
    name_ar = f"تركيبة تركيبية {i}"
    name_en = f"CompoundFormula {i}"
    category = random.choice(categories)
    dosage = random.choice(["سيروب","مرهم","كريم","محلول","كبسولة","جل","قطرة","لبوس"])
    possible_ing = [
        {"name":"Paracetamol","unit":"mg"},
        {"name":"Amoxicillin","unit":"mg"},
        {"name":"Glycerin","unit":"mL"},
        {"name":"Purified Water","unit":"mL"},
        {"name":"Hydrophilic Ointment Base","unit":"g"},
        {"name":"Cetirizine","unit":"mg"},
        {"name":"Xanthan Gum","unit":"g"},
        {"name":"Propylene Glycol","unit":"mL"},
        {"name":"Carbopol","unit":"g"},
        {"name":"Lidocaine","unit":"mg"},
        {"name":"Mupirocin","unit":"% w/w"},
        {"name":"Ketoconazole","unit":"% w/w"}
    ]
    ing_count = random.randint(2,5)
    ingredients = []
    for _ in range(ing_count):
        ing = random.choice(possible_ing)
        if ing["unit"]=="mg":
            amt = random.choice([50,100,250,500])
            amt_str = f"{amt} mg"
        elif ing["unit"]=="mL":
            amt = random.choice([1,5,10,20,50,100])
            amt_str = f"{amt} mL"
        elif "g" in ing["unit"]:
            amt = random.choice([0.5,1,5,10,25,50])
            amt_str = f"{amt} g"
        else:
            amt = random.choice([0.5,1,2,5])
            amt_str = f"{amt} {ing['unit']}"
        ingredients.append({"name":ing["name"], "amount":amt_str, "role": random.choice(["API","Base","Excipient","Preservative"])})
    
    procedure = textwrap.dedent(f"""\
    1. تعقيم الأدوات ومنطقة العمل.
    2. وزن وقياس المكونات: {', '.join([f"{x['name']} ({x['amount']})" for x in ingredients])}.
    3. إذابة المكونات الذائبة في الجزء المناسب من المذيب.
    4. إضافة المواد المساعدة مع التحريك حتى التجانس.
    5. تعديل pH إن لزم وتعبئة المنتج في الحاوية المناسبة.
    6. وسم المنتج بتاريخ التحضير والمرجع.
    """)
    notes = "هذه صيغة تركيبية نموذجية — يجب مراجعتها واعتمادها من صيدلي مرخّص."
    return {
        "id": aid,
        "name_ar": name_ar,
        "name_en": name_en,
        "type": "compounding",
        "category": category,
        "dosage_form": dosage,
        "formulation": {
            "ingredients": ingredients,
            "procedure": procedure
        },
        "manufacturer": None,
        "country": None,
        "notes": notes,
        "created_at": datetime.utcnow().isoformat() + "Z"
    }

# Create 2000 entries: 1200 commercial, 800 compounding
entries = []
N_commercial = 1200
N_compounding = 800

print("🔄 جاري توليد البيانات...")

for i in range(1, N_commercial+1):
    entries.append(make_commercial(i))
    if i % 200 == 0:
        print(f"  ✅ تم توليد {i} دواء تجاري")

for i in range(1, N_compounding+1):
    entries.append(make_compounding(i))
    if i % 200 == 0:
        print(f"  ✅ تم توليد {i} تركيبة صيدلانية")

# Shuffle to mix entries
random.shuffle(entries)
print(f"\n📊 إجمالي الإدخالات: {len(entries)}")

# Save JSON
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)
print(f"✅ تم حفظ ملف JSON: {json_path}")

# Create SQL insert statements
with open(sql_path, "w", encoding="utf-8") as f:
    f.write("-- SQL insert statements for products and formulations (Postgres)\n")
    f.write("-- Generated on: " + datetime.utcnow().isoformat() + "Z\n\n")
    
    # Create tables first
    f.write("""
-- Create tables if not exist
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_en TEXT,
    category TEXT,
    dosage_form TEXT,
    short_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS formulations (
    id UUID PRIMARY KEY,
    product_id UUID REFERENCES products(id),
    version INTEGER DEFAULT 1,
    ingredients JSONB,
    procedure TEXT,
    review_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

""")
    
    for e in entries:
        pid = e["id"]
        name_ar = e["name_ar"].replace("'", "''")
        name_en = (e.get("name_en") or "").replace("'", "''")
        category = (e.get("category") or "").replace("'", "''")
        dosage = (e.get("dosage_form") or "").replace("'", "''")
        short_desc = (e.get("notes") or "").replace("'", "''")
        created_at = e.get("created_at", datetime.utcnow().isoformat()+"Z")
        
        # product insert
        prod_sql = f"INSERT INTO products (id, name_ar, name_en, category, dosage_form, short_description, created_at) VALUES ('{pid}', '{name_ar}', '{name_en}', '{category}', '{dosage}', '{short_desc}', '{created_at}');\n"
        f.write(prod_sql)
        
        # formulations
        if e["type"]=="compounding":
            form = e["formulation"]
            ingredients_json = json.dumps(form["ingredients"], ensure_ascii=False).replace("'", "''")
            procedure = form["procedure"].replace("'", "''")
            form_id = str(uuid.uuid4())
            form_sql = f"INSERT INTO formulations (id, product_id, version, ingredients, procedure, review_status, created_at) VALUES ('{form_id}', '{pid}', 1, '{ingredients_json}'::jsonb, '{procedure}', 'pending', '{created_at}');\n"
            f.write(form_sql)
        else:
            form_id = str(uuid.uuid4())
            ingredients = [{"name": e.get("active_ingredient"), "amount": e.get("strength"), "role":"API"}]
            ingredients_json = json.dumps(ingredients, ensure_ascii=False).replace("'", "''")
            procedure = "انظر نشرة المنتج الرسمية."
            form_sql = f"INSERT INTO formulations (id, product_id, version, ingredients, procedure, review_status, created_at) VALUES ('{form_id}', '{pid}', 1, '{ingredients_json}'::jsonb, '{procedure}', 'approved', '{created_at}');\n"
            f.write(form_sql)
        f.write("\n")

print(f"✅ تم حفظ ملف SQL: {sql_path}")

# Zip the outputs
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as z:
    z.write(json_path, os.path.basename(json_path))
    z.write(sql_path, os.path.basename(sql_path))

print(f"✅ تم حفظ ملف ZIP: {zip_path}")

print("\n🎉 تم الانتهاء بنجاح!")
print(f"   - ملف JSON: {json_path}")
print(f"   - ملف SQL: {sql_path}")
print(f"   - ملف ZIP: {zip_path}")
