import React, { Component } from 'react';
// import { Subject } from 'rxjs';
import './dt-sidebar.component.css';

export default class DTSidebar extends Component {
    static defaultProps = {
        isOpen: false,
        animationMS: 250,
        FPS: 60,
        backdrop: true
    };
    state = {
        isOpen: false,
        position: 0,
        openPercentage: 0
    };
    slideInterval = 0;


    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        const { isOpen } = this.props;
        this.setState({ isOpen });
    }

    componentDidMount() {
        const initialPosition = this.state.isOpen ? 0 : this.getWidth() * -1;
        this.setState({ position: initialPosition });
    }

    open() {
        this.setState({ isOpen: true });
        this.adjustSidebarPosition();
    }

    close() {
        this.setState({ isOpen: false });
        this.adjustSidebarPosition();
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
        this.adjustSidebarPosition();
    }

    getWidth() {
        return this.refs['sidebar-ct'] ? this.refs['sidebar-ct'].offsetWidth : 0;
    }

    clearSlideInterval() {
        clearInterval(this.slideInterval);
    }

    adjustSidebarPosition() {
        const targetWidth = this.getWidth() * -1;
        const tweeks = Math.abs(targetWidth) / (this.props.animationMS / (1000 / this.props.FPS));

        this.clearSlideInterval();
        let newOpenPercentage = 0;
        let finalPosition = null;

        this.slideInterval = setInterval(() => {
            if (this.state.isOpen === true && this.state.position >= 0) finalPosition = 0;
            if (this.state.isOpen === false && this.state.position <= targetWidth) finalPosition = targetWidth;
            if (finalPosition !== null) {
                newOpenPercentage = 100 - (Math.abs(finalPosition) * 100 / Math.abs(targetWidth));
                this.setState({ position: finalPosition, openPercentage: newOpenPercentage });
                this.clearSlideInterval();
                return;
            }
            let newPosition = this.state.isOpen ? this.state.position + tweeks : this.state.position - tweeks;
            newPosition = newPosition > 0 ? 0 : newPosition;
            newOpenPercentage = 100 - (Math.abs(newPosition) * 100 / Math.abs(targetWidth));
            this.setState({ position: newPosition, openPercentage: newOpenPercentage });
        }, 1000 / this.props.FPS);
    }

    render() {
        const { openPercentage, position } = this.state;
        return (
            <div className="dt-sidebar">
                <div
                    className="dt-sidebar__backdrop"
                    style={{ opacity: openPercentage * 0.01, display: openPercentage ? 'block' : 'none' }}>
                </div>
                <div
                    className="dt-sidebar__container"
                    ref="sidebar-ct"
                    style={{ left: `${position}px` }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
