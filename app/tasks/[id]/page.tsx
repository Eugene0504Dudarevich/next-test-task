"use client";

import {useRouter, usePathname} from "next/navigation";
import { FC, useState } from "react";
import useTaskDetails from "@/app/hooks/useTaskDetails";
import AddTaskForm from "@/app/components/AddTaskForm";

const TaskDetails: FC = () => {
  const [editMode, setEditMode] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const getTaskId = () => {
    const routeParts = pathName.split("/");
    return routeParts.at(-1) as string;
  };

  const taskId = getTaskId();
  const { taskDetails } = useTaskDetails(taskId);

  const onBackClick = () => {
    router.replace("/");
  }

  const onEditClick = () => {
    setEditMode(true);
  };

  return (
    <>
      {taskDetails && (
        <>
        {!editMode && (
          <div className="max-w-xl mx-auto pt-10">
            <button className="mb-7" onClick={onBackClick}>Back to main page</button>
            <h1 className="text-7xl font-bold mb-5">{taskDetails.title}</h1>
            <h4 className="text-4xl mb-5">Due date: {taskDetails.dueDate}</h4>
            <h4 className="text-4xl mb-5">Status: {taskDetails.isDone ? 'Completed' : 'Not completed'}</h4>
            <button
              className="w-1/4 p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              onClick={onEditClick}
            >
              Edit
            </button>
          </div>
        )}
          {editMode && <AddTaskForm taskId={taskId} setEditMode={setEditMode} />}
        </>
      )}
    </>
  );
};

export default TaskDetails;