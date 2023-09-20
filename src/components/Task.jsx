// import React from 'react'

const Task = ({ title, date, description, deleteTask }) => {
  return (
    <div
      className=" my-4 h-[8rem] bg-slate-200 rounded-md relative text-black p-2 text-2xl"
    >
      <h2 className="p-2">{title}</h2>

      <p className="text-lg inline-block">{date}</p>
      <button className=" absolute pl-3 right-20" onClick={()=>{deleteTask(title)}}>
        delete
      </button>

      <p className="">{description}</p>
    </div>
  );
};

export default Task
