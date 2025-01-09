import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Border from "../../Components/Border/Border";
import List from "../../Components/List/List";
import TaskModal from "../../Components/TaskModel";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Todo } from "../../utils/utils";
import { useEffect, useState } from "react";
import React from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const todoCollection = collection(db, "todos");

  // Fetch Todos
  const fetchTodos = async () => {
    const querySnapshot = await getDocs(todoCollection);
    const fetchedTodos = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        DueOn: data.DueOn.toDate(), // Convert Firestore timestamp to JavaScript Date
      };
    }) as Todo[];
    setTodos(fetchedTodos);
  };

  // Update Task Status
  const updateTaskStatus = async (id: string, updatedTask: Partial<Todo>) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, updatedTask);
    fetchTodos();
  };

  // Delete Task
  const deleteTodo = async (id: string) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Filter Todos based on search query, category, and date
  const filteredTodos = todos
    .filter((todo) =>
      todo.TaskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.Description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((todo) => {
      if (categoryFilter && todo.TaskCategory !== categoryFilter) {
        return false;
      }
      if (dateFilter && todo.DueOn.toLocaleDateString() !== dateFilter) {
        return false;
      }
      return true;
    });

  const handleModalClose = () => {
    setModalOpen(false);
    window.location.reload(); // Refresh the page after closing the modal
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap justify-between items-center">
        {/* Tab buttons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            onClick={() => setActiveTab(1)}
            className={`p-1  ${activeTab === 1 ? "border-b-2 border-b-gray-600" : "border-b-0"}`}
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            List
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`p-1  ${activeTab === 2 ? "border-b-2 border-gray-600" : "border-b-0"}`}
          >
            <FontAwesomeIcon icon={faBorderAll} className="mr-2" />
            Border
          </button>
        </div>

        {/* Move the search bar to the right */}
        <div className="relative w-auto sm:w-1/3 mb-3 sm:mb-0 ml-auto">
          <div  className="border p-2 rounded-full w-full pr-8 text-sm" >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             // Use rounded-full for more rounded corners
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
            >
              ×
            </button>
          )}
        </div>

        {/* Task Modal Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#7c1985] text-white py-2 px-6 rounded-lg"
        >
          Add Task
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between my-4">
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 sm:w-auto w-full">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-lg mb-3 sm:mb-0 w-full sm:w-auto"
          >
            <option value=""> Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Active tab content */}
      <div>
        {activeTab === 1 ? (
          <List
            todos={filteredTodos}
            onDelete={deleteTodo}
            onUpdateStatus={updateTaskStatus} // Pass updated task
          />
        ) : (
          <Border
            todos={filteredTodos}
            onDelete={deleteTodo}
            onUpdateStatus={updateTaskStatus} // Pass updated task
          />
        )}
      </div>

      {isModalOpen && <TaskModal setModalOpen={handleModalClose} />}
    </div>
  );
};

export default Dashboard;
