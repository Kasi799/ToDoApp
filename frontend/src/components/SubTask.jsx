
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSubTask, updateSubTask } from "../redux/reduxRoutes/taskRedux";

const SubTask = ({ task, updateTaskState }) => {
  const dispatch = useDispatch();
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubTask, setNewSubTask] = useState("");
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    if (task?.subtasks && Array.isArray(task.subtasks)) {
      setSubtasks(task.subtasks);
    } else {
      setSubtasks([]); 
    }
  }, [task]);
  const handleAddSubTask = async () => {
    if (!newSubTask.trim()) {
      alert("Subtask title cannot be empty");
      return;
    }
    const tempId = Date.now().toString();
    const newSub = { _id: tempId, title: newSubTask, completed: false };
    const updatedSubtasks = [...subtasks, newSub];
    setSubtasks(updatedSubtasks);
    updateTaskState(task._id, updatedSubtasks);
    try {
      const response = await dispatch(createSubTask(task._id, { title: newSubTask }));
      setNewSubTask("")
      if (response?.payload?._id) {
        setSubtasks((prevSubtasks) =>
          prevSubtasks.map((sub) =>
            sub._id === tempId ? { ...sub, _id: response.payload._id } : sub
          )
        );
      }
    } catch (error) {
      console.error(" Error creating subtask:", error);
    }
    setNewSubTask("");
  };

  const handleToggleComplete = (sub) => {
    if (!sub || !sub._id) {
      console.error(" Subtask ID is undefined! Check if the subtask has a valid ID.");
      return;
    }
    console.log(`Updating Subtask: ${sub._id}`);
    const updatedSubtasks = subtasks.map((s) =>
      s._id === sub._id ? { ...s, completed: !s.completed } : s
    );
    setSubtasks(updatedSubtasks);
    updateTaskState(task._id, updatedSubtasks);
    dispatch(updateSubTask(task._id, sub._id, { completed: !sub.completed }));
  };

  return (
    <div className="ml-5 mt-2">
      <button onClick={() => setShowSubtasks(!showSubtasks)} className="text-blue-500 ml-80 font-bold mt-4">
        {showSubtasks ? "▲ Subtasks" : "▼ Subtasks"}

      </button>
      {showSubtasks && (
        <>
          {subtasks.length > 0 ? (
            subtasks.map((sub, index) => (
              <div key={sub._id || `subtask-${index}`} className="flex items-center justify-between  bg-gray-200 p-2 mb-1 rounded">
                <span className={sub.completed ? "line-through text-gray-500" : ""}>
                  {sub.title}
                </span>
                <div className="flex gap-2">
                {/* <button
                  onClick={() => handleToggleComplete(sub)}
                  className={`px-2 py-1 rounded cursor-not-allowed ${
                    sub.completed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                  }`}
                >
                  {sub.completed ? "Open" : "Open"}
                </button> */}
                <button
                  onClick={() => handleToggleComplete(sub)}
                  className={`px-2 py-1 rounded ${
                    sub.completed ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"
                  }`}
                >
                  {sub.completed ? "Closed" : "Close"}
                </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subtasks yet.</p>
          )}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a subtask..."
              value={newSubTask}
              onChange={(e) => setNewSubTask(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <button onClick={handleAddSubTask} className="bg-green-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SubTask;


