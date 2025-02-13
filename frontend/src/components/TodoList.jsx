import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, removeTask } from "../redux/reduxRoutes/taskRedux";
import EditTask from "./EditTask";

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert("Task title cannot be empty");
      return;
    }
  
    dispatch(createTask({ title: newTask })); 
    setNewTask(""); 
  };
  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
        >
          <span className="text-lg">{task.title}</span>
          <div>
            <button
              onClick={() => setEditTask(task)}
              className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(removeTask(task._id))}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {editTask && <EditTask task={editTask} onClose={() => setEditTask(null)} />}
    </div>
  );
};

export default TodoList;

