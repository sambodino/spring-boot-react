import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    async function callBackend() {
        try {
            const response = await fetch('/greeting', {
                mode: "same-origin",
                redirect: "follow"
            });
            console.log(await response.json());
        } catch (e) {
            console.log('something went wrong; ', e);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <button onClick={callBackend}>Click me</button>
            </header>
        </div>
    );
}

export default App;
