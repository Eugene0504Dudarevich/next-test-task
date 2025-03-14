import {useEffect, useState} from "react";
import {Task} from "@/app/types";

const useTaskDetails = (id: string | null) => {
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      loadTaskDetails();
    }
  }, [id]);

  const loadTaskDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${id}`);
      const data = await response.json();
      setTaskDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {taskDetails};
};

export default useTaskDetails;