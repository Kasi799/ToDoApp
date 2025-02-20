import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, removeTask } from "../redux/reduxRoutes/taskRedux";
import { logoutUser } from "../redux/reduxRoutes/authRedux";
import { useNavigate } from "react-router-dom";
import EditTask from "./EditTask";
import SubTask from "./SubTask"; 

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const tasks = useSelector((state) => state.tasks.list);
  const user = useSelector((state) => state.auth.user); 
  const loading = useSelector((state) => state.tasks.loading); 
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert("Task title cannot be empty");
      return;
    }
    const newTaskObj = { _id: Date.now().toString(), title: newTask, subtasks: [] };
    setTaskList([...taskList, newTaskObj]);
    dispatch(createTask({ title: newTask }));
    setNewTask(""); 
  };

  const updateTaskState = (taskId, updatedSubtasks) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, subtasks: updatedSubtasks } : task
      )
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate("/"); 
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

      {loading ? ( 
        <div className="text-center">Loading tasks...</div>
      ) : (
        taskList.map((task) => (
          <div key={task._id} className="bg-gray-100 p-2 mb-2 rounded">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{task.title}</span>
              <div>
                <button
                  onClick={() => setEditTask(task)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    dispatch(removeTask(task._id));
                    setTaskList(taskList.filter((t) => t._id !== task._id));
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>            
            <SubTask task={task} updateTaskState={updateTaskState} />
          </div>
        ))
      )}

      {editTask && <EditTask task={editTask} onClose={() => setEditTask(null)} />}

      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4 w-auto"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default TodoList;
