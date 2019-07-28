import React, { Component } from 'react'
import Link from 'next/link'
import { Mutation, ApolloConsumer } from 'react-apollo'
import gql from 'graphql-tag'

import './pageStyle.css'

import Navbar from '../components/Navbar/Navbar';

class login extends Component {

    componentDidMount() {
        document.title = "login"
    }

    render() {
        const LOGIN_USER = gql`
            mutation login($email: String!, $password: String!){
                login(loginInput: {email: $email, password: $password}){
                    userId
                    token
                    tokenExpiration
                }
            }
        `

        return (
            <div>
                <div className="title">
                        <Link href="/"><a>Title</a></Link>
                        <div className="button__bundle">
                            <Link href="/login">
                                <button className="title__login">
                                    <a>Login</a>
                                </button>
                            </Link>
                            <Link href="/register">
                                <button className="title__register">
                                    <a>Sign Up</a>
                                </button>
                            </Link>
                        </div>
                    </div>
                <Navbar />
                <div className="contentContainer">
                    <ApolloConsumer>
                        {client => (
                            <Mutation
                                mutation={LOGIN_USER}
                                onCompleted={({ login }) => {
                                    localStorage.setItem('token', login);
                                    client.writeData({ data: { isLoggedIn: true } });
                                }}
                            >
                                {(login, { loading, error }) => {
                                    if(loading) return <p>Loading...</p>
                                    if(error) return <p>Error is occured!</p>

                                    return (
                                        <form action="" className="form__control">
                                            <h1>Login page</h1>
                                            <input type="text" placeholder="type your ID"/>
                                            <input type="text" placeholder="type your Password"/>
                                            <button className="form__button"></button>
                                        </form>
                                    )
                                }}
                            </Mutation>
                        )}
                    </ApolloConsumer>
                </div>
            </div>
        )
    }
}

export default login