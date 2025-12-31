// import { supabase } from "@/lib/supabase";
// import React, { useEffect, useState } from "react";
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
//   id: string;
//   user_id: string;
//   title: string;
//   completed: boolean;
//   inserted_at: string;
// }

// export default function TodoApp() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);

//   // =====================
//   // Fetch user & todos
//   // =====================
//   useEffect(() => {
//     const init = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();

//       if (user) {
//         setUserId(user.id);
//         fetchTodos(user.id);
//       } else {
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   const fetchTodos = async (uid: string) => {
//     setLoading(true);

//     const { data, error } = await supabase
//       .from("todos")
//       .select("*")
//       .eq("user_id", uid)
//       .order("inserted_at", { ascending: true });

//     if (!error && data) {
//       setTasks(data);
//     }

//     setLoading(false);
//   };

//   // =====================
//   // Actions
//   // =====================
//   const addTask = async () => {
//     if (!newTask.trim() || !userId) return;

//     const { data, error } = await supabase
//       .from("todos")
//       .insert([{ title: newTask.trim(), completed: false, user_id: userId }])
//       .select()
//       .single();

//     if (!error && data) {
//       setTasks((prev) => [...prev, data]);
//       setNewTask("");
//     }
//   };

//   const toggleTask = async (id: string) => {
//     const task = tasks.find((t) => t.id === id);
//     if (!task || !userId) return;

//     const { data } = await supabase
//       .from("todos")
//       .update({ completed: !task.completed })
//       .eq("id", id)
//       .eq("user_id", userId)
//       .select()
//       .single();

//     if (data) {
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

//     if (!error) {
//       setTasks((prev) => prev.filter((t) => t.id !== id));
//     }
//   };

//   // =====================
//   // Loading
//   // =====================
//   if (loading) {
//     return (
//       <SafeAreaView className="items-center justify-center flex-1 bg-white dark:bg-black">
//         <Text className="text-black dark:text-white">Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   // =====================
//   // UI
//   // =====================
//   return (
//     <SafeAreaView className="flex-1 bg-gray-50 dark:bg-black">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1"
//       >
//         <View className="flex-1 px-6 pt-12">
//           {/* Title */}
//           <Text className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
//             Your To Do
//           </Text>

//           {/* Input */}
//           <View className="flex-row items-center gap-3 mb-6">
//             <TextInput
//               className="flex-1 px-6 py-4 text-base text-gray-700 bg-white border border-gray-200 rounded-full dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
//               placeholder="Add new task"
//               placeholderTextColor="#9CA3AF"
//               value={newTask}
//               onChangeText={setNewTask}
//               onSubmitEditing={addTask}
//               returnKeyType="done"
//             />

//             <TouchableOpacity
//               onPress={addTask}
//               activeOpacity={0.7}
//               className="items-center justify-center w-12 h-12 bg-gray-700 rounded-full dark:bg-gray-600"
//             >
//               <Text className="text-3xl font-light text-white">+</Text>
//             </TouchableOpacity>
//           </View>

//           {/* List */}
//           <ScrollView
//             className="flex-1"
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{ paddingBottom: 24 }}
//           >
//             {tasks.map((task) => (
//               <View
//                 key={task.id}
//                 className="flex-row items-center px-5 py-4 mb-3 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-3xl"
//               >
//                 {/* Checkbox */}
//                 <TouchableOpacity
//                   onPress={() => toggleTask(task.id)}
//                   activeOpacity={0.7}
//                   className="mr-4"
//                 >
//                   <View
//                     className={`w-6 h-6 rounded border-2 items-center justify-center ${
//                       task.completed
//                         ? "bg-gray-700 dark:bg-gray-600 border-gray-700 dark:border-gray-600"
//                         : "border-gray-300 dark:border-gray-600"
//                     }`}
//                   >
//                     {task.completed && (
//                       <Text className="text-sm font-bold text-white">✓</Text>
//                     )}
//                   </View>
//                 </TouchableOpacity>

//                 {/* Text */}
//                 <Text
//                   className={`flex-1 text-base ${
//                     task.completed
//                       ? "text-gray-400 line-through"
//                       : "text-gray-900 dark:text-white"
//                   }`}
//                 >
//                   {task.title}
//                 </Text>

//                 {/* Delete */}
//                 <TouchableOpacity
//                   onPress={() => deleteTask(task.id)}
//                   activeOpacity={0.7}
//                   className="p-1 ml-3"
//                 >
//                   <Text className="text-xl text-gray-400 dark:text-gray-500">
//                     ✕
//                   </Text>
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

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

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

  // Filter and search tasks before rendering
  const filteredTasks = tasks.filter((task) => {
    // Filter by completion status
    if (filter === "completed" && !task.completed) return false;
    if (filter === "incomplete" && task.completed) return false;

    // Filter by search query
    if (searchQuery.trim() === "") return true;
    return task.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-white dark:bg-black">
        <Text className="text-black dark:text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

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
          <View className="flex-row items-center gap-3 mb-4">
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

          {/* Search */}
          <TextInput
            className="px-4 py-3 mb-4 text-base text-gray-700 bg-white border border-gray-200 rounded-full dark:text-gray-200 dark:bg-gray-900 dark:border-gray-700"
            placeholder="Search tasks..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />

          {/* Filter */}
          <View className="flex-row justify-center mb-6 space-x-4">
            {(["all", "completed", "incomplete"] as const).map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setFilter(status)}
                className={`px-4 py-2 rounded-full border ${
                  filter === status
                    ? "bg-gray-700 border-gray-700 dark:bg-gray-600 dark:border-gray-600"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    filter === status
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* List */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            {filteredTasks.length === 0 ? (
              <Text className="text-center text-gray-500 dark:text-gray-400">
                No tasks found.
              </Text>
            ) : (
              filteredTasks.map((task) => (
                <View
                  key={task.id}
                  className="flex-row items-center px-5 py-4 mb-3 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-3xl"
                >
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

                  <Text
                    className={`flex-1 text-base ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </Text>

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
              ))
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
