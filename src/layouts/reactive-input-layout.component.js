import React, { Component } from 'react';

import { ReactiveInput } from '../main-components';

export default class ReactiveInputLayout extends Component {
    static path = 'reactive-input';

    constructor(props) {
        super(props);
        this.state = { value: 'pre-existing value' };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Reactive Input</h1>
                        <p><strong>resulting value:</strong> {this.state.value}</p>
                        <ReactiveInput
                            placeholder="type here"
                            value={this.state.value}
                            onChange={value => this.setState({ value })}>
                        </ReactiveInput>
                    </div>
                </div>
            </div>
        );
    }
}
