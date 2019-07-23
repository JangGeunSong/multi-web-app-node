import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Link from 'next/link'

import './index.css';

import Navbar from '../components/Navbar/Navbar';
import Articles from '../components/Articles/Articles';

class index extends Component {
    render() {
        return (
            <div className="home">
                    <div className="title">
                        <Link href="/">Title</Link>
                    </div>
                    <Navbar />
                    <React.Fragment>
                        <div className="contentContainer">
                            <Articles />   
                        </div>
                    </React.Fragment>
                </div>
        )
    }
}

export default withRouter(index);