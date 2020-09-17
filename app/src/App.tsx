import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import './App.css';
import SpotifyCard from './spotify/SpotifyCard';
import Collapsible from './work-experience/Collapsible';

const App = () => {
    return (<div className="App">
        <div className='about-me'>
            <h1>Samuel R. Knepper</h1>
            <h3>Software Developer</h3>
            <h4>University of Iowa, Computer Science</h4>
            <Collapsible text={<h5 className='collapsible-text'>John Deere, Intelligent Solutions Group</h5>}>
                <div>
                    <i>June 2017 - present</i>
                    <h6>Acquired Skills</h6>
                    <ul>
                        <p>REST APIs, GraphQL, OAuth 2.0, AWS Cloud Infrastructure (infrastructure as code), Java, Scala, ReactJS, Redux & React Hooks, NodeJS, SQL, deploy pipelines</p>
                    </ul>

                    <h6>Key Projects</h6>
                    <ul>
                        <li>App Store</li>
                        <p>John Deere's platform connects with ~200 agriculture software-companies to enhance the user's productivity in their organization.</p>
                        <p>To promote these software companies' solutions and allow the user to manage their data across systems, we have built a John Deere "app store."</p>
                        <p>The solution uses OAuth 2.0 practices to transparently share a user's data under their consent to and from John Deere's platform.</p>
                        
                        <li>Competitor Data Sharing</li>
                        <p>I helped write an API and data processing contract between three large equipment manufacturers.</p>
                        <p>This asynchronous, event triggered API allows equipment data (gps, speed, fuel, etc.) from other equipment manufacturers to be pushed into the John Deere platform.</p>
                        <p>Users are then able to manage all of their equipment in one, centralized place.</p>
                        <p>Our team was recognized for an award for company collaboration at the world’s largest agriculture trade show in Germany, Agritechnica.</p>

                        <li>Equipment Notifications</li>
                        <p>I’ve built a full-stack software solution to process alerts sent from construction & agriculture equipment to be made into notifications that are then sent to customers.</p>
                        <p>This solution processes 5000-10,000 notifications a second leveraging AWS Kinesis streams and asynchronous processing.</p>
                        <p>The web/mobile app gives users the ability to manage these notifications.</p>
                        <p>These notifications are critical to the maintenance and safety of equipment.</p>
                    </ul>
                </div>
            </Collapsible>
            <a href='https://www.linkedin.com/in/sknepper/'>https://www.linkedin.com/in/sknepper/</a>
        </div>
        <SpotifyCard />
    </div>);
}

export default App;
