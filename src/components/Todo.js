import React from "react";

 function Todo(){


const [values, setValues] = React.useState('');
const [items, setItems] = React.useState([]);
const [error, setError] = React.useState(false);
const [loading, setLoading] = React.useState(false);
const [page, setPage] = React.useState(1)

const [totalItems, setTotalItems] = React.useState(0)

React.useEffect(()=>{
fetchData()


},[page])

const fetchData = ()=>{
    setLoading(true);
    fetch(`http://localhost:3000/todos?_page=${page}&_limit=3`)
    .then((res) =>{
let total = res.headers.get("X-Total-Count");
setTotalItems(+total);
      return  res.json();
    } )
    .then((res) => setItems(res))
    .catch((err) => setError(true))
    .finally(()=> setLoading(false))

}

const addItems = ()=>{



    const todoArray = {
        title: values,
        status: false
    }

const dataTopost = JSON.stringify(todoArray)

fetch(`http://localhost:3000/todos`, {
    method: "POST",
    body: dataTopost,
    headers:{
        "Content-Type": "application/json",
    },

}).then(()=>{
    fetchData()
    setValues("")
})


};

const deleteItem = (id)=>{
 const updatedData =    items.filter((elem,idx)=>{
       return idx != id;
    });

    setItems(updatedData)

}


    return (
        <div>
        <h3>Todo</h3>

        <input type = "text" placeholder="Enter"
         onChange={(e)=> setValues(e.target.value)} value = {values} />
        <button onClick={addItems}>Add</button>

        <hr/>
        {loading ? <h1>Loading</h1> : error ? <h1>Something went wrong</h1> :
        
        <div>{items.map((elem, idx)=>{
            return  <h3 key={idx}>{elem.title} <span></span>     
             <button onClick={()=> deleteItem(idx)}>Delete</button></h3>
      
          })}</div>}
<button onClick={()=>setPage(page-1)} disabled = {page ===1}>prev</button>
<button onClick={()=>setPage(page+1)} 
disabled = {page=== Math.ceil(totalItems/3)}>Next</button>
        </div>
    )

}

export default Todo