import React from 'react';
import './App.css';
import {contributionsResponse} from './testData/contributions';
import {stsResponse} from './testData/sts';
import {Auth} from "./Auth";

export interface Integrator {
    id: string;
    name: string;
    clientId: string;
    scopes: string;
    issuer: string;
    callbackUri: string;
}

function App() {
    function fetchContributions() {
        return contributionsResponse;
    }

    function fetchSTSIntegrators(id: string): Integrator | undefined {
        return stsResponse.integrators.find(i => i.id === id);
    }

    function fetchConnections() {
        return fetchContributions().contributions
            .map(c => {
                const integrator = fetchSTSIntegrators(c.integratorId);
                return integrator ? <Auth key={integrator.id} integrator={integrator} /> : null;
            });
    }

    return <div className="App">
        <>{fetchConnections()}</>
    </div>
}

export default App;
