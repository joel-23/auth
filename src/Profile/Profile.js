import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import ReactCrop from "react-image-crop";

import styles from "./style_profile.module.css";
import "react-image-crop/dist/ReactCrop.css";

import firebase from "firebase";
// import "firebase/firestore";
import firebaseConfig from "../firebaseConfig";
// firebase.initializeApp(firebaseConfig);
var otherProject = firebase.initializeApp(firebaseConfig, "other");
var db = otherProject.firestore();

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentUser: null,
      userDetails: {},
      crop: {
        unit: "px", // default, can be 'px' or '%'
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        aspect: 1
      }
    };
    console.log("hasdbhb");
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
    // console.log(crop);
  };
  onCropComplete = crop => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl: croppedImageUrl }, () => {
        console.log("crop img url", this.state.croppedImageUrl);
      });
    }
  };
  getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader();
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, "cropped.jpg");
      };
    });
  };
  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage });
  }
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  };
  handleInputChange = event => {
    var data = {};
    data = {
      ...this.state.userDetails,
      [event.target.name]: event.target.value
    };
    this.setState({ userDetails: data });
    // console.log(this.state.userDetails);
  };
  handleFile = e => {
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = event => {
      var temp = {};
      temp = { ...this.state.userDetails, photoURL: event.target.result };
      this.setState({ userDetails: temp });
      console.log("in file", this.state.userDetails);
    };
    reader.onerror = function(event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("user details", this.state.userDetails);
    db.collection("auth-users")
      .doc(this.state.userDetails.email)
      .set(this.state.userDetails)
      .then(docRef => {
        console.log("Document successfully written");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var temp = {};
        // var currentUser = firebase.auth().currentUser;
        this.setState({ currentUser: user }, () => {
          console.log("user", this.state.currentUser);
          console.log("email", this.state.currentUser.email);
          temp = {
            ...this.state.userDetails,
            email: this.state.currentUser.email,
            photoURL: this.state.currentUser.photoURL
          };
          this.setState({ userDetails: temp });
        });

        // User is signed in.
        var docRef = db
          .collection("auth-users")
          .doc(this.state.currentUser.email);
        docRef
          .get()
          .then(doc => {
            this.setState({ loading: false });
            if (doc.exists) {
              console.log("Document data:", doc.data());
              // this.setState({ dbData: doc.data() });
              this.setState({ userDetails: doc.data() });
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(error => {
            this.setState({ loading: false });
            console.log("Error getting document:", error);
          });
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    if (!this.state.loading) {
      if (this.state.currentUser) {
        return (
          <div>
            <div className={styles.main}>
              <div className={styles.mainBg}></div>
              <div className={styles.mainContent}>
                <div className={styles.imageContainer}>
                  <div className={styles.cropContainer}>
                    <ReactCrop
                      // className={styles.crop}
                      src={this.state.userDetails.photoURL}
                      // src={require("./img.jpg")}
                      crop={this.state.crop}
                      // onImageLoaded={this.onImageLoaded}
                      onChange={this.onCropChange}
                      onComplete={this.onCropComplete}
                      // style={{}}
                      imageStyle={{
                        display: "block",
                        maxHeight: "405px",
                        overflow: "hidden",
                        objectFit: "contain",
                        overflow: "hidden"
                      }}
                    />
                  </div>
                  <input type="file" name="file" onChange={this.handleFile} />
                  {/* Upload Image
                  </button> */}
                  <button
                    className={styles.buttonPrimary}
                    onClick={this.onCropComplete}
                  >
                    Save Image
                  </button>

                  <button className={styles.buttonPrimary}>
                    Use default image
                  </button>
                </div>
                <div className={styles.formContainer}>
                  <div className={styles.userInfo}>
                    <h3>Hello,</h3>
                    <p>{this.state.userDetails.email}</p>

                    <textarea
                      spellCheck="false"
                      autoFocus
                      name="displayName"
                      id="displayName"
                      // cols="19"
                      rows="1"
                      maxLength="14"
                      placeholder="Enter display name"
                      onChange={this.handleInputChange}
                      value={this.state.userDetails.displayName}
                    ></textarea>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <p>Enter the following details</p>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter first name"
                      onChange={this.handleInputChange}
                      value={this.state.userDetails.firstName}
                      // onChange={this.handleInputChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter last name"
                      onChange={this.handleInputChange}
                      value={this.state.userDetails.lastName}
                    />
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="Enter user name"
                      onChange={this.handleInputChange}
                      value={this.state.userDetails.userName}
                    />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Enter mobile number"
                      onChange={this.handleInputChange}
                      value={this.state.userDetails.phone}
                    />
                    <div>
                      <button className={styles.buttonPrimary} type="submit">
                        Save Info
                      </button>
                      <button
                        className={styles.buttonPrimary}
                        onClick={this.handleSignOut}
                      >
                        Sign Out
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    } else {
      return (
        <div className={styles.center}>
          <ClipLoader
            // css={override}
            size={150}
            color={"#123abc"}
            loading={this.state.load}
          />
        </div>
      );
    }
  }
}

export default Profile;
