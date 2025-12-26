// import { supabase } from "@/lib/supabase";
// import React, { useState, useEffect } from "react";

// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// interface Task {
//   id: string; // Usually UUID (string)
//   user_id: string;
//   title: string;
//   completed: boolean;
//   inserted_at: string; // ISO timestamp string
// }

// export default function TodoApp() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchUserAndTodos() {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (user) {
//         setUserId(user.id);
//         fetchTodos(user.id);
//       } else {
//         // No user signed in
//         setLoading(false);
//       }
//     }
//     fetchUserAndTodos();
//   }, []);

//   const fetchTodos = async (uid: string) => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("todos")
//       .select("*")
//       .eq("user_id", uid)
//       .order("inserted_at", { ascending: true });

//     if (error) {
//       console.error("Error fetching todos:", error);
//     } else if (data) {
//       setTasks(data);
//     }
//     setLoading(false);
//   };

//   const addTask = async () => {
//     if (!newTask.trim() || !userId) return;

//     const { data, error } = await supabase
//       .from("todos")
//       .insert([{ title: newTask.trim(), completed: false, user_id: userId }])
//       .select()
//       .single();

//     if (error) {
//       console.error("Error adding todo:", error);
//     } else if (data) {
//       setTasks((prev) => [...prev, data]);
//       setNewTask("");
//     }
//   };

//   const toggleTask = async (id: string) => {
//     const task = tasks.find((t) => t.id === id);
//     if (!task || !userId) return;

//     const { data, error } = await supabase
//       .from("todos")
//       .update({ completed: !task.completed })
//       .eq("id", id)
//       .eq("user_id", userId)
//       .select()
//       .single();

//     if (error) {
//       console.error("Error toggling todo:", error);
//     } else if (data) {
//       setTasks((prev) =>
//         prev.map((t) => (t.id === id ? { ...t, completed: data.completed } : t))
//       );
//     }
//   };

//   const deleteTask = async (id: string) => {
//     if (!userId) return;

//     const { error } = await supabase
//       .from("todos")
//       .delete()
//       .eq("id", id)
//       .eq("user_id", userId);

//     if (error) {
//       console.error("Error deleting todo:", error);
//     } else {
//       setTasks((prev) => prev.filter((t) => t.id !== id));
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView className="items-center justify-center flex-1">
//         <Text>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//       >
//         <View className="flex-1 px-6 pt-12">
//           <Text className="mb-8 text-4xl font-bold text-gray-900">
//             Your To Do
//           </Text>

//           <View className="flex-row items-center gap-3 mb-6">
//             <TextInput
//               className="flex-1 px-6 py-4 text-base text-gray-600 bg-white border border-gray-200 rounded-full"
//               placeholder="Add new task"
//               placeholderTextColor="#9CA3AF"
//               value={newTask}
//               onChangeText={setNewTask}
//               onSubmitEditing={addTask}
//               returnKeyType="done"
//             />
//             <TouchableOpacity
//               onPress={addTask}
//               className="items-center justify-center w-12 h-12 bg-gray-700 rounded-full active:bg-gray-800"
//               activeOpacity={0.7}
//             >
//               <Text className="text-3xl font-light text-white">+</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             className="flex-1"
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           >
//             {tasks.map((task) => (
//               <View
//                 key={task.id}
//                 className="flex-row items-center px-5 py-4 mb-3 bg-white border border-gray-200 rounded-3xl"
//               >
//                 <TouchableOpacity
//                   onPress={() => toggleTask(task.id)}
//                   className="mr-4"
//                   activeOpacity={0.7}
//                 >
//                   <View
//                     className={`w-6 h-6 rounded border-2 items-center justify-center ${
//                       task.completed
//                         ? "bg-gray-700 border-gray-700"
//                         : "border-gray-300"
//                     }`}
//                   >
//                     {task.completed && (
//                       <Text className="text-sm font-bold text-white">✓</Text>
//                     )}
//                   </View>
//                 </TouchableOpacity>

//                 <Text
//                   className={`flex-1 text-base ${
//                     task.completed
//                       ? "text-gray-400 line-through"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   {task.title}
//                 </Text>

//                 <TouchableOpacity
//                   onPress={() => deleteTask(task.id)}
//                   className="p-1 ml-3"
//                   activeOpacity={0.7}
//                 >
//                   <Text className="text-xl text-gray-400">✕</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface Task {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  inserted_at: string;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // =====================
  // Fetch user & todos
  // =====================
  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        fetchTodos(user.id);
      } else {
        setLoading(false);
      }
    };

    init();
  }, []);

  const fetchTodos = async (uid: string) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", uid)
      .order("inserted_at", { ascending: true });

    if (!error && data) {
      setTasks(data);
    }

    setLoading(false);
  };

  // =====================
  // Actions
  // =====================
  const addTask = async () => {
    if (!newTask.trim() || !userId) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: newTask.trim(), completed: false, user_id: userId }])
      .select()
      .single();

    if (!error && data) {
      setTasks((prev) => [...prev, data]);
      setNewTask("");
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || !userId) return;

    const { data } = await supabase
      .from("todos")
      .update({ completed: !task.completed })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (data) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: data.completed } : t))
      );
    }
  };

  const deleteTask = async (id: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (!error) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // =====================
  // Loading
  // =====================
  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-white dark:bg-black">
        <Text className="text-black dark:text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  // =====================
  // UI
  // =====================
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6 pt-12">
          {/* Title */}
          <Text className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
            Your To Do
          </Text>

          {/* Input */}
          <View className="flex-row items-center gap-3 mb-6">
            <TextInput
              className="flex-1 px-6 py-4 text-base text-gray-700 bg-white border border-gray-200 rounded-full dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
              placeholder="Add new task"
              placeholderTextColor="#9CA3AF"
              value={newTask}
              onChangeText={setNewTask}
              onSubmitEditing={addTask}
              returnKeyType="done"
            />

            <TouchableOpacity
              onPress={addTask}
              activeOpacity={0.7}
              className="items-center justify-center w-12 h-12 bg-gray-700 rounded-full dark:bg-gray-600"
            >
              <Text className="text-3xl font-light text-white">+</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {tasks.map((task) => (
              <View
                key={task.id}
                className="flex-row items-center px-5 py-4 mb-3 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-3xl"
              >
                {/* Checkbox */}
                <TouchableOpacity
                  onPress={() => toggleTask(task.id)}
                  activeOpacity={0.7}
                  className="mr-4"
                >
                  <View
                    className={`w-6 h-6 rounded border-2 items-center justify-center ${
                      task.completed
                        ? "bg-gray-700 dark:bg-gray-600 border-gray-700 dark:border-gray-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {task.completed && (
                      <Text className="text-sm font-bold text-white">✓</Text>
                    )}
                  </View>
                </TouchableOpacity>

                {/* Text */}
                <Text
                  className={`flex-1 text-base ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.title}
                </Text>

                {/* Delete */}
                <TouchableOpacity
                  onPress={() => deleteTask(task.id)}
                  activeOpacity={0.7}
                  className="p-1 ml-3"
                >
                  <Text className="text-xl text-gray-400 dark:text-gray-500">
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
