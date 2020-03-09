import React, { Component } from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import PublicLayout from '../../layouts/PublicLayout';
class index extends Component {
    render() {
        let Component = this.props.component;
        let route = this.props.route;
        let layout = this.props.layout;
        console.log(layout);

        return (
            <div>
                {layout === 'HomeLayout' ? (
                   <HomeLayout>
                   <Component route={route} />
               </HomeLayout>
                ) : (
                    <PublicLayout>
                    <Component route={route} />
                </PublicLayout>
                    )}

            </div>
        );
    }
}

export default index;