import React, { Component } from 'react';
// import { Subject } from 'rxjs';
import './dt-carrousel.component.css';

export default class DTCarrousel extends Component {
    static defaultProps = {
        position: 0,
        slides: [],
        animationMS: 350,
        FPS: 60,
        autoplay: false,
        autoplayTimer: 5000
    };
    state = {
        position: this.props.position,
        slides: this.props.slides
    };
    autoplayInterval = 0;
    maxHeight = 0;
    controlHeight = 30;

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
        clearInterval(this.autoplayInterval);
    }

    componentDidMount() {
        this.adjustSliderHeight();
    }

    componentWillReceiveProps(props) {
        this.setState({ slides: this.props.children });
    }

    handleAutoplay() {
        clearInterval(this.autoplayInterval);
        if (!this.props.autoplay) return;
        this.autoplayInterval = setInterval(() => {
            this.goForward();
        }, this.props.autoplayTimer);
    }

    adjustSliderHeight() {
        let maxHeight = 0;
        for (let ref in this.refs) {
            if (!/^slide-/.test(ref)) continue;
            let height = this.refs[ref].offsetHeight;
            maxHeight = height > maxHeight ? height : maxHeight;
        }
        if (maxHeight !== this.state.maxHeight) this.setState({ maxHeight });
    }

    render() {
        this.handleAutoplay();
        setTimeout(() => this.adjustSliderHeight(), 0);

        const isChanging = this.state.position % 1 !== 0;
        const controlTop = (this.state.maxHeight / 2) - (this.controlHeight / 2);
        const slides = this.state.slides.map((slide, index) => (
            <div
                key={index}
                ref={`slide-${index}`}
                style={{ left: `${(index - this.state.position) * 100}%` }}
                className="dt-carrousel-slides-container__slide">
                {slide}
            </div>
        ));

        return (
            <div className="dt-carrousel">
                <button
                    className="dt-carrousel__control dt-carrousel__control_left"
                    disabled={isChanging}
                    style={{ height: this.controlHeight, top: `${controlTop}px` }}
                    onClick={this.goBack}>
                    L
                </button>
                <button
                    className="dt-carrousel__control dt-carrousel__control_right"
                    disabled={isChanging}
                    style={{ height: this.controlHeight, top: `${controlTop}px` }}
                    onClick={this.goForward}>
                    R
                </button>
                <div
                    className="dt-carrousel-slides-container"
                    style={{ height: `${this.state.maxHeight}px` }}>
                    {slides}
                </div>
            </div>
        );
    }
}
