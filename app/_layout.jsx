import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#ffffff' },
          headerTintColor: '#0f172a',
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          headerBackTitle: 'Geri',
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Haftalık Ders Programı', headerShown: true }}
        />
        <Stack.Screen
          name="ders/[id]"
          options={{ title: 'Ders Bilgileri', headerShown: true }}
        />
      </Stack>
    </>
  );
}
