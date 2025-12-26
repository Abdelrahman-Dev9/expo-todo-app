import { supabase } from "@/lib/supabase";
import { useTheme } from "@/providers/ThemeProvider";
import { router } from "expo-router";
import { View, Text, Pressable, Alert } from "react-native";

export default function Settings() {
  const { mode, setMode } = useTheme();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout failed", error.message);
    } else {
      Alert.alert("Logged out", "You have been logged out successfully.");
      // Example: Navigate to login screen (if using React Navigation)
      router.push("/(auth)/Login");
      // Or update your app state accordingly
    }
  };

  return (
    <View className="flex-1 p-5 pt-20 bg-white dark:bg-black">
      <Text className="mb-4 text-xl font-bold text-black dark:text-white">
        Theme
      </Text>

      {["light", "dark", "system"].map((item) => (
        <Pressable
          key={item}
          onPress={() => setMode(item as any)}
          className={`p-4 rounded-xl mb-3 ${
            mode === item ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-800"
          }`}
        >
          <Text className="text-white capitalize">{item}</Text>
        </Pressable>
      ))}

      <Pressable onPress={handleLogout} style={{ padding: 10 }}>
        <Text style={{ color: "red", fontWeight: "bold" }}>Log out</Text>
      </Pressable>
    </View>
  );
}
