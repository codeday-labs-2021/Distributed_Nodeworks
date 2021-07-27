import React, {Component} from 'react';
class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        console.log('works!')
        const data = {
            username: this.username,
            password: this.password,
            emailAddress: this.email
        }
        axios.post('http://localhost:5000/api/v1/register',data).then(
            res=>{
                console.log(res)
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
                    <form action="http://localhost:3000/" method="POST">
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="username"/>
                        <input type="text" id="password" className="fadeIn third" name="pass" placeholder="password"/>
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