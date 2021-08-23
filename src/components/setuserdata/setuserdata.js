import firebase from "firebase";

const database = firebase.database()

export function setUsername(username) {

    database.ref('users/' + username).set({
        // email: email,
        // password: password,
        username: username
    })

    console.log('data saved')
}