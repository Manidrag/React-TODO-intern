import { useState } from "react";
import TodosList from "./Component/TodoList";
import uniqid from 'uniqid';
import Header from "./Component/Header";

function App(){
     const [data,setData]=useState([])   //data
    const [showForm, setShowForm] = useState(false);//form open and close
        

   const [task,setTask]=useState("")
    const [desc,setDesc]=useState("")//description
    function handleSubmit(e){
        e.preventDefault();
        const now = new Date();
        const time = now.toLocaleString(); //time in local format
        const arr=[uniqid(),task,desc,false,time];   
        setData(prev=>[arr, ...prev]); // Add new task at the top
        e.target.reset(); 
        setTask("");
        setDesc(""); 
        setShowForm(false); 
        setShowForm(false); // Toggle form visibility
    }
    function handleDone(id){
       if( confirm("Are you sure you want to mark this task as done?") ) {
             setData(prev=>
                prev.map(item =>
                    item[0]===id?[item[0]+"☑", item[1]+"☑", item[2]+"☑", !item[3]] : item
                )
            )
       }
    }
    function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this task?")) return;
        setData(prev => prev.filter(item => item[0] !== id));
    }

    function handleEdit(id,newTask,newDesc){
        if (!confirm("Are you sure you want to save this task?")) return;
              setData(prev=>prev.map((item)=>item[0]===id?[item[0],newTask,newDesc,item[3]]:item))
    }
    return(<>
    {/* Header show */}
    <Header/>
    <div className="flex flex-col items-center mt-8">
        {/* Button to toggle form visibility */}
      <button
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400"
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? <span className="text-2xl">&#x25B2;</span> : <span className="text-lg">+ Add Task</span>}
      </button>
      {/* Form for adding tasks */}
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md bg-gradient-to-br from-blue-50 via-fuchsia-50 to-pink-100/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col gap-6 border border-fuchsia-200 transition-all duration-300 ${showForm ? 'flex' : 'hidden'}`}
      >
        <label className="text-fuchsia-700 font-semibold tracking-wide text-lg">Task</label>
        <input
          className="border-2 border-fuchsia-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-gray-900 bg-white/80 placeholder-fuchsia-300 text-base shadow-sm transition-all"
          placeholder="Enter Task"
          required
          onChange={(e) => setTask(e.target.value)}
        />
        <label className="text-fuchsia-700 font-semibold tracking-wide text-lg">Description</label>
        <textarea
          className="border-2 border-fuchsia-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900 bg-white/80 placeholder-fuchsia-300 resize-none min-h-[90px] text-base shadow-sm transition-all"
          placeholder="Description"
          required
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-blue-400 hover:from-blue-400 hover:to-fuchsia-500 text-white font-extrabold py-3 rounded-xl shadow-lg transition-all duration-200 tracking-wider text-lg"
        >
          Add Task
        </button>
      </form>
    </div>
    <TodosList datas={data} onDone={handleDone} onDelete={handleDelete} onEdit={handleEdit}/>
   
    </>)

}

export default App;