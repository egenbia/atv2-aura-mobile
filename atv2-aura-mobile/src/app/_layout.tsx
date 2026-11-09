import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 85 : 60 + (insets.bottom > 0 ? insets.bottom : 10);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#9B51F5",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: Platform.OS === 'ios' ? 25 : (insets.bottom > 0 ? insets.bottom : 8),
          paddingTop: 8,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Projetos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="artigos"
        options={{
          title: "Artigos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="glossario"
        options={{
          title: "Glossário",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}