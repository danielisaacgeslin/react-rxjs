import React, { Component } from 'react';
// import { Subject } from 'rxjs';
import './dt-carrousel.component.css';

export default class DTCarrousel extends Component {
    static defaultProps = {
        position: 0,
        slides: [],
        animationMS: 350,
        FPS: 60
    };
    state = {
        position: this.props.position,
        slides: this.props.slides
    };

    constructor(props) {
        super(props);
        this.changePosition = this.changePosition.bind(this);
        this.goForward = this.goForward.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    /**
     * 
     * @param {number} newPosition 
     */
    changePosition(newPosition) {
        const forward = newPosition - this.state.position > 0;
        const tweeks = this.props.animationMS / (1000 / this.props.FPS);
        const difference =
            forward 
            ? (newPosition - this.state.position) / tweeks
            : (this.state.position - newPosition) / tweeks

        const interval = setInterval(() => {
            let newPositionTweek = this.state.position + (forward ? difference : difference * - 1);
            newPositionTweek = Number(newPositionTweek.toFixed(2));
            if (
                (forward && this.state.position >= newPosition)
                ||
                (!forward && this.state.position <= newPosition)
            ) {
                this.setState({ position: newPosition });
                clearInterval(interval);
            } else this.setState({ position: newPositionTweek });
        }, 1000 / this.props.FPS);
    }

    goForward() {
        const newPosition = this.state.position + 1;
        if (newPosition < this.state.slides.length) this.changePosition(newPosition);
        else this.changePosition(0);
    }

    goBack() {
        if (this.state.position) this.changePosition(this.state.position - 1);
        else this.changePosition(this.state.slides.length - 1);
    }

    componentWillMount() {
        this.setState({ slides: this.props.children });
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(props) {
        this.setState({ slides: this.props.children });
    }

    render() {
        const slides = this.state.slides.map((slide, index) => {
            return (
                <div
                    key={index}
                    style={{ left: `${(index - this.state.position) * 100}%` }}
                    className="dt-carrousel-slides-container__slide">
                    {slide}
                </div>
            );
        });
        return (
            <div className="dt-carrousel">
                <p><strong>position: </strong>{this.state.position}</p>
                <button onClick={this.goBack}>Back</button>
                <button onClick={this.goForward}>Forward</button>
                <div className="dt-carrousel-slides-container">{slides}</div>
            </div>
        );
    }
}
