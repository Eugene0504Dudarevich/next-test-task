'use server';

import { revalidatePath } from 'next/cache';

export const addTask = async (formData: FormData) => {
  const id = formData.get('id');
  const payload = {
    title: formData.get('title'),
    dueDate: formData.get('dueDate'),
    isDone: formData.get('isDone'),
  };

  if (id) {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then((res) => res.json());
    } catch (error) {
      console.error(error);
    }
    revalidatePath('/tasks/[id]', 'page');
  } else {
    try {
      await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }

    revalidatePath('/');
  }
};

export const toggleTask = async (formData: FormData) => {
  const id = formData.get('id');

  if (!id) return;

  const isDone = formData.get('isDone');

  try {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDone }),
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/');
  revalidatePath(`/tasks/${id}`);
};

export const deleteTask = async (formData: FormData) => {
  const id = formData.get('id');

  try {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/');
};
