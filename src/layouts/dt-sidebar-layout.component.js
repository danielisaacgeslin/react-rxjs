import React, { Component } from 'react';

import { DTSidebar } from '../main-components';

export default class DTSidebarLayout extends Component {
    static path = 'dt-sidebar';

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={() => this.refs.sidebar.open()}>open</button>
                        <DTSidebar ref="sidebar">
                            <button onClick={() => this.refs.sidebar.close()}>close</button>
                            <p>Link 1</p>
                            <p>Link 2</p>
                            <p>Link 3</p>
                            <p>Link 4</p>
                            <p>Link 5</p>
                        </DTSidebar>
                    </div>
                </div>
            </div>
        );
    }
}
