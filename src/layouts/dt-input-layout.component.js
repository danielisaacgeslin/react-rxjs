import React, { Component } from 'react';

import { DTInput } from '../main-components';

export default class DTInputLayout extends Component {
    static path = 'dt-input';
    state = {
        value: ''
    }
    counter = 0;

    onChange(value) {
        this.counter++;
        this.setState({ value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p><strong>The value is: </strong>{this.state.value}.</p>
                        <p><strong>The value was changed: </strong>{this.counter} times.</p>
                        <DTInput
                            placeholder="type here"
                            value={this.state.value}
                            maxLength={null}
                            disabled={false}
                            counter={true}
                            onChange={value => this.onChange(value)}>
                        </DTInput>
                    </div>
                </div>
            </div>
        );
    }
}
