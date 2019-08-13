import React from "react";

interface ConnectionProps {
    route: string;
    name: string;
}

interface ConnectionState {
    data: any;
}

export class Connection extends React.Component<ConnectionProps, ConnectionState> {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    private getGmailProfile = async () => {
        try {
            fetch(`/${this.props.route}`, {
                mode: "same-origin",
                redirect: "follow"
            })
                .then(r => r.json())
                .then(data => this.setState({data}));
        } catch (e) {
            console.log('something went wrong; ', e);
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.getGmailProfile}>Connect {this.props.name}</button>
                {this.state.data ? JSON.stringify(this.state.data) : null}
            </div>);
    }
}
