"use client";

import { FC, Suspense, use } from "react";
import { useRouter } from "next/navigation";
import { Task } from "../types";
import {deleteTask } from "@/app/actions";

async function fetchTasks() {
  try {
    const response = await fetch('http://localhost:3001/tasks');

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

type TaskProps = {
  tasksPromise: Promise<Task[]>;
};

const Tasks: FC<TaskProps> = ({ tasksPromise }) => {
  const router = useRouter();

  const tasks = use(tasksPromise);

  const onTaskDelete = (id: string) => {
    const formData = new FormData();
    formData.append('id', id);

    deleteTask(formData);
  };

  const handleTaskClick = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <ul>
      {tasks.map((task: Task) => (
        <li
          key={task.id}
          className="bg-gray-800 p-4 rounded-lg mb-2 flex items-center cursor-pointer"
          onClick={() => handleTaskClick(task.id)}
        >
          <form>
            <input
              type="checkbox"
              name="isDone"
              checked={task.isDone}
              onChange={() => {}}
              className="cursor-pointer"
            />
          </form>
          <div className="ml-4">{task.title}</div>
          <div className="bg-blue-600 px-2 py-1 ml-auto rounded text-sm">{task.dueDate}</div>
          <form action={() => onTaskDelete(task.id)} className="ml-4">
            <button type="submit">Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
};

const TasksList: FC = () => {
  const tasksPromise = fetchTasks();

  return (
    <div className="max-w-xl mx-auto pt-10">
      <h1 className="text-4xl font-bold mb-5">To Do List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Tasks tasksPromise={tasksPromise} />
      </Suspense>
    </div>
  );
};

export default TasksList;