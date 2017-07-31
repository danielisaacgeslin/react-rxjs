import React, { Component } from 'react';

import { ReactiveInput } from '../main-components';

export default class ReactiveInputLayout extends Component {
    static path = 'reactive-input';
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
                        <ReactiveInput
                            placeholder="type here"
                            value={this.state.value}
                            maxLength={null}
                            disabled={false}
                            counter={true}
                            onChange={value => this.onChange(value)}>
                        </ReactiveInput>
                    </div>
                </div>
            </div>
        );
    }
}
