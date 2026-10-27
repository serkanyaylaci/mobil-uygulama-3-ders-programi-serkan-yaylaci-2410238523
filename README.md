# UYGULAMA 3 | Öğrenci Ders Programı

**Öğrenci Adı Soyadı:** Serkan Yaylacı  
**Öğrenci Numarası:** 2410238523  
**Ders:** Mobil Programlama  
**Konu:** Expo Router Dinamik Ders İnceleme, Gün Filtreleme Mekanizması ve Kart Mimarisi  

---

## 📌 Senaryo ve Projenin Amacı
Üniversite öğrencisinin haftalık ders çizelgesini mobil cihazı üzerinden gün bazlı takip edebilmesi ve seçtiği dersin tüm detaylarını (ders saati, sınıf/laboratuvar, öğretim elemanı, kredi ve ders izlencesi) görüntüleyebilmesi amacıyla geliştirilmiştir.

Föy şartları gereğince veri modeli, klasör hiyerarşisi ve arayüz tasarımı öğrenci kararına bırakılmış olup tam bağımsız ve modüler bir proje yapısı kurgulanmıştır.

---

## 📱 Ekranlar ve Navigasyon Akışı

```text
app/
├── _layout.jsx        # Root Stack Navigasyonu (Derslik teması ve başlıklar)
├── index.jsx          # Haftalık Ders Çizelgesi (FlatList, Gün Filtresi, Kredi Sayacı)
└── ders/
    └── [id].jsx       # Dinamik Ders Detayı (/ders/[id] - useLocalSearchParams)
```

1. **Haftalık Ders Çizelgesi (`/` - `app/index.jsx`):**
   - Haftanın günlerine göre dersleri süzebilen yatay filtre çubuğu (`Tümü`, `Salı`, `Çarşamba`, `Perşembe`, `Cuma`).
   - Seçili filtreye ait toplam kredi miktarını anlık hesaplayan sayaç rozeti.
   - Her ders `CourseCard` bileşeni ile zaman çizelgesi formatında gösterilir.
   - Karta basıldığında `router.push('/ders/' + course.id)` ile detay sayfası açılır.

2. **Dinamik Ders Detayı (`/ders/[id]` - `app/ders/[id].jsx`):**
   - `useLocalSearchParams()` ile URL'den ders ID'si okunur.
   - Dersin kodu, adı, türü (Zorunlu / Seçmeli), dersi veren akademisyen, gün, saat, amfi/derslik, kredi ve AKTS bilgileri ile detaylı ders izlencesi sunulur.
   - Sol üstteki `Geri` butonu veya alttaki `← Ders Programına Geri Dön` butonu ile listeye geri dönülür.

---

## 📚 Veri Modeli (`data/courses.js`)

Föydeki örnek ders kayıtlarına ek olarak 5 derslik zengin bir müfredat tanımlanmıştır:

| ID | Ders Adı | Kod | Gün | Saat | Sınıf / Lab | Öğretim Elemanı | Kredi / AKTS |
| :---: | :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **d1** | Mobil Programlama | BLG-301 | Salı | 09.00 - 12.00 | Lab 2 | Dr. Öğr. Üyesi Ahmet Kaya | 4 / 6 |
| **d2** | JavaScript İleri Seviye | BLG-205 | Çarşamba | 13.00 - 16.00 | Lab 1 | Öğr. Gör. Merve Yılmaz | 3 / 5 |
| **d3** | Web Tasarımı ve UX | BLG-211 | Perşembe | 10.00 - 13.00 | Derslik 3 | Doç. Dr. Selin Demir | 3 / 4 |
| **d4** | Veritabanı Sistemleri | BLG-305 | Cuma | 11.00 - 14.00 | Lab 4 | Prof. Dr. Hakan Çelik | 4 / 6 |
| **d5** | Yazılım Test ve Doğrulama | BLG-401 | Salı | 13.30 - 16.30 | Lab 2 | Dr. Öğr. Üyesi Zeynep Arslan | 3 / 5 |

---

## 🎨 Tasarım Kararları ve Bileşen Mimarisi

1. **CourseCard Bileşeni (`components/CourseCard.jsx`):**
   - Sol kenarda dersin kategorisine göre renkli vurgu şeridi (`borderLeftWidth: 5`) kullanılmıştır.
   - Ders günü (`📅`), saati (`⏰`), sınıfı (`🏢`) ve öğretim elemanı (`👨‍🏫`) simgelerle görselleştirilerek öğrencinin aradığı bilgiye anında ulaşması sağlanmıştır.
2. **Renk Paleti ve Tipografi:**
   - Akademik ciddiyet ve modern öğrenci arayüzü hissi vermek amacıyla mor/indigo tonları (`#7c3aed`), açık arka plan (`#f8fafc`) ve yüksek kontrastlı koyu başlıklar (`#0f172a`) kullanılmıştır.

---

## 🛡️ Hatalı ID Denetimi (Föy Kuralı)
- Öğrenci veya sistem bilinmeyen bir rota ID'si çağırdığında (Örn: `/ders/d999`):
  ```jsx
  const course = getCourseById(id);
  if (!course) {
    return (
      <View style={styles.errorCard}>
        <Text style={styles.errorTitle}>⚠️ Ders Kaydı Bulunamadı</Text>
        <Text>"{id}" kodlu ders müfredat programında bulunmuyor.</Text>
        <Pressable onPress={() => router.replace('/')}>
          <Text>← Ders Programına Geri Dön</Text>
        </Pressable>
      </View>
    );
  }
  ```
  Uygulamanın çökmesi engellenmiş, kullanıcıya bilgilendirici uyarı ve ana listeye dönüş seçeneği sunulmuştur.

---

## 🧪 İlgili Test Senaryoları ve Sonuçları

| Test No | Senaryo | Beklenen Sonuç | Gerçekleşen Sonuç | Durum |
| :---: | :--- | :--- | :--- | :---: |
| **T7** | Farklı bir derse bas (`d1` / `d4`) | Seçilen dersin bilgileri görünür | Tıklanan dersin kodu, saati, sınıfı ve akademisyen bilgisi eksiksiz listelendi | **GEÇTİ [X]** |
| **Ek** | Hatalı ders ID denemesi (`/ders/d999`) | Kontrollü hata mesajı çıkar | "Ders Kaydı Bulunamadı" uyarısı çıktı, çökme olmadı | **GEÇTİ [X]** |

---

## 🚀 Kurulum ve Çalıştırma

```bash
# Proje dizinine geçin
cd "c:\Mobil Programlama\Uygulama3-OgrenciDersProgrami_serkan_yaylaci_2410238523"

# Expo geliştirici sunucusunu başlatın
npx expo start
```

- **Tarayıcıda test etmek için:** Terminalde `w` tuşuna basın.
- **Android Emülatör için:** `a` tuşuna basın.
- **Expo Go ile telefonda test etmek için:** Terminaldeki QR kodu taratın.
