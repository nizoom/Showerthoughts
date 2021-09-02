import firebase from "firebase";

const database = firebase.database()

export function postUsername(username, email, password) {
    try {
        database.ref('users/' + username).set({
            email: email,
            password: password,
            username: username,
            posts: null
        })

        console.log('data saved')
    } catch (error) {
        console.log(error)
    }

}


export function postNewThought(subject, body, username) {
    try {
        console.log("posting new messge")
        var newKey = database.ref.push();
        database.ref().child(`${username}/posts/` + newKey)
            .update({ title: subject, body: body });

        // database.ref('users/' + `${username}/posts`).set({
        //     posts: { "subject": subject, "body": body }
        // })
    } catch (error) {
        console.log('failed to add post')
        console.log(error)
    }
}