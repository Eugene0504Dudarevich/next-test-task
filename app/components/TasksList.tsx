import { FC } from 'react';
import { Task as TaskType } from '../types';
import { Task } from './Task';

const TasksList: FC = async () => {
  const tasks = await fetch('http://localhost:3001/tasks').then((res) =>
    res.json()
  );

  return (
    <div className="max-w-xl mx-auto pt-10">
      <h1 className="text-4xl font-bold mb-5">To Do List</h1>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      <ul>
        {tasks.map((task: TaskType) => (
          <Task task={task} key={task.id} />
        ))}
      </ul>
      {/* </Suspense> */}
    </div>
  );
};

export default TasksList;
