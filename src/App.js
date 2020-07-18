import React, {useEffect, useState} from 'react';
import Task from "./components/Task";
import logo from './logo.svg';
import './App.css';


const taches = [
  { id: 1, title: "T330", responsable: "Seif", status: "To Do" },
  { id: 2, title: "T329", responsable: "Anis", status: "To Do" },
  { id: 3, title: "T326", responsable: "Rayed", status: "Doing" },
  { id: 4, title: "T325", responsable: "Sam", status: "Doing" },
  { id: 5, title: "T327", responsable: "Sam", status: "To Do" },
  { id: 6, title: "T324", responsable: "Anis", status: "Test" },
  { id: 6, title: "T322", responsable: "Rayed", status: "Done" },
  { id: 6, title: "T323", responsable: "Seif", status: "Done" }
];

const App =()=> {
  
  const [ newstatus, Setnewstatus ]= useState([])
  const [ countTasks, SetCountTasks ]= useState({todo:0,doing:0,test:0,done:0})



useEffect(()=>{
  //put the cards in the corresponding fields 
  Setnewstatus(taches)
 // count the number of cards in each field
  SetCountTasks({todo:taches.filter(elm=>elm.status==='To Do').length,
  doing:taches.filter(elm=>elm.status==='Doing').length,
  test:taches.filter(elm=>elm.status==='Test').length,
  done:taches.filter(elm=>elm.status==='Done').length
})
    //   document.addEventListener("dragover", e => {
    //   e.preventDefault();
    // });
    // let gens = Array.from(document.querySelectorAll(".gen"));
    // gens.forEach(gen => {
    //   gen.addEventListener("drop", e => {
    //     alert("hii");
    //   });
    // });
},[])

useEffect(()=>{

  //update number of card in each field when any card is moved
  SetCountTasks({todo:newstatus.filter(elm=>elm.status==='To Do').length,
  doing:newstatus.filter(elm=>elm.status==='Doing').length,
  test:newstatus.filter(elm=>elm.status==='Test').length,
  done:newstatus.filter(elm=>elm.status==='Done').length
})
},[newstatus])


// move the card and change his status to next level 
  function handlechange(task){
    let newstatuskey = ["To Do", "Doing", "Test", "Done"];

    // verify if it is possible to move the card to the net champnext field
    let newtask = newstatuskey.indexOf(task.status)+1
    if((newstatuskey[newtask]==="Doing" && countTasks.doing===4) || (newstatuskey[newtask]==="Test" && countTasks.test===4) || (newstatuskey[newtask]==="Done" && countTasks.done===8) ){
     // console.log('true')
      alert('you can not add another task')
    } else{
      Setnewstatus(prevState=>prevState.map(elm =>
      elm.id === task.id
        ? {
            ...elm,
            status: newstatuskey[newtask]
          }
        : elm
    ))
    }
   
  
  };

    return (
      <div className="App">
        <div className="header-contain"> ALLOcloud </div>
        <div className="App-scumban-Container">
        <div className="story-container gen">
          <div className="header-story-Contain"><h1>To Do</h1> <button className='cointTask-btn' style={{background:countTasks.todo===8 ? 'red':'green'}}>{ `${countTasks.todo} / 8`} </button></div>
          <hr />
          {newstatus
            .filter(elm => elm.status === "To Do")
            .map(elm => (
              <Task
                tache={elm}
                getStatus={index =>handlechange(index)}
                // changeState={index =>handlechange(index)}
              />
            ))}
          <button className='addCard-btn'> Add new card ...</button>
        </div>
        <div className="not-started-container gen">
          <div className="header-story-Contain"><h1>Doing</h1> <button className='cointTask-btn' style={{background:countTasks.doing===4 ? 'red':'green'}}>{ `${countTasks.doing} / 4`} </button></div>
          <hr />
          {newstatus
            .filter(elm => elm.status === "Doing")
            .map(elm => (
              <Task
                tache={elm}
                getStatus={index =>handlechange(index)}
              />
            ))}
        </div>
        <div className="in-progress-container gen">
          <div className="header-story-Contain"><h1>Test</h1> <button className='cointTask-btn' style={{background:countTasks.test===4 ? 'red':'green'}}>{ `${countTasks.test} / 4`} </button></div>
          <hr />
          {newstatus
            .filter(elm => elm.status === "Test")
            .map(elm => (
              <Task
                tache={elm}
                getStatus={index =>handlechange(index)}
              />
            ))}
        </div>
        <div className="done-container gen">
         <div className="header-story-Contain"><h1>Done</h1> <button className='cointTask-btn' style={{background:countTasks.todo===8 ? 'red':'green'}}>{ `${countTasks.done} / 8`} </button></div>
          <hr />
          {newstatus
            .filter(elm => elm.status === "Done")
            .map(elm => (
              <Task
                tache={elm}
                getStatus={index =>handlechange(index)}
              />
            ))}
        </div>
      </div>
  </div>
    );
}

export default App;
