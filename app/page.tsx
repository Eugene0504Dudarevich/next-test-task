import TasksList from "./components/TasksList";
import AddTaskForm from "./components/AddTaskForm";

export default function Home() {
  return (
    <main>
      <AddTaskForm />
      <TasksList />
    </main>
  );
}
