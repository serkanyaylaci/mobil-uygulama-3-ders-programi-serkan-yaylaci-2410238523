import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * CourseCard Bileşeni (Uygulama 3: Öğrenci Ders Programı)
 * Föy Gereksinimleri:
 * - CourseCard bileşeni kullanın.
 * - Props üzerinden tek ders alsın.
 * - Kart seçildiğinde dinamik ders detay ekranına yönlendirsin (/ders/[id]).
 * - Ders adı, gün, saat, sınıf, öğretim elemanı bilgileri yer alsın.
 */
export default function CourseCard({ course }) {
  const router = useRouter();

  if (!course) return null;

  const handlePress = () => {
    router.push(`/ders/${course.id}`);
  };

  const accentColor = course.color || '#3b82f6';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: accentColor },
        pressed && styles.cardPressed,
      ]}
      onPress={handlePress}
    >
      {/* ÜST: DERS KODU & GÜN */}
      <View style={styles.topRow}>
        <View style={[styles.codeBadge, { backgroundColor: `${accentColor}15` }]}>
          <Text style={[styles.codeText, { color: accentColor }]}>
            {course.code || course.id}
          </Text>
        </View>

        <View style={styles.dayBadge}>
          <Text style={styles.dayText}>📅 {course.day}</Text>
        </View>
      </View>

      {/* ORTA: DERS ADI */}
      <Text style={styles.courseName}>{course.name}</Text>

      {/* SAAT VE SINIF BİLGİSİ */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>⏰</Text>
          <Text style={styles.metaText}>{course.time}</Text>
        </View>

        <View style={styles.metaItem}>
          <Text style={styles.metaIcon}>🏢</Text>
          <Text style={styles.metaText}>{course.room}</Text>
        </View>
      </View>

      {/* ÖĞRETİM ELEMANI & DETAY OKU */}
      <View style={styles.bottomRow}>
        <Text style={styles.instructorText} numberOfLines={1}>
          👨‍🏫 {course.instructor}
        </Text>
        <Text style={styles.arrowText}>İncele →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 5,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardPressed: {
    backgroundColor: '#f8fafc',
    transform: [{ scale: 0.99 }],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dayBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  courseName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 13,
  },
  metaText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 8,
    marginTop: 2,
  },
  instructorText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    flex: 1,
  },
  arrowText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3b82f6',
    marginLeft: 8,
  },
});
