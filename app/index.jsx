import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../data/courses';

/**
 * UYGULAMA 3: Öğrenci Haftalık Ders Programı Ekranı (/dersler)
 * Föy Gereksinimleri:
 * - En az 4 ders tanımlama (id, ders adı, gün, saat, sınıf, öğretim elemanı)
 * - Ana sayfada gün filtresi bulunması
 * - CourseCard bileşeni kullanımı
 * - Kart seçildiğinde dinamik /ders/[id] sayfasına yönlendirme
 */
export default function DersProgramiEkrani() {
  const [courses] = useState(getCourses());
  const [selectedDay, setSelectedDay] = useState('Tümü');

  const days = ['Tümü', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  // Gün filtreleme
  const filteredCourses = courses.filter((c) => {
    if (selectedDay === 'Tümü') return true;
    return c.day.toLowerCase() === selectedDay.toLowerCase();
  });

  // Kredi toplamı
  const totalCredits = filteredCourses.reduce((sum, c) => sum + (c.credits || 0), 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* BAŞLIK VE ÖZET */}
      <View style={styles.header}>
        <View style={styles.headerTitleCol}>
          <Text style={styles.badge}>BİLGİSAYAR MÜHENDİSLİĞİ • GÜZ DÖNEMİ</Text>
          <Text style={styles.title}>Haftalık Ders Çizelgesi</Text>
        </View>

        <View style={styles.creditsBox}>
          <Text style={styles.creditsNum}>{totalCredits}</Text>
          <Text style={styles.creditsLabel}>Kredi</Text>
        </View>
      </View>

      {/* GÜN FİLTRELEME ÇUBUĞU (FÖY TERCİHİ) */}
      <View style={styles.filterWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={days}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.dayChip,
                selectedDay === item && styles.dayChipActive,
              ]}
              onPress={() => setSelectedDay(item)}
            >
              <Text
                style={[
                  styles.dayChipText,
                  selectedDay === item && styles.dayChipTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* DERS LİSTESİ */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🗓️</Text>
            <Text style={styles.emptyTitle}>Bu Günde Ders Yok</Text>
            <Text style={styles.emptyText}>
              Seçili güne ait planlanmış ders kaydı bulunmamaktadır.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  headerTitleCol: {
    flex: 1,
    marginRight: 10,
  },
  badge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7c3aed',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  creditsBox: {
    backgroundColor: '#ede9fe',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  creditsNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6d28d9',
  },
  creditsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6d28d9',
  },
  filterWrapper: {
    marginVertical: 10,
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dayChip: {
    backgroundColor: '#ffffff',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dayChipActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  dayChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  dayChipTextActive: {
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748b',
  },
});
