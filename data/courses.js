// UYGULAMA 3: ÖĞRENCİ DERS PROGRAMI VERİLERİ
// Föy gereksinimi: En az 4 ders tanımlayın: id, ders adı, gün, saat, sınıf, öğretim elemanı.
// Gün filtresi için gün değerleri düzenli tutulmuştur.

export const courses = [
  {
    id: 'd1',
    code: 'BLG-301',
    name: 'Mobil Programlama',
    day: 'Salı',
    time: '09:00 - 12:00',
    room: 'Bilgisayar Lab 2',
    instructor: 'Dr. Öğr. Üyesi Ahmet Kaya',
    credits: 4,
    akts: 6,
    type: 'Zorunlu',
    color: '#3B82F6', // Mavi
    description: 'React Native ekosistemi, Expo Router ile modern sayfa yönlendirmeleri, bileşen mimarisi, JSX ve mobil platformlar için performans optimizasyonu teknikleri.',
  },
  {
    id: 'd2',
    code: 'BLG-205',
    name: 'JavaScript İleri Seviye',
    day: 'Çarşamba',
    time: '13:00 - 16:00',
    room: 'Yazılım Lab 1',
    instructor: 'Öğr. Gör. Merve Yılmaz',
    credits: 3,
    akts: 5,
    type: 'Zorunlu',
    color: '#F59E0B', // Kehribar/Sarı
    description: 'ECMAScript 6+ yenilikleri, Promises, Async/Await yapısı, Closure, Prototypes ve modern asenkron programlama prensipleri.',
  },
  {
    id: 'd3',
    code: 'BLG-211',
    name: 'Web Tasarımı ve UX',
    day: 'Perşembe',
    time: '10:00 - 13:00',
    room: 'Tasarım Derslik 3',
    instructor: 'Doç. Dr. Selin Demir',
    credits: 3,
    akts: 4,
    type: 'Seçmeli',
    color: '#10B981', // Yeşil
    description: 'HTML5 semantiği, CSS Flexbox & Grid sistemleri, kullanıcı deneyimi ilkeleri (UX), prototipleme ve erişilebilirlik (a11y) standartları.',
  },
  {
    id: 'd4',
    code: 'BLG-305',
    name: 'Veritabanı Sistemleri',
    day: 'Cuma',
    time: '11:00 - 14:00',
    room: 'Veritabanı Lab 4',
    instructor: 'Prof. Dr. Hakan Çelik',
    credits: 4,
    akts: 6,
    type: 'Zorunlu',
    color: '#8B5CF6', // Mor
    description: 'İlişkisel veritabanı modellemesi, normalizasyon, karmaşık SQL sorguları, indeks optimizasyonu ve ACID prensipleri.',
  },
  {
    id: 'd5',
    code: 'BLG-401',
    name: 'Yazılım Test ve Doğrulama',
    day: 'Salı',
    time: '13:30 - 16:30',
    room: 'Bilgisayar Lab 2',
    instructor: 'Dr. Öğr. Üyesi Zeynep Arslan',
    credits: 3,
    akts: 5,
    type: 'Seçmeli',
    color: '#EC4899', // Pembe
    description: 'Birim testleri (Unit Test), entegrasyon testleri, TDD yaklaşımı ve mobil uygulamalarda UI otomasyon testleri.',
  },
];

export const getCourses = () => courses;

export const getCourseById = (id) => {
  return courses.find((c) => String(c.id) === String(id));
};
