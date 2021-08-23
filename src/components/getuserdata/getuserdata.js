import firebase from "firebase";

const database = firebase.database()

export function getUserInfo(email) {

    const userRef = database.ref('users/' + "");
    userRef.on('value', function (snapshot) {
        const userInfo = snapshot.val()

        alert(userInfo.username)
    })
}