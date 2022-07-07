import React, { Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';


class createAccount extends Component {
    render() {
        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />

                </div>
                <div className='app-body'>
                    <div className='body-wrapper'>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>



                            hiiiiiiiiiii
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createAccount;