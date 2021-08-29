import React, {Component} from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import './workflow.css';
import { Redirect } from 'react-router-dom';
import mount from './home'
import DnDFlow from './home';
class workflow extends Component{
    state = {}
    createWork(){
        sessionStorage.setItem("content",null);
        sessionStorage.setItem("contentName",null);
        sessionStorage.setItem("content-length",null)
        window.location = "/Home/";
    }
    workflowFiles(content, name, fileID, owner,data){
        // console.log(data);
        const displayID = (content,name)=>{
            // console.log("CONTENT " +content);
            let nodes = JSON.stringify(eval('('+content+')'));
            let newname = name;
            const numOfNodes=JSON.parse(nodes)
            sessionStorage.setItem("content",nodes);
            sessionStorage.setItem("contentName",newname);
            sessionStorage.setItem("content-length",Object.keys(numOfNodes).length)
            window.location = "/Home/";
        }
        const deleteWorkFlow=(file_id)=>{
            axios.get('http://localhost:5000/api/v1/workflow/delete/'+file_id).then(
            res=>{
                console.log(res)
            }
            ).catch(
            err =>{
                console.log(err);
            }
            )
            window.location.reload();
        }
        return <div class = "LIST">
            <ul class = "workflowUnorderList">
                {data.map((item)=>
                <li class = "workflowList" id = {item.file_id}>
                    <div class = "workflowName" onClick={() => displayID(item.content,item.name)}>
                        <h5 class = "Name" id = {item.file_id} >{item.name} </h5>
                    </div>
                    <button class="delete" onClick={() => deleteWorkFlow(item.file_id)}><span class='text'>Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></button>
                </li>)}
            </ul>
        </div>
    }
    getWorkflow = () => {
        axios.get('http://localhost:5000/api/v1/workflow/getOwner/'+sessionStorage.getItem('username')).then(
            res=>{
                const data = res['data']
                // console.log(res['data'])
                const content = res['data'][0]['content'];
                const name = res['data'][0]['name']
                const fileID = res['data'][0]['id']
                const owner = res['data'][0]['owner']
                const json = JSON.parse(JSON.stringify(content))
                this.setState({
                    workflow: this.workflowFiles(1,name,1,1,data)
                })
                // const test = JSON.parse(JSON.stringify(eval('('+content+')')))
                // console.log(test)
            
            }
            ).catch(
            err =>{
                console.log(err);
            }
            )
    }
    componentDidMount= () =>{
        this.getWorkflow()
    }
    render(){
        if(sessionStorage.getItem('username')==null){
            window.location = "/login";
        }
        return (
            <div class="area">
                <h4 class="Title">WORKFLOWS</h4>
                <div class="workflow">
                    

                    <a class="create" href="javascript:void(0);" onClick ={() => this.createWork()}>Create Workflow</a>

                    <div>
                        {this.state.workflow}
                    </div>
                </div>
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            
            
        );
    }
};
export default workflow;