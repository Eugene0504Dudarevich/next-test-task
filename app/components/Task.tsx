'use client';

import { FC } from 'react';
import { deleteTask, toggleTask } from '../actions';
import { Task as TaskType } from '../types';
import Link from 'next/link';

export const Task: FC<{ task: TaskType }> = ({ task }) => {
  return (
    <li className="bg-gray-800 p-4 rounded-lg mb-2 flex items-center cursor-pointer">
      <form action={toggleTask}>
        <input type="hidden" name="id" value={task.id} />
        <input
          type="checkbox"
          name="isDone"
          defaultChecked={task.isDone}
          className="cursor-pointer"
          onChange={(e) => {
            e.target.form?.requestSubmit();
          }}
        />
      </form>
      <Link href={`/tasks/${task.id}`}>
        <div className="ml-4">{task.title}</div>
      </Link>
      <div className="bg-blue-600 px-2 py-1 ml-auto rounded text-sm">
        {task.dueDate}
      </div>
      <form className="ml-4" action={deleteTask}>
        <input type="hidden" name="id" value={task.id} />
        <button type="submit">Delete</button>
      </form>
    </li>
  );
};
