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
            //console.log(user)
            const postObj = user[1].posts
            formatPosts(postObj)

            //postObj.forEach(post => postsFromPosters.push(post))
        })

        console.log(postsFromPosters);

        //order by recency

        // postsFromPosters.sort(function (post1, post2) {
        //     return post2.timestamp - post1.timestamp;
        // })

        // console.log(postsFromPosters);
        //sort postsFromPosters by recency

        callback(postsFromPosters);

        function formatPosts(postObj) {
            console.log(postObj)
            for (const [postKey, postData] of Object.entries(postObj)) {
                //console.log(`${postKey}: ${JSON.stringify(postData)}`);
                postsFromPosters.push({ postData, postKey })
                //allPostsArr.push({ postData, postKey })
            }


        }

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

