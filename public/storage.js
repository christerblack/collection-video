import {getDownloadURL, getStorage, ref} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {app} from "/firebaseConfig.js";

const auth = getAuth(app);
const user = auth.currentUser;

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export function readFirebaseStorage() {
    //if (auth.currentUser.uid) {
// Create a storage reference from our storage service
    getDownloadURL(ref(storage, "/1_1.mp4"))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = function (event) {
                const blob = xhr.response;
                console.log(blob);
            };
            xhr.open("GET", url);

            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(null);

            // Or inserted into an <img> element
            const video = document.getElementById("video1");

            video.setAttribute("src", url);
        })
        .catch((error) => {
           // console.log(error);
        });
  //  }
}

