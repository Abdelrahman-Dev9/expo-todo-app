import { Stack } from "expo-router";
import "../globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useNetwork } from "@/hooks/useNetwork";
import { Text, View } from "react-native";

export default function RootLayout() {
  const isOnline = useNetwork();

  return (
    <>
      {!isOnline && (
        <View
          style={{
            backgroundColor: "red",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>You are offline</Text>
        </View>
      )}
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </>
  );
}
