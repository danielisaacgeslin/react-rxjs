import React, { Component } from 'react';

import { DTCarrousel } from '../main-components';

export default class DTCarrouselLayout extends Component {
    static path = 'dt-carrousel';

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Plain</h3>
                        <DTCarrousel>
                            <p style={{ backgroundColor: 'red', height: '75px' }}></p>
                            <p style={{ backgroundColor: 'blue', height: '75px' }}></p>
                            <p style={{ backgroundColor: 'red', height: '75px' }}></p>
                            <p style={{ backgroundColor: 'blue', height: '75px' }}></p>
                        </DTCarrousel>
                    </div>
                    <div className="col-12">
                        <h3>Autoplay</h3>
                        <DTCarrousel autoplay={true}>
                            <p style={{ backgroundColor: 'red', height: '50px' }}></p>
                            <p style={{ backgroundColor: 'blue', height: '50px' }}></p>
                            <p style={{ backgroundColor: 'red', height: '50px' }}></p>
                            <p style={{ backgroundColor: 'blue', height: '50px' }}></p>
                        </DTCarrousel>
                    </div>
                </div>
            </div>
        );
    }
}
