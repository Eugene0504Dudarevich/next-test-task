'use client';

import { FC } from 'react';
import { addTask } from '../actions';
import { Task as TaskType } from '../types';

export type AddTaskFormProps = {
  task?: TaskType;
  setEditMode?: (editMode: boolean) => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({ task }) => {
  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="max-w-xl mx-auto w-full">
        <h1 className="text-4xl font-bold my-5">
          {task ? 'Update task' : 'Add a new task'}
        </h1>
        <form
          action={addTask}
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.currentTarget.submit();
            if (!task) e.currentTarget.reset();
          }}
        >
          {task?.id && (
            <input type="hidden" name="id" defaultValue={task?.id} />
          )}
          <input
            type="hidden"
            name="isDone"
            defaultValue={task?.isDone ? 'on' : 'off'}
          />
          <div>
            <label htmlFor="task" className="block text-sm font-medium mb-1">
              Task:
            </label>
            <input
              defaultValue={task?.title || ''}
              name="title"
              minLength={3}
              required
              placeholder="Task Title"
              className="w-full mx-auto p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
              Due Date:
            </label>
            <input
              defaultValue={task?.dueDate}
              type="date"
              name="dueDate"
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
