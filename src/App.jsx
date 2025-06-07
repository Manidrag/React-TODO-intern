import { useState } from "react";
import TodosList from "./Component/TodoList";
import uniqid from 'uniqid';
import Header from "./Component/Header";
import "./App.css"
function App(){
     const [data,setData]=useState([])   //data
    const [showForm, setShowForm] = useState(false);//form open and close
        

   const [task,setTask]=useState("")
    const [desc,setDesc]=useState("")//description
    function handleSubmit(e){
        e.preventDefault();
        const arr=[uniqid(),task,desc,false];   
        setData(prev=>[...prev,arr]);
        
    }
    function handleDone(id){
             setData(prev=>
                prev.map(item =>
                    item[0]===id?[item[0], item[1], item[2], !item[3]] : item
                )
            )
    }
    function handleDelete(id) {
        setData(prev => prev.filter(item => item[0] !== id));
    }

    function handleEdit(id,newTask,newDesc){
              setData(prev=>prev.map((item)=>item[0]===id?[item[0],newTask,newDesc,item[3]]:item))
    }
    return(<>
    {/* Header show */}
    <Header/>
      {/* button for add and close task */}
    <button className="ADDTask" onClick={()=>setShowForm(prev=>!prev)}><span className="plus-sign">+</span>{showForm?"Close":"Add Task"}</button>
    {/* User input hh*/}
    <form onSubmit={handleSubmit} className="todo-form" style={{ display: showForm ? "flex" : "none" }} >

    <label >Task</label>
    <input className="input" placeholder="Enter Task" onChange={(e)=>setTask(e.target.value)}></input>
    <input className="Description" placeholder="description" onChange={(e)=>setDesc(e.target.value)}></input>
     <button type="submit">Submit</button>
    </form>
    <TodosList datas={data} onDone={handleDone} onDelete={handleDelete} onEdit={handleEdit}/>
    
    </>)

}

export default App;