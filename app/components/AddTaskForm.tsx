"use client";

import {ChangeEvent, FC, useState} from "react";
import { useFormStatus } from "react-dom";
import { addTask, updateTask } from "@/app/actions";
import useTaskDetails from "@/app/hooks/useTaskDetails";

export type FormState = {
  title: string;
  dueDate: string;
};

const initialState: FormState = {
  title: '',
  dueDate: '',
};

function useFormState<T> (submitAction: (formData: FormData, taskId?: string) => void, initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(previousState => ({ ...previousState, [name]: value }));
  };

  const formAction = (formData: FormData, taskId?: string) => {
    submitAction(formData, taskId);
  };

  return [ formAction, handleChange, formState, setFormState ] as const;
}

type SubmitButtonProps = {
  taskId?: string;
};

const SubmitButton: FC<SubmitButtonProps> = ({ taskId }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
      aria-disabled={pending}
    >
      {taskId ? 'Update Task' : 'Add Task'}
    </button>
  );
};

export type AddTaskFormProps = {
  taskId?: string;
  setEditMode?: (editMode: boolean) => void;
};

const AddTaskForm: FC<AddTaskFormProps> = ({ taskId, setEditMode }) => {
  const { taskDetails } = useTaskDetails(taskId ? taskId : null);

  const [formAction, handleChange, formState, setFormState] = useFormState<FormState>(taskId ? updateTask : addTask, initialState);

  const handleSubmit = (formData: FormData) => {
    if (!formData.get('title')) return;

    formAction(formData, taskId);

    if (taskId && setEditMode) {
      setEditMode(false);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormState(initialState);
  };

  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="max-w-xl mx-auto w-full">
        <h1 className="text-4xl font-bold my-5">{taskId ? 'Update task' : 'Add a new task'}</h1>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="task" className="block text-sm font-medium mb-1">
              Task:
            </label>
            <input
              value={formState.title || (taskDetails?.title ?? '')}
              name="title"
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full mx-auto p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
              Due Date:
            </label>
            <input
              value={formState.dueDate || (taskDetails?.dueDate ?? '')}
              type="date"
              name="dueDate"
              onChange={handleChange}
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <SubmitButton taskId={taskId} />
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;