import React, { Component } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        
        return (
            <div>
                <AdminLayout>
                    <Component route={route} />
                </AdminLayout>
            </div>
        );
    }
}

export default index;