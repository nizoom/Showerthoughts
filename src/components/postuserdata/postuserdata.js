import firebase from "firebase";

const database = firebase.database()

export function postUsername(username, email, password) {
    try {
        database.ref('users/' + username).set({
            email: email,
            password: password,
            username: username
        })

        console.log('data saved')
    } catch (error) {
        console.log(error)
    }

}

export function postNewThought(subject, body, user) {
    try {
        database.ref()
    } catch (error) {
        console.log(error)
    }
}