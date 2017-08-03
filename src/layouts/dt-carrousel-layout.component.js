import React, { Component } from 'react';

import { DTCarrousel } from '../main-components';

export default class DTCarrouselLayout extends Component {
    static path = 'dt-carrousel';

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <DTCarrousel>
                            <p style={{ backgroundColor: 'red' }}>A</p>
                            <p style={{ backgroundColor: 'blue' }}>B</p>
                            <p style={{ backgroundColor: 'red' }}>C</p>
                            <p style={{ backgroundColor: 'blue' }}>D</p>
                        </DTCarrousel>
                    </div>
                </div>
            </div>
        );
    }
}
