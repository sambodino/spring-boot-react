import React from 'react';
import {Connection} from './Connection';
import {Integrator} from "./App";

export interface AuthState {
    code: string | null;
    connected: boolean;
}

export interface AuthProps {
    integrator: Integrator;
}

const match = window.location.href.match(/\?code=(.*)/);

export class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props) {
        super(props);
        this.state = {
            code: match && match[1],
            connected: false,
        };
    }

    componentDidMount() {
        try {
            if (this.state.code != null) {
                this.exchangeCodeForToken();
            } else {
                fetch(`/foreignAccessToken/${123}`, {
                    mode: "same-origin",
                    redirect: "follow"
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data) {
                            this.setState({connected: true});
                        }
                    });
            }
        } catch (e) {
            console.log('something went wrong; ', e);
        }
    }

    private exchangeCodeForToken = async () => {
        await fetch('/token?code=' + this.state.code, {
            mode: "same-origin",
            redirect: "follow"
        });
        this.setState({connected: true});
    };

    private getCode = async () => {
        const {issuer, clientId, scopes, callbackUri} = this.props.integrator;
        window.location.href = `${issuer}?` +
            `client_id=${clientId}&` +
            `response_type=code&` +
            `scope=${scopes}&` +
            `redirect_uri=${callbackUri}`;
    };

    render() {
        const integrator = this.props.integrator;
        return (
            <div>
                {!this.state.connected ? <button onClick={this.getCode}>Login to {integrator.name}</button> : <Connection name={integrator.name} route={"gmail"}/>}
            </div>
        );
    }
}
