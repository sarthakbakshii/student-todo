import React, { useState } from 'react';
import "./Todo.css"

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import axios from 'axios';
import { useEffect } from 'react';


function TodoInput({ togleCheck}) {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    const clearField = () =>{
        setInput1("");
        setInput2("")
    }

    const addTodo = (input1,input2) =>{
        let data = {title : input1, body : input2 , status : false};
        axios.post("http://localhost:3030/todo",data);
        togleCheck()
        // setTodo([...todo,data])
        // console.log(todo);
    }


  return (

            
                    <div className='InputBox'>
                                <input type="text" className='inputTitle' value={input1}
                                placeholder="Add Title..."
                                onChange={(e) => {
                                        setInput1(e.target.value)
                                    }}/>

                                <input type="text" className='inputBody' value={input2}
                                onChange={(e) => {
                                        setInput2(e.target.value)
                                    }}
                                placeholder="Add Task..." />

                                
                            
                                <Button className='addBtn' variant="contained"
                                    onClick={() => {
                                        addTodo(input1,input2)
                                        clearField();
                                    }}
                                endIcon={<SendIcon />}>
                                    Add
                                </Button>

                
                </div>
    
            
  )
  
 
}

export default TodoInput;
