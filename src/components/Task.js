import React,{useRef,useState} from "react";
import './Task.css'

const Tache =(props)=> {
	const [dragging, setDragging] = useState(false);
	const dragItem = useRef();
	const dragItemNode = useRef();

	const handletDragStart=(e,task)=>{
		setDragging(true);
		 //store the current item
		dragItem.current = task;
		//store the current node element
		dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd(task))
	}

	const handleDragEnd = (task) => {
		props.getStatus(task)
		console.log('end draggen')
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
	}

	
    return (
      <div className="tache-container"  onDragStart={(e) => handletDragStart(e, props.tache)} draggable>
        <h2>{props.tache.title}</h2>
        <p>{props.tache.responsable}</p>
       { props.tache.status!=='Done' ? <button onClick={() => props.getStatus(props.tache)}>
          {" "}
          Progess{" "}
        </button> : <></>}
      </div>
    );
  }

export default Tache;
