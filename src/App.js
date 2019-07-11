import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

firebase.initializeApp({
  apiKey: "AIzaSyACMmtTos8CBls03uYsnOxUfP3jYFqSML0",
  authDomain: "firefly-firebase-test.firebaseapp.com"
})

class App extends Component{
  constructor(props){
    super();
    this.state={
      signedIn: false
    }
  }

  

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ signedIn: !!user })
      console.log("user", user)
    })
  }

render(){
 return (
    <div className="App">
      {this.state.signedIn ? <div>Signed In!<button onClick={this.signOut}>Sign Out</button></div> : <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />}
    </div>
  );
}

}
export default App;
