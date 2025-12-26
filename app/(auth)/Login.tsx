import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const { height, width } = Dimensions.get("window");

const Login = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    try {
      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert("Error: " + error.message);
        return;
      }

      // You can also check if signInData.user exists to confirm successful login
      if (signInData.user) {
        alert("Logged in successfully!");
        router.push("/(tabs)/TodoList");
      } else {
        alert("Login failed: No user returned");
      }
    } catch (err) {
      alert(
        "Unexpected error: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-indigo-600"
    >
      <View className="items-center justify-center flex-1 px-4">
        <View
          style={{
            width: Math.min(width * 0.9, 400),
            maxHeight: height * 0.7,
            backgroundColor: "white",
            borderRadius: 24,
            padding: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Text className="mb-8 text-4xl font-extrabold text-center text-indigo-700">
              Welcome Back
            </Text>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View className="mb-6">
                  <Text className="mb-2 font-semibold text-gray-700">
                    Email
                  </Text>
                  <TextInput
                    className={`border rounded-xl px-4 py-3 text-base ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="you@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#9ca3af"
                  />
                  {errors.email && (
                    <Text className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View className="mb-6">
                  <Text className="mb-2 font-semibold text-gray-700">
                    Password
                  </Text>
                  <TextInput
                    className={`border rounded-xl px-4 py-3 text-base ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="#9ca3af"
                  />
                  {errors.password && (
                    <Text className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="py-4 mb-6 bg-indigo-600 shadow-md rounded-xl active:opacity-80"
            >
              <Text className="text-lg font-bold text-center text-white">
                Login
              </Text>
            </TouchableOpacity>

            <Pressable
              onPress={() => router.push("/(auth)/Register")}
              className="py-4"
            >
              <Text className="font-semibold text-center text-indigo-600 underline">
                {"Don't"} have an account? Register
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
