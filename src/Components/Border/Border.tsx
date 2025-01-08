import React, { useState } from "react";
import { Todo } from "../../utils/utils";

interface BorderProps {
  todos: Todo[];
  onDelete: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, updatedTask: Partial<Todo>) => Promise<void>;
}

const Border: React.FC<BorderProps> = ({ todos, onDelete, onUpdateStatus }) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    onUpdateStatus(id, { TaskStatus: newStatus });
  };

  const categories = ["To Do", "In Progress", "Completed"];

  return (
    <div className="flex flex-wrap gap-6 p-4 sm:p-8">
      {categories.map((category) => {
        const filteredTodos = todos.filter((todo) => todo.TaskStatus === category);

        return (
          <div
            key={category}
            className="flex-1 min-w-[300px] bg-gradient-to-b from-slate-100 to-slate-200 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">{category}</h2>

            {/* Show "No Data" if no tasks for this category */}
            {filteredTodos.length === 0 ? (
              <div className="text-center text-gray-500">No Data</div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="relative mb-6 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{todo.TaskTitle}</h3>
                  <p className="text-gray-600 mb-4">{todo.Description}</p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(todo.DueOn).toLocaleDateString()}
                  </p>
                  
                  {/* Three dots menu */}
                  <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setMenuOpen((prev) => (prev === todo.id ? null : todo.id))
                    }
                  >
                    ⋮
                  </button>

                  {menuOpen === todo.id && (
                    <div className="absolute top-10 right-2 bg-white border-2 border-gray-300 rounded-lg shadow-md z-10 w-36">
                      {category !== "Completed" && (
                        <button
                          onClick={() => handleUpdateStatus(todo.id, "In Progress")}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                        >
                          Move to In Progress
                        </button>
                      )}
                      {category !== "To Do" && (
                        <button
                          onClick={() => handleUpdateStatus(todo.id, "Completed")}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Move to Completed
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(todo.id)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Border;
