import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

import Title from '../components/Title/Title'
import Navbar from '../components/Navbar/Navbar';

export class userPage extends Component {

    state = {
        isLoggedIn: false,
    }

    componentDidMount() {
        document.title = 'User Page'
    }

    render() {
        const UPDATE_USER = gql`
            mutation updateUser($userId: ID!, $name: String!, $email: String!, $password: String!, $profile_image: Upload, $profile: String){
                updateUser(userId: $userId, userInput: {name: $name, email: $email, password: $password, profile_image: $profile_image, profile: $profile}) {
                    _id
                    name
                }
            }
        `
        const GET_USERIMGS = gql`
            query {
                user {
                    profile_image
                }
            }
        `
        return (
            <div>
                <Title />
                <Navbar />
                <React.Fragment>
                    <Query query={GET_USERIMGS}>
                        {({ loading, error, data }: any) => {
                            if(loading) return 'loading...'
                            if(error) return `Error! ${error}`

                            let usrImg = data;

                            console.log(usrImg)

                            if(this.state.isLoggedIn) {  // If not logged in user cannot go to the user page in detail
                                return (
                                    <Mutation 
                                        mutation={UPDATE_USER}
                                        onCompleted={({ updateUser }: any) => {
                                            localStorage.setItem('userName', updateUser.name);
                                        }}
                                    >
                                        {(updateUser: any, { loading, error }: any) => {
                                            if(loading) return <p>Loading...</p>
                                            if(error) {
                                                const errorMessage = error.graphQLErrors.map(({ message }: any, number: any) => (
                                                    <span key={number}>{message}</span>
                                                ))
                                                return (
                                                    <div>
                                                        {errorMessage}
                                                    </div>
                                                )
                                            }

                                            let EMAIL: string;
                                            let PASSWORD: string;
                                            let PROFILE: string;
                                            let NAME: string;

                                            return (
                                                <div className="contentContainer">
                                                    <form className="form__control" onSubmit={e => {
                                                        e.preventDefault();
                                                        updateUser({ variables: { 
                                                            userId: localStorage.getItem('userId'),
                                                            name: NAME, 
                                                            email: EMAIL, 
                                                            password: PASSWORD, 
                                                            profile: PROFILE 
                                                        } });
                                                    }}>
                                                        <h1>Update User</h1>
                                                        <p>Change your account details.</p><br></br>
                                                        <input type="text" placeholder="email" ref={emailValue => { 
                                                            EMAIL = '';
                                                            if(emailValue !== null) {
                                                                EMAIL = emailValue.value;
                                                            } 
                                                        }}/><br/>
                                                        <input type="password" placeholder="password" ref={passwordValue => { 
                                                            PASSWORD = '';
                                                            if(passwordValue !== null) {
                                                                PASSWORD = passwordValue.value;
                                                            } 
                                                        }}/><br/>
                                                        <input type="text" placeholder="name" ref={nameValue => { 
                                                            NAME = '';
                                                            if(nameValue !== null) {
                                                                NAME = nameValue.value;
                                                            } 
                                                        }}/><br/>
                                                        <input type="text" placeholder="profile" ref={profileValue => { 
                                                            PROFILE = '';
                                                            if(profileValue !== null) {
                                                                PROFILE = profileValue.value;
                                                            } 
                                                        }}/><br/>
                                                        <button className="form__button" type="submit">Submit</button>
                                                    </form>
                                                </div>
                                            )
                                        }}
                                    </Mutation>
                                );
                            }
                            return (
                                <div className="contentContainer">
                                    <h1>You need to</h1> <Link href="/login"><a><h1>Login</h1></a></Link>
                                </div>
                            )
                        }}
                    </Query>
                </React.Fragment>
            </div>
        )
    }
}

export default userPage
