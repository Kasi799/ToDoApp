import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../redux/reduxRoutes/taskRedux";
const EditTask = ({ task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!task._id) {
      console.error("Task ID is missing!", task);
      return;
    }
    dispatch(editTask({ _id: task._id, title })); 
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mb-3"
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Update
            </button>
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
