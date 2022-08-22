import React from "react";

function Slide() {

  const [items, setItems] = React.useState([])
  const [error, setError] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [totalItem, setTotalItem] = React.useState(0)
  
  React.useEffect(()=>{
  allData()
  },[page])
  
  const allData = ()=>{
  
  fetch(`https://slides-app-220822.herokuapp.com/slides?_page=${page}&_limit=1`)
  .then((res)=> {
  
  let total = res.headers.get("X-Total-Count");
  
  setTotalItem(+total)
  
  return res.json()
  })
  .then((res)=> setItems(res))
  .catch((err)=> setError(true))
  
  
  }
  return (
    <div className="slide-container" data-cy="slide">

      {items.map((elem,idx)=>{
      return  <div>
  <h3 data-cy="title">{elem.title}</h3>
  <p data-cy="description">{elem.description}</p>
       
  </div>
      })}
     <button data-cy="prev" onClick={()=>setPage(page-1)} disabled={page===1}>Prev</button>
      <button data-cy="next" onClick={()=>setPage(page+1)}
       disabled = {page === Math.ceil(totalItem/1)}>Next</button>
    
    </div>
  );
}


export default Slide;
