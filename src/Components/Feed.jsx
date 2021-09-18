import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Button } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { firebaseDB, firebaseStorage } from "../config/firebase";

import {v4 as uuid} from 'uuid'  ; 

const Feed = (props) => {
  let { signOut } = useContext(AuthContext);
  let [videoFile, setVideoFile] = useState(null);
  let { currentUser } = useContext(AuthContext);

  let handleInputFile = (e) => {
    let videoFileObject = e.target.files[0];
    setVideoFile(videoFileObject);
  };

  let handleUploadFile = async () => {
    try {
      let uid = currentUser.uid;
      let uploadedVideoObject = firebaseStorage
        .ref(`/profileImages/${uid}/${Date.now()}.mp4`)
        .put(videoFile);
      uploadedVideoObject.on("state_changed", fun1, fun2, fun3);

      function fun1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }

      function fun2(err) {
        console.log(err);
      }

      async function fun3() {
        // get the video url 
        let videoUrl = await uploadedVideoObject.snapshot.ref.getDownloadURL();

        let pid = uuid() ; 
        // create a post document for the video 
        await firebaseDB.collection("Posts").doc(pid).set({
          pid : pid , 
          uid : uid , 
          comments : [] , 
          likes : [] , 
          caption : "" , 
          videoUrl : videoUrl
        })

        // update the postsCreated in 'users' collection 

        let doc = await firebaseDB.collection("Users").doc(uid).get(); 
        let document = doc.data() ; 
        console.log(document) ; 
        document.postsCreated.push(pid) ; 
        await firebaseDB.collection("Users").doc(uid).set(document)  ;  
      }
    } catch (err) {
      console.log(err);
    }
  };

  let handleOnClick = async () => {
    try {
      await signOut();
      props.history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>Feed component !! </h1>
      <button onClick={handleOnClick}>Logout </button>

      <div className="video-upload">
        <input type="file" onChange={handleInputFile} />
        <label>
          <Button
            onClick={handleUploadFile}
            variant="contained"
            startIcon={<MovieIcon></MovieIcon>}
            color="secondary"
          >
            Upload
          </Button>
        </label>
      </div>
    </>
  );
};

export default Feed;
