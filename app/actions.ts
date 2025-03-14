"use server";

import { revalidateTag } from "next/cache";

export const addTask = async (formData: FormData) => {
  const title = formData.get("title");
  const dueDate = formData.get("dueDate");

  const newTask = {
    title: title,
    dueDate: dueDate,
    isDone: false,
  };

  try {
    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    revalidateTag("tasks");
  } catch (error) {
    console.error(error);
  }
}

export const updateTask = async (formData: FormData, id?: string) => {
  console.log('formData', formData);
  if (!id) return;

  const title = formData.get("title");
  const dueDate = formData.get("dueDate");

  const newTask = {
    title: title,
    dueDate: dueDate,
  };

  try {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    revalidateTag("tasks");
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (formData: FormData) => {
  const id = formData.get("id");

  try {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    revalidateTag("tasks");
  } catch (error) {
    console.error(error);
  }
};