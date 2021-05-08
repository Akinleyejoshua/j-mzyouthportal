import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import Firebase from "../db/Firebase";
import {useHistory} from "react-router"

const Header = () => {
    const [toggled, setToggled] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const profile = useSelector(state => state.profile)
    const profilePic = profile.profilePic;
    const uid = profile.uid;
    const username = profile.name;
    const isAdmin = profile.isAdmin;
    const execPosi = profile.execPosi

    let url = document.location.href.split("/");
    let http = url[0];
    let domain = url[2];

    useEffect(() => {
        if (uid !== ""){
            Firebase().db.ref("users/"+ uid).once("value").then(snapshot => {
                dispatch({
                    type: "get_profile",
                    username: snapshot.val().username,
                    uid: snapshot.key,
                    isAdmin: snapshot.val().isAdmin,
                    execPosi: snapshot.val().executivePosition,
                    number: snapshot.val().phoneNumber,
                    discription: snapshot.val().discription,
                    email: snapshot.val().email
                });
                if (snapshot.val().profilePic !== ""){
                    dispatch({
                        type: "get_profile-pic",
                        url: snapshot.val().profilePic
                    });
                }
            }).then(() => {
                dispatch({
                    type: "loading",
                    value: false
                })
            })
        }
    }, [uid, dispatch])

    return (
        <header>
            <nav>
                <div className="header-left">
                    <div id="img" onClick={() => setToggled(true)}>
                        {profilePic === "" ? <i className="fa fa-user"></i> : <img src={profilePic} alt=""/>}                        
                    </div>
                </div>
                <div className="nav-brand">
                    {/* <h5>M.Z.D.</h5> */}
                    <a href="https://mzyouthportal.herokuapp.com">YouthPortal</a>
                </div>

                <div className={toggled === true ? "navbar navbar-toggled" : "navbar"}>
                    <div className="main">
                        <div className="navbar-top">
                            <i className="fa fa-arrow-left" onClick={() => setToggled(false)}></i>
                            <i className="fa fa-sign-out-alt" onClick={() => {
                                dispatch({type: "clear_profile"});
                                Firebase().auth.signOut();
                            }}></i>
                            {profilePic === "" ? <div className="avater"><i className="fa fa-user-circle"></i></div> : <div id="img"><img src={profilePic} alt=""/></div>}
                            <div id="info">
                                <p>{username}</p>
                                {execPosi === "" ? undefined : <p>{execPosi}</p>}
                            </div>
                        </div>
                        
                        <div id="actions">
                            <button onClick={() => {
                                setTimeout(() => {
                                    history.push("/edit-profile");
                                }, 1);
                            }}><i className="far fa-edit"></i> Edit Profile</button>
                            <button onClick={() => {
                                setTimeout(() => {
                                    history.push("/connect");
                                }, 1);
                            }}><i className="far fa-comment"></i> Chat</button>
                            {(isAdmin === true && document.location.href !== `${http}//${domain}/dashboard`) && <button onClick={() => {
                                setTimeout(() => {
                                    history.push("/dashboard");
                                }, 1);
                            }}><i className="far fa-chart-bar"></i> Dashboard</button>}
                            {document.location.href === `${http}//${domain}/dashboard` && <button><i className="fa fa-file-alt"></i> Invoice</button>}
                            {<button onClick={() => {
                                setTimeout(() => {
                                    history.push("/publisher");
                                }, 1)
                            }}><i className="fa fa-file"></i> Publisher</button>}
                            <button onClick={() => {
                                setTimeout(() => {
                                    history.push("/my-settings");
                                }, 1);
                            }}><i className="fa fa-cog"></i> Settings</button>
                            <button onClick={() => {
                                dispatch({type: "clear_profile"});
                                Firebase().auth.signOut();
                            }}><i className="fa fa-sign-out-alt"></i> Log out</button>
                        </div>
                    </div>
                    <div className="close" onClick={() => setToggled(false)}></div>
                </div>
            </nav>
        </header>
    )
}

export default Header;