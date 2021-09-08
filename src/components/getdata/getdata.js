import firebase from "firebase";
const db = firebase.database()


export async function getFeed(callback) {
    const usersRef = db.ref("users")

    await usersRef.on('value', (snapshot) => {
        const users = snapshot.val()

        const arrOfUsers = Object.entries(users)

        //get all users who have posted 
        const getPosters = arrOfUsers.filter(checkForPosts)

        //get actual post objects
        let postsFromPosters = []

        getPosters.forEach(user => {
            const postObj = user[1].posts
            formatPosts(postObj)
        })

        //sort postsFromPosters by recency
        postsFromPosters.sort(function (post1, post2) {
            //console.log(post2.postData.timestamp)
            return post2.postData.timestamp - post1.postData.timestamp
        })


        // console.log(postsFromPosters);

        function formatPosts(postObj) {
            //same format as profile page posts
            for (const [postKey, postData] of Object.entries(postObj)) {
                //console.log(`${postKey}: ${JSON.stringify(postData)}`);
                postsFromPosters.push({ postData, postKey })
            }

        }

        callback(postsFromPosters);
        //may want to have a limit of 50-100 posts 
        // if time stamp is less than ___ filter out bc it is too old

    })



    function checkForPosts(user) {
        if (user[1].hasOwnProperty("posts")) {
            // if the posts object is not the default empty str then there are posts to return  
            if (user[1].posts !== "") {
                return user[1].posts;
            }
        }
    }
}

