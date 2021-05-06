import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import {useSelector, useDispatch} from "react-redux";
import Firebase from "../db/Firebase";
import {useEffect} from "react";
import {useHistory} from "react-router"

const Connect  = () => {
    document.title = "Connect to users";

    const history = useHistory();

    const dispatch = useDispatch();

    const loading = useSelector(state => state.profile.loading);
    const connect = useSelector(state => state.connect);
    const mysettings = useSelector(state => state.mysettings);

    const getAllUsers = () => {
        // dispatch({
        //     type: "clear_connect_user"
        // })
        Firebase().db.ref("users/").once("value").then(snapshot => {
            snapshot.forEach(items => {
               dispatch({
                   type: "get_connect_user",
                   username: items.val().username,
                   uid: items.key,
                   img: items.val().profilePic,
                   churchAssembly: items.val().churchAssembly,
                   phoneNumber: items.val().phoneNumber,
               }) 
            })
        }).then(() => {
            dispatch({
                type: "toggle_connect_loader",
                value: false
            })
        })

    }

    useEffect(() => {
        connect.loading === true && getAllUsers();
    }, []);

    const userArr = connect.uid.map((items, i) => 
        <div className="bar" key={i}>
            <div className="left">
                {connect.img[i] === "" ? <i className="fa fa-user"></i> : <img src={connect.img[i]} alt=""/>}
            </div>
            <div className="right">
                <div className="top" id={items} onClick={(event) => {
                        dispatch({
                            type: "toggle_connect_loader",
                            value: true
                        })
                        dispatch({
                            type: "clear_user_profile"
                        })
                        let id = connect.uid[i]
                        Firebase().db.ref("users/" + id).once("value").then(snapshot => {
                            dispatch({
                                type: "get_user_profile",
                                img: snapshot.val().profilePic,
                                username: snapshot.val().username,
                                discription: snapshot.val().discription,
                                number: snapshot.val().phoneNumber,
                                execPosition: snapshot.val().executivePosition,
                                email: snapshot.val().email,
                                uid: snapshot.key
                            })
                        }).then(() => {
                            setTimeout(() => {
                                dispatch({
                                    type: "toggle_connect_loader",
                                    value: false
                                })
                                history.push("/view-profile");
                            }, 1);
                        })
      
                    }}>
                    <h5>{connect.username[i]}</h5>
                    <p>{connect.churchAssembly[i]}</p>     
                </div>
                <div className="social-btn">
                    <a className="far fa-comments" href={`https://api.whatsapp.com/send?phone=234${connect.phoneNumber[i]}`} target="_blank" rel="noreferrer"></a>
                </div>
            </div>
        </div>
    )

    return(
        <div id="connect" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            {(loading === true || connect.loading ===  true) && <Loader />}
            <Header/>
            <main>
                <h4>Connect with Friends on this portal</h4>
                {userArr}
            </main>
            <BottomNav/>
        </div>
    )
}

export default Connect;