import { FC } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddTaskForm from '@/app/components/AddTaskForm';

const TaskDetails: FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const task = await fetch(`http://localhost:3001/tasks/${id}`).then((res) => {
    if (!res.ok) {
      notFound();
    }

    return res.json();
  });

  return (
    <>
      <div className="max-w-xl mx-auto pt-10">
        <Link href="/">
          <button className="mb-7">Back to main page</button>
        </Link>
        <h1 className="text-7xl font-bold mb-5">{task.title}</h1>
        <h4 className="text-4xl mb-5">Due date: {task.dueDate}</h4>
        <h4 className="text-4xl mb-5">
          Status: {task.isDone === 'on' ? 'Completed' : 'Not completed'}
        </h4>
      </div>
      <AddTaskForm task={task} />
    </>
  );
};

export default TaskDetails;
