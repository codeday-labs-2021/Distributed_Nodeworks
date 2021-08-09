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
        window.location = "/";
    }
    workflowFiles(content, name, fileID, owner,data){
        console.log(data);
        const displayID = (content)=>{
            console.log("CONTENT " +content);
            let test = JSON.stringify(eval('('+content+')'));
            console.log("HELP " + test);
            sessionStorage.setItem("content",test);
            window.location = "/";
        }
        return <div>
            <ul class = "workflowUnorderList">
                {data.map((item)=>
                <li class = "workflowList" id = {item.file_id} onClick={() => displayID(item.content)}>
                    <h5 class = "workflowName" id = {item.file_id}>{item.name} </h5>
                    {/* <button class ="workflowBtn">
                        Open
                    </button> */}
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
        return (
            <div class="workflow">
                <h4>WORKFLOWS</h4>

                <button class = "create" onClick ={() => this.createWork()}> 
                    Create Workflow
                </button>

                <div>
                    {this.state.workflow}
                </div>
            </div>
            
            
        );
    }
};
export default workflow;