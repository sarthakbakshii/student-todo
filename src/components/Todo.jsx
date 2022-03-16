import TodoInput from './TodoInput';
import "./Todo.css"
import axios from 'axios';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import KeyboardDoubleArrowLeftTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowLeftTwoTone';
const Todo = () => {

    const [todo,setTodo] = useState([]);
    const [checkAdd, setCheckAdd] = useState(false)
    const [page, setPAge] = useState(1)

    const togleCheck = () =>{
        setCheckAdd(!checkAdd)
    }

    const getTodo = () =>{
        fetch(`https://mighty-temple-00792.herokuapp.com/todo?_page=${page}&_limit=3`)
        .then( res =>  res.json() )
        .then( data => { 
            console.log("data",data);
            setTodo(data) 
            console.log("todo", todo);  
        })
       
    }
    useEffect( () => {
            getTodo()
            console.log("todo", todo);
    },[checkAdd, page])

    const deleteTodo = (id) =>{
        // axios.delete("http://localhost:3030/todo",{id : data})
        // .then( console.log("deleted") )

        fetch('https://mighty-temple-00792.herokuapp.com/todo/' + id, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then( getTodo )
    }

    return ( 
        <div className="Todo">
          <h1 className="title"> Todo...</h1>

          <TodoInput  togleCheck={togleCheck}  />

          <div className='container'> 

            { 
                todo.map( a => {
                return ( <div key={a.id} className='singleList'> 
                                <div>
                                    <strong className='red'>Title :</strong> {a.title} <br/>
                                    <strong className='green'>Description :</strong> {a.body} 
                                
                                </div>
                                <DeleteOutlineIcon 
                                className='cursiorPointer deleteBtn'  
                                color="primary" sx={{ fontSize: 28 }}
                                onClick={() => { deleteTodo(a.id);}}  />
                               
                        </div>)
            })}
            <button className='prev'  style={{ display: 'none' }}>Prev</button>

           <div className='btnBox'>
                      <Button  className='mr' variant="outlined" startIcon={<KeyboardDoubleArrowLeftTwoToneIcon />} 
                       disabled={page==1?true:false} 
                       sx={{ textTransform: 'uppercase' }}
                       
                      onClick={ () =>{
                             setPAge(page - 1)
                    }}>
                        Prev
                    </Button>
                    <Button  className='mr' variant="outlined" endIcon={<KeyboardDoubleArrowRightTwoToneIcon />}
                    disabled={ todo.length < 3?true:false} 
                    onClick={ () =>{
                         setPAge(page + 1)
                    }}>
                        Next
                    </Button>
           
           </div> 
            
          
          </div>

        
        </div>
             
        
        
        )
}

export default Todo;
