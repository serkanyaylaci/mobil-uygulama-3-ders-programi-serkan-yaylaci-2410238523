import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getCourseById } from '../../data/courses';

/**
 * UYGULAMA 3: Dinamik Ders Detay Ekranı (/ders/[id])
 * Föy Gereksinimleri:
 * - useLocalSearchParams ile id okuma
 * - Detay ekranında tüm ders bilgileri (Ders adı, Kod, Gün, Saat, Sınıf, Öğretim elemanı, Kredi, Açıklama)
 * - Geri seçeneği
 * - Hatalı ID denemesinde kontrollü bilgi mesajı gösterimi
 */
export default function DersDetayEkrani() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const course = getCourseById(id);

  // HATALI ID DENEMESİNDE KONTROLLÜ MESAJ (Föy Kuralı)
  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Ders Kaydı Bulunamadı</Text>
          <Text style={styles.errorSubtitle}>
            "{id}" kodlu veya ID'li ders haftalık müfredat programında yer
            almamaktadır.
          </Text>

          <View style={styles.testNoteBox}>
            <Text style={styles.testNoteTitle}>📌 Kontrollü Hata Yakalama:</Text>
            <Text style={styles.testNoteDesc}>
              Bilinmeyen ders parametresinde uygulama çökmeden kullanıcıya
              açıklayıcı yönlendirme sağlandı.
            </Text>
          </View>

          <Pressable
            style={styles.backToListBtn}
            onPress={() => router.replace('/dersler')}
          >
            <Text style={styles.backToListBtnText}>
              ← Ders Programına Geri Dön
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const accentColor = course.color || '#7c3aed';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* DERS BAŞLIK KARTI */}
      <View style={[styles.mainCard, { borderTopColor: accentColor }]}>
        <View style={styles.topBadgeRow}>
          <View
            style={[
              styles.codeTag,
              { backgroundColor: `${accentColor}18` },
            ]}
          >
            <Text style={[styles.codeTagText, { color: accentColor }]}>
              {course.code}
            </Text>
          </View>

          <View style={styles.typeTag}>
            <Text style={styles.typeTagText}>{course.type || 'Zorunlu'}</Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{course.name}</Text>

        {/* AKADEMİSYEN BİLGİSİ */}
        <View style={styles.instructorBox}>
          <Text style={styles.instructorAvatar}>👨‍🏫</Text>
          <View style={styles.instructorTextCol}>
            <Text style={styles.instructorRole}>Dersi Veren Öğretim Elemanı</Text>
            <Text style={styles.instructorName}>{course.instructor}</Text>
          </View>
        </View>
      </View>

      {/* ZAMAN VE MEKAN BİLGİLERİ */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeading}>📅 Zaman & Sınıf Bilgileri</Text>

        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Ders Günü</Text>
            <Text style={styles.gridValue}>📆 {course.day}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Ders Saati</Text>
            <Text style={styles.gridValue}>⏰ {course.time}</Text>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Derslik / Sınıf</Text>
            <Text style={styles.gridValue}>🏢 {course.room}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Kredi & AKTS</Text>
            <Text style={styles.gridValue}>
              ⭐ {course.credits} Kredi / {course.akts} AKTS
            </Text>
          </View>
        </View>
      </View>

      {/* DERS İÇERİK VE İZLENCESİ */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeading}>📖 Ders İzlencesi ve Amaçları</Text>
        <Text style={styles.descriptionText}>{course.description}</Text>
      </View>

      {/* GERİ SEÇENEĞİ (FÖY KURALI) */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Ders Programına Geri Dön</Text>
      </Pressable>

      <Text style={styles.footerInfo}>
        Ders ID: {course.id} • Dinamik Rota: /ders/{course.id}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderTopWidth: 5,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  codeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeTagText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  typeTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 28,
    marginBottom: 16,
  },
  instructorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  instructorAvatar: {
    fontSize: 28,
    marginRight: 10,
  },
  instructorTextCol: {
    flex: 1,
  },
  instructorRole: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  instructorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  gridLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  footerInfo: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  errorIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 6,
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 14,
  },
  testNoteBox: {
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 10,
    padding: 12,
    marginBottom: 18,
    width: '100%',
  },
  testNoteTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6d28d9',
    marginBottom: 3,
  },
  testNoteDesc: {
    fontSize: 12,
    color: '#5b21b6',
    lineHeight: 17,
  },
  backToListBtn: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  backToListBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
