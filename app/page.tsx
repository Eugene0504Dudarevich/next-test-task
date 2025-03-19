import AddTaskForm from "./components/AddTaskForm";
import TasksList from "./components/TasksList";

export default function Home() {
  return (
    <main>
      <AddTaskForm />
      <TasksList />
    </main>
  );
}
