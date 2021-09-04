import firebase from "firebase";
// import { getDatabase, ref } from "firebase/firebase";



const database = firebase.database();
// const getDB = getDatabase();




export function postUsername(username, email, password) {
    try {
        database.ref('users/' + username).set({
            email: email,
            password: password,
            username: username,
            posts: ""
        })

        console.log('data saved')
    } catch (error) {
        console.log(error)
    }

}


export function postNewThought(subject, body, username) {
    console.log("posting new messge")
    const postid = generateID()
    const postData = {
        title: subject,
        body: body,
        postid: postid
    }

    try {

        const newPostKey = firebase.database().ref(`users/${username}s`).child('posts').push().key;

        const updates = {};

        //this is to add the post to a news feed by saving the postkey to another collection in the db
        //for that purpose 

        //updates['/posts/' + newPostKey] = postData;  ^

        updates['/users/' + `/${username}/posts/${newPostKey}`] = postData;
        console.log(updates)

        return firebase.database().ref().update(updates, (error) => {
            if (error) {
                console.log('failed to add post')
                console.log(error.messge)
            } else {
                console.log("Data saved successfully")
            }
        });
        //check to see if POST was succesful 



    } catch (error) {
        console.log('failed to add post')
        console.log(error.messge)
    }

    function generateID() {
        let r = (Math.random() + 1).toString(36).substring(7);
        console.log(r);
        return r;
    }
}



