import {  useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { supabase } from "../supabase";
import {  toast } from "react-toastify";


const Task = ({
  title,
  filter,
  description,
  deleteTask,
  uid,
  projects,
  setIsLoading,
}) => {
  const [updateFilter, setUpdateFilter] = useState(filter);

  function filterChange(e) {
    const newFilter = e.target.value;

    const taskIndex = projects.findIndex((task) => task.title === title);

    if (taskIndex !== -1) {
      const updatedProjects = [...projects];

      updatedProjects[taskIndex] = {
        ...updatedProjects[taskIndex],
        filter: newFilter,
      };

      supabase
        .from("users")
        .update({ task: updatedProjects })
        .eq("uuid", uid)
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          } else {
            toast.success("Filter updated successfully");
            setUpdateFilter(newFilter);
          }
        })
        .catch((error) => {
          toast.error("Error updating filter");
        });
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`my-4 h-[8rem] bg-slate-200 rounded-md relative ${
        updateFilter == "Completed" ? "text-gray-500" : "text-gray-900"
      } p-2 sm:p-1 text-2xl sm:text-lg`}
    >
      <h2 className="p-2">{title}</h2>

      <select
        className="text-base sm:text-sm inline-block text-gray-500 active:border-gray-500"
        name="filter"
        value={updateFilter}
        onChange={filterChange}
      >
        <option>Pending</option>
        <option>Completed</option>
      </select>
      <button
        className=" absolute pl-3 right-20"
        onClick={() => {
          deleteTask(title);
        }}
      >
        <AiTwotoneDelete className="text-red-500 text-3xl sm:text-xl" />
      </button>

      <p className="">{description}</p>
    </div>
  );
};

export default Task
