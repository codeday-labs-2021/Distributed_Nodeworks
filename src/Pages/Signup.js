import React from 'react';

const signup = () =>{
    return(
        <div class="wrapper fadeInDown">
            <div id="formContent">
                {/* <!-- Tabs Titles -->

                <!-- Icon --> */}
                <div class="fadeIn first">
                    <img src='./img/stephencurryCircle.png' id="icon" alt="User Icon" />
                </div>
                {/* <!-- Login Form --> */}
                <form>
                    <input type="text" id="login" class="fadeIn second" name="login" placeholder="username"/>
                    <input type="text" id="password" class="fadeIn third" name="login" placeholder="password"/>
                    <input type="text" id="password2" class="fadeIn third" name="login" placeholder="retype password"/>
                    <input type="submit" class="fadeIn fourth" value="Register"/>
                </form>

                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter">
                    <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
        </div>
    );
};
export default signup;