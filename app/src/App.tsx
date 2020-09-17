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
                <p>I work so hard.</p>
            </Collapsible>
            <a href='https://www.linkedin.com/in/sknepper/'>https://www.linkedin.com/in/sknepper/</a>
        </div>
        <SpotifyCard />
    </div>);
}

export default App;
