import React, { Component } from 'react';
import { Subject } from 'rxjs';
import './dt-input.component.css';

/** @todo
 * textarea
 * validation status
 */

export default class DTInput extends Component {
    static defaultProps = {
        value: '',
        type: 'text',
        placeholder: '',
        debounceTime: 500,
        counter: false,
        maxLength: null,
        disabled: false,
        onChange: value => { }
    };
    state = {
        value: this.props.value
    };

    componentWillMount() {
        this.trigger$ = new Subject();
        this.change$ = this.trigger$
            .map(event => event.target.value)
            .do(value => this.setState({ value }))
            .debounceTime(this.props.debounceTime)
            .distinctUntilChanged()
            .do(value => this.props.onChange(this.state.value))
        this.subs = this.change$.subscribe();
    }

    componentWillUnmount() {
        this.subs.unsubscribe();
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    }

    onChange(event) {
        this.trigger$.next(event);
    }

    render() {
        const valueLength = this.state.value ? this.state.value.length : 0;
        const counter = this.props.maxLength ? Math.abs(valueLength - this.props.maxLength) : valueLength;
        return (
            <div className="dt-input">
                <input
                    className="form-control"
                    value={this.state.value}
                    disabled={this.props.disabled}
                    maxLength={this.props.maxLength}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    onChange={event => this.onChange(event)}
                />
                {this.props.counter && <div className="dt-input__counter">{counter}</div>}
            </div>
        );
    }
}
