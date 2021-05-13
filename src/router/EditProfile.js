import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import {useState} from "react";
import Firebase from "../db/Firebase";
import {useSelector, useDispatch} from "react-redux";
import Loader from "../components/Loader";
import Alert from "../components/Alert";


const EditProfile = () => {
    document.title = "Edit Profile";

    const dispatch = useDispatch();

    const uid = useSelector(state => state.profile.uid);
    const loading = useSelector(state => state.profile.loading);
    const img = useSelector(state => state.profile.profilePic);
    const mysettings = useSelector(state => state.mysettings);
    const username = useSelector(state => state.profile.name);

    const [state, setState] = useState({
        pic: img,
        blob: "",
        loading: false,
        username: "",
        execPosition: "",
        newPassword: "",
        email: "",
        imgSent: null,
        discription: "",
        number: "",
        facebookId: "",
        alert: false,
        emailReset: ""
    });

    return(
        <div id="edit-profile" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            {(state.loading === true || loading === true) && <Loader />}
            {mysettings.alert === true && <Alert content={mysettings.alertContent}/>}
            <Header/>
            <main>
                <div className="img-top">
                    <img src={state.pic} alt=""/>
                </div>
                <form>
                    <div className="top-line">
                        <p>Upload Img</p>
                        <div className="line"></div>
                    </div>
                    <div id="input">
                        <i className="fa fa-image"></i>
                        <input
                            disabled={img === "" ? false : true} 
                            type="file" 
                            onChange={(event) => {
                                setState({
                                    ...state,
                                    pic: URL.createObjectURL(event.target.files[0]),
                                    blob: event.target.files[0],
                                })
                            }
                        }/>
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        if (img !== "") {
                            dispatch({
                                type: "toggle_alert",
                                alert: true,
                                alertContent: "You can only upload a profile picture once, This Policy may change in future updates"
                            });
                        } else {
                            if (state.pic !==""){
                                setState({
                                    ...state,
                                    loading: true,
                                });
                                let uploadTimer = setInterval(() => {
                                    Firebase().storage.ref(`images/${uid}/profile-pic.jpg`)
                                    .put(state.blob)
                                    .then(() => {
                                        Firebase().storage.ref(`images/${uid}/profile-pic.jpg`)
                                        .getDownloadURL()
                                        .then(url => {
                                            Firebase().db.ref("users/" + uid)
                                            .update({
                                                profilePic: url,
                                                // profilePic: `https://firebasestorage.googleapis.com/v0/b/mount--zion-youth-portal.appspot.com/o/images%2${uid}%2Fprofile-pic.jpg`
                                            })
                                            .then(() => {
                                                setState({
                                                    ...state,
                                                    loading: false,
                                                    imgSent: true,
                                                });
                                                dispatch({
                                                    type: "toggle_alert",
                                                    alert: true,
                                                    alertContent: "Img Uploaded"
                                                });
                                                dispatch({
                                                    type: "get_profile-pic",
                                                    url: url
                                                });
                                            })
                                        })
                                    })
    
                                    setTimeout(() => {
                                        clearInterval(uploadTimer)
                                        if (state.imgSent === null){
                                            setState({
                                                ...state,
                                                loading: false,
                                                imgSent: false,
                                            });
                                        };
                                        
                                        if (state.imgSent === false) {
                                            dispatch({
                                                type: "toggle_alert",
                                                alert: true,
                                                alertContent: "Upload Failed: Try Again"
                                            });
                                        };
                                    }, 19000);
                                }, 20000)
                            } else {
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: "No Image Selected"
                                });
                            }
                        }
                        }}>Update</button>
                    <div className="top-line">
                        <p>Bio</p>
                        <div className="line"></div>
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input type="text" 
                            disabled={username === "" ? false : true } 
                            placeholder="Username"
                            onMouseOver={() => {
                                if (username !== ""){
                                    dispatch({
                                        type: "toggle_alert",
                                        alert: true,
                                        alertContent: "You can only update your username once, This Policy may change in future updates"
                                    });
                                }       
                            }}
                            onChange={(event) => {
                                setState({
                                    ...state,
                                    username: event.target.value
                                })           
                            }}
                        />
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input type="text" placeholder="Executive Position" onChange={(event) => {
                            setState({
                                ...state,
                                execPosition: event.target.value
                            })
                        }}/>
                    </div>
                    <textarea type="text" placeholder="About yourself" onChange={(event) => {
                        setState({
                            ...state,
                            discription: event.target.value
                        })
                    }}/>
                    <button onClick={(event) => {
                        event.preventDefault();
                        if (state.username !== ""){
                            setState({
                                ...state,
                                loading: true,
                            });
                            Firebase().db.ref("users/" + uid)
                            .update({
                                username: state.username
                            })
                            .then(() => {
                                setState({
                                    ...state,
                                    loading: false,
                                });
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: `Username: ${state.username} Updated`
                                });
                                dispatch({
                                    type: "update_username",
                                    username: state.username,
                                })
                            })
                        }

                        if (state.execPosition !== ""){
                            setState({
                                ...state,
                                loading: true,
                            });
                            Firebase().db.ref("users/" + uid)
                            .update({
                                executivePosition: state.execPosition
                            })
                            .then(() => {
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: `Executive Position: ${state.execPosition} Updated`
                                });
                                setState({
                                    ...state,
                                    loading: false,
                                });
                                dispatch({
                                    type: "update_executive_position",
                                    execPosi: state.execPosition,
                                })
                            })
                        }

                        if (state.discription !== ""){
                            setState({
                                ...state,
                                loading: true,
                            });
                            Firebase().db.ref("users/" + uid)
                            .update({
                                discription: state.discription
                            })
                            .then(() => {
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: "Bio Updated"
                                });
                                setState({
                                    ...state,
                                    loading: false,
                                });
                                dispatch({
                                    type: "update_discription",
                                    discription: state.discription,
                                })
                            })
                        }
                        
                    }}>Update</button>
                     <div className="top-line">
                        <p>Social</p>
                        <div className="line"></div>
                    </div>
                    <div id="input">
                        <i className="fab fa-whatsapp"></i>
                        <input type="text" placeholder="Contact" onChange={(event) => {
                            setState({
                                ...state,
                                number: event.target.value
                            })
                        }}/>
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        if (state.number !== ""){
                            setState({
                                ...state,
                                loading: true,
                            });
                            Firebase().db.ref("users/" + uid)
                            .update({
                                phoneNumber: state.number
                            })
                            .then(() => {
                                setState({
                                    ...state,
                                    loading: false,
                                }); 
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: `Mobile Number: ${state.number} Updated`
                                });
                            })
                        } else {
                            dispatch({
                                type: "toggle_alert",
                                alert: true,
                                alertContent: "WhatsApp Contact Needed"
                            });
                        }
                    }}>Update</button>
                    <div className="top-line">
                        <p>Security</p>
                        <div className="line"></div>
                    </div>
                    <h5>A Password rest email would be sent to you</h5>
                    <div id="input">
                        <i className="fa fa-envelope"></i>
                        <input type="email" placeholder="Email" onChange={(event) => {
                            setState({
                                ...state,
                                emailReset: event.target.value
                            })
                        }}/>
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        if (state.emailReset !== ""){
                            setState({
                                ...state,
                                loading: true,
                            });
                            Firebase().auth.sendPasswordResetEmail(state.emailReset).then(() => {
                                setState({
                                    ...state,
                                    loading: false,
                                });
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: `Password Reset Email Sent to: ${state.emailReset}`
                                });
                            })
                            .catch((error) => {
                                setState({
                                    ...state,
                                    loading: false,
                                })
                                dispatch({
                                    type: "toggle_alert",
                                    alert: true,
                                    alertContent: "Network Error: Try Again " + error.message                                });
                            })
                        } else {
                            dispatch({
                                type: "toggle_alert",
                                alert: true,
                                alertContent: "Your Email is Needed"
                            });
                        }
                    }}>Send</button>
                </form>
            </main>
            <BottomNav/>
        </div>
    )
}

export default EditProfile;