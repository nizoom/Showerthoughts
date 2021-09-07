import firebase from "firebase";


const database = firebase.database();


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


export function postNewThought(subject, body, username, callback) {
    console.log("posting new messge")
    const postid = generateID()
    const postData = {
        title: subject,
        body: body,
        postid: postid
    }


    const newPostKey = firebase.database().ref(`users/${username}s`).child('posts').push().key;

    const updates = {};

    //this is to add the post to a news feed by saving the postkey to another collection in the db
    //for that purpose 

    //updates['/posts/' + newPostKey] = postData;  ^

    updates['/users/' + `/${username}/posts/${newPostKey}`] = postData;
    console.log(updates)

    //check to see if POST was succesful 
    return firebase.database().ref().update(updates, (error) => {
        if (error) {
            console.log(error.messge)
            callback(false, error.message)
        } else {
            callback(true)
        }
    });


    function generateID() {
        let r = (Math.random() + 1).toString(36).substring(7);
        console.log(r);
        return r;
    }
}

//get postkey 
export async function deletePost(postkey, username) {
    try {
        database.ref(`users/${username}/posts/${postkey}`).remove()

    } catch (error) {
        console.log(error.message)
    }
}


