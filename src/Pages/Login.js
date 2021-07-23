import React, {Component} from 'react';
class Login extends Component{

    render() {
        return(
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    {/* <!-- Tabs Titles -->

                    <!-- Icon --> */}
                    <div class="fadeIn first">
                        <img src='./img/stephencurryCircle.png' id="icon" alt="User Icon" />
                    </div>
                    {/* <!-- Login Form --> */}
                    <form action="http://localhost:3000/" method="POST">
                        <input type="text" id="login" class="fadeIn second" name="login" placeholder="username"/>
                        <input type="text" id="password" class="fadeIn third" name="pass" placeholder="password"/>
                        <input  type="submit" class="fadeIn fourth" value="Log In"/>
                    </form>

                    {/* <!-- Remind Passowrd --> */}
                    <div id="formFooter">
                        <a class="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;