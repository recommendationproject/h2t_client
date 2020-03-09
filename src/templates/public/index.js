import React, { Component } from 'react';
import PublicLayout from '../../layouts/Main';

class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        let layout = this.props.layout;
        console.log(layout);
        
        return (
            <div>
                <PublicLayout>
                    <Component route={route} />
                </PublicLayout>
            </div>
        );
    }
}

export default index;