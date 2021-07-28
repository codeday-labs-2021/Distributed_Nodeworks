import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        console.log('works!')
        const data = {
            username: this.username,
            password: this.password,
            emailAddress: this.email
        }
        axios.post('http://localhost:5000/api/v1/login',data).then(
            res=>{
                localStorage.setItem('token',res['data']['user_key']);
                localStorage.setItem('username',res['data']['username'])
                // if(res['status'] == 200){
                //     this.setState({ redirect: "/home" });
                // }
                console.log(res['data']['user_key'])
            }
        ).catch(
            err =>{
                console.log(err);
            }
        )
        // console.log(data)
    }
    render() {
        return(
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    {/* <!-- Tabs Titles -->

                    <!-- Icon --> */}
                    <div className="fadeIn first">
                        <img src='./img/stephencurryCircle.png' id="icon" alt="User Icon" />
                    </div>
                    {/* <!-- Login Form --> */}
                    <form onSubmit={this.handleSubmit} method="POST">
                    <input type="text" id="login" className="fadeIn second" name="email" placeholder="Email" onChange= {e=> this.email = e.target.value}/>
                        <input type="text" id="login" className="fadeIn second" name="username" placeholder="username" onChange= {e=> this.username = e.target.value}/>
                        <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange= {e=> this.password = e.target.value}/>
                        <input  type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>

                    {/* <!-- Remind Passowrd --> */}
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;