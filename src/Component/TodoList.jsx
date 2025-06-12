import TodoListitems from "./TodoListItem"



export default function TodosList(props){
   
  return( <>
   <div>
    <table>
         <thead>
                    <tr>
                        <th>id</th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Time</th> {/* Add this */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

               
        {
            props.datas.map((item)=>(

                <TodoListitems 
                key={item[0]}
                item={item}
                onDone={props.onDone}
                onDelete={props.onDelete}
                onEdit={props.onEdit}/>
 
            )

         
                
            )}
        
        </tbody>
    </table>
   </div>
   </>)
}