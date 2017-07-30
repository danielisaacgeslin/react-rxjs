import React, { Component } from 'react';
import { Subject } from 'rxjs';
import './reactive-input.component.css';

/** @todo
 * change name
 * max and min length
 * disabled
 * loading ?
 * textarea
 * counter for resting length
 */

export default class ReactiveInput extends Component {
    static defaultProps = {
        value: '',
        type: 'text',
        placeholder: '',
        debounceTime: 500,
        counter: false,
        onChange: value => { }
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        };
    }

    componentWillMount() {
        this.trigger$ = new Subject();
        this.change$ = this.trigger$
            .map(event => event.target.value)
            .do(value => this.setState({ value }))
            .debounceTime(this.props.debounceTime)
            .distinctUntilChanged()
            .do(value => this.props.onChange(this.state.value))
            .do(() => this.setState({ value: this.props.value }));
        this.subs = this.change$.subscribe();
    }

    componentWillUnmount() {
        this.subs.unsubscribe();
    }

    onChange(event) {
        this.trigger$.next(event);
    }

    render() {
        return (
            <div className="reactive-input">
                <input
                    className="form-control"
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    onChange={event => this.onChange(event)}
                />
                {
                    this.props.counter &&
                    <div className="reactive-input__counter">
                        {this.state.value ? this.state.value.length : 0}
                    </div>
                }
            </div>
        );
    }
}
