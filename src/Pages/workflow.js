import React, {Component} from 'react';
import axios from 'axios';
const workflow = () => {
    const getWorkflows=()=>{
        axios.get('http://localhost:5000/api/v1/workflow/getOwner/'+localStorage.getItem('username')).then(
        res=>{
            console.log(res['data'].length)
        }
        ).catch(
        err =>{
            console.log(err);
        }
        )
    }
    getWorkflows()
    return (
        <div className="dndflow">
          
        </div>
      );
};
export default workflow;