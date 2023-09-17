// import React from 'react'

const NewTask = ({setNewTask,setTitle,title,date,setDate,description,setDescription}) => {
    function createTask(e){
        setNewTask(1)
        e.preventDefault();
        setTitle(title.value)
        setDate(date.value)
        setDescription(description.value)
    }
  return (
    <div className='flex items-center justify-center h-[100vh]'>

      <div className='rounded-md border-2   bg-white p-20'>

        <h2 className='text-5xl font-bold mb-3'>Create a new task.</h2>
        
        <p className='text-lg font-light'>Provide information about the task you wish to complete.</p>
        
        <div className="my-3">
            
            <input type="title" className="p-2 w-[100%] border text-lg border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border" id="exampleInputtext" placeholder="title" ref={(c) => title = c}/>
            
        </div>
        <div className="my-3 ">
            
            <input type="date" className="p-2 w-[100%] text-slate-400 border text-lg border-slate-300 rounded-md hover:bg-slate-100 active:border-cyan-200 focus:border" ref={(c) => date = c}/>
            
        </div>
        <div className="mb-3">
            
            <textarea type="text" className="border h-20 border-slate-300 text-lg rounded-md p-2 w-[100%] hover:bg-slate-100 active:border-cyan-200" id="exampleInputTextArea" placeholder='Description' ref={(c) => description = c}/>
            
        </div><hr className='border border-slate'/>
        
        <button onClick={createTask} className="w-[100%] text-lg my-2 transition duration-200 ease-in-out text-white p-1 rounded-md bg-cyan-600 hover:bg-cyan-700">Add</button>
        
      </div>
      
    </div>
  )
}

export default NewTask
