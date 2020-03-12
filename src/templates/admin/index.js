import React, { Component } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Minimal from '../../layouts/Minimal';
class index extends Component {
    render() {
        let Component = this.props.component;        
        let route = this.props.route;
        let layout = this.props.layout;
        return (
            <div>
                {layout==='Minimal' ? (
                <Minimal>
                    <Component route={route} />
                </Minimal>
              ) : (
                <AdminLayout>
                    <Component route={route} />
                </AdminLayout>
              )}
            </div>
        );
    }
}

export default index;