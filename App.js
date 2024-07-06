import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Button, Card } from "react-native-paper";
import TaskItem from "./components/TaskItem";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    });
    return () => unsubscribe();
  }, []);

  const handleAddTask = async () => {
    if (taskTitle.trim()) {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        status: false,
      });
      setTaskTitle("");
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleToggleTaskStatus = async (id) => {
    const task = tasks.find((task) => task.id === id);
    await updateDoc(doc(db, "tasks", id), {
      status: !task.status,
    });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>Task App by Pritul</Text>
        <Card style={styles.inputCard}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter task"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <Button
            mode="contained"
            onPress={handleAddTask}
            disabled={!taskTitle.trim()}
            style={styles.addButton}
          >
            Add Task
          </Button>
        </Card>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleTaskStatus}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No tasks added yet.</Text>
          }
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
  addButton: {
    backgroundColor: "#00796b",
    borderRadius: 0,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  inputCard: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  inputField: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#b0bec5",
    padding: 10,
    borderRadius: 0,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#00796b",
    marginTop: 30,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#757575",
  },
});
