import React, {Component} from 'react';

import './main.css';

class yes extends Component{

    render() {
        return(
            <div class= "areaMain">
                <ul class="circlesMain">
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
                <div class="DN">
                    <p class = "Title">Distributed Nodeworks</p>
                    <a class="docBtn" href="https://github.com/codeday-labs/Distributed_Nodeworks/wiki">Documentation</a>

                </div>

                {/* <img  class="image" scr="/src/images/Nodework.PNG" alt="nodeworks"></img> */}

                <div class="about">
                    <p class="about_title">About</p>
                    <div>
                        <p>Support the development of a distributed workflow 
                            (i.e., coordinated execution of multiple tasks
                             performed by different computers) by developing
                             a prototype task management server. This server
                             will accept a diverse range of workflows from an 
                             application like Nodeworks and manage a collection 
                             of task queues that are populated based on 
                             the workflow requirements. End points, or workers, running on 
                             distributed hardware will accept, execute, and publish results 
                             from the tasks back to the server so the next highest 
                             priority task in the workflow can be executed. </p>
                    </div>
                </div>
                <p class="Team_title">Meet the Team</p>
                <div className="Team">
                    <div class="names">
                        <div class="pic2">
                            <p>Airi Pham</p>
                            <img class="picture" src="./img/airi-modified.png"></img>
                            <div class="middle">
                                <div class="textMain">[Text Here]</div>
                            </div>
                        </div>
                        <div class="pic2">
                            <p>Derek In</p>
                            <img class="picture"src="./img/derek.png"></img>
                            <div class="middle">
                                <div class="textMain">[Text Here]</div>
                            </div>
                        </div>
                        <div class="pic2">
                            <p>Allyson Rivera</p>
                            <img class="picture" id = "Allyson" src="./img/allyson-modified.png"></img>
                            <div class="middle">
                                <div class="textMain">I am a software engineer student 
                                at Cal State Monterey Bay working to attain a 
                                bachelors degree in Computer Science.I enjoy sewing a baking 
                                on my free time.</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}


export default yes;