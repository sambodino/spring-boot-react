import React, { useState, useEffect } from 'react';
import './App.css';

interface HelloWorldResult {
    content?: string;
    id?: string;
}

function App() {
    const [content, setContent] = useState<HelloWorldResult>({});

    useEffect(() => {
        async function fetchData() {
            const result = await fetch('/greeting');

            setContent(await result.json());
        }

        fetchData();
    }, []);

    return <div className="App">
        <p>{`${content.content}, ${content.id}`}</p>
    </div>
}

export default App;
