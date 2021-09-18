import React, { useContext, useState } from "react";
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { AuthContext } from "../context/AuthProvider";
const SingUp = (props) => {
  let [fname, setFName] = useState("");
  let [lname, setLName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCPassword] = useState("");
  let [profileImage, setProfileImage] = useState(null);

  let [message, setMessage] = useState("");

  let { signUp } = useContext(AuthContext);
  let handleImageUpload = (e) => {
    let photoObject = e.target.files[0];
    setProfileImage(photoObject);
  };

  let handleSignUp = async () => {
    try {
      let response = await signUp(email, password);
      let uid = response.user.uid;

      // get the profilePhoto url

      let uploadedPhotoObject = firebaseStorage
        .ref(`/profileImages/${uid}/image.jpg`)
        .put(profileImage);
      uploadedPhotoObject.on("state-changed", fun1, fun2, fun3);

      // to track the progress of the image upload
      function fun1(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }

      // it indicated an error(if any)
      function fun2(error) {
        console.log(error);
      }

      // it indicates the success of the upload
      async function fun3() {
        let profileImageUrl =
          await uploadedPhotoObject.snapshot.ref.getDownloadURL();

        // now , store the user details in firebase DB
        firebaseDB.collection("Users").doc(uid).set({
          firstName: fname,
          lastName: lname,
          email: email,
          username: username,
          profileImageUrl: profileImageUrl,
          postsCreated: [],
        });
        props.history.push("/");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <>
      <h1>SingUp component !! </h1>
      <div className="signup-box">
        <div className="first-name">
          First Name
          <input
            type="text"
            value={fname}
            onChange={(e) => {
              setFName(e.target.value);
            }}
            placeholder="First Name"
          />
        </div>
        <div className="last-name">
          Last Name
          <input
            type="text"
            value={lname}
            onChange={(e) => {
              setLName(e.target.value);
            }}
            placeholder="Last Name"
          />
        </div>
        <div className="username">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="User name"
          />
        </div>
        <div className="email">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </div>
        <div className="password">
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
          />
        </div>
        <div className="cpassword">
          Confirm Password
          <input
            type="text"
            value={cpassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            placeholder="Confirm Password"
          />
        </div>
        <div className="profile-photo">
          Upload Profile Photo
          <input type="file" onChange={handleImageUpload} />
        </div>
        <button onClick={handleSignUp}> Sign Up </button>
        <h1>{message}</h1>
      </div>
    </>
  );
};

export default SingUp;
