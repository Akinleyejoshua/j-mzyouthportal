import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import TextEditor from "../components/TextEditor";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import Firebase from "../db/Firebase";
import {useHistory} from "react-router";

const Publisher = () => {
    const profile = useSelector(state => state.profile);

    const history = useHistory();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        sent: null,
        loading: false,
    })

    let medias = [];

    const loadFeeds = () => {
        Firebase().db.ref("feeds/")
        .limitToLast(1)
        .once("value")
        .then(snapshot => { 
            snapshot.forEach(items => {
                dispatch({
                    type: "get_feeds",
                    username: items.val().username,
                    content: items.val().content,
                    img: items.val().img,
                    userID: items.val().userID,
                    uid: items.key
                })
            })                  
        })
    };

    const sendData = (value) => {
        
        Firebase().db.ref("feeds/").push({
            content: value,
            img: profile.profilePic,
            userID: profile.uid,
            username: profile.name,
            medias: medias
        })
        .then(() => {
            loadFeeds();
            dispatch({
                type: "get_like_metrics",
                likes: 0,
                likedBy: [],
            });
            dispatch({
                type: "get_comment_metrics",
                commentlenght: 0,
            })
        })
        .then(() => {
            setState({
                ...state,
                loading: false
            });
            history.push("/home")
        })
    }

    return (
        <div id="publisher">
            {(profile.loading === true || state.loading === true) && <Loader/>}
            <Header/>
            <main>
                <TextEditor sendData={(value) => {
                    setState({
                        ...state,
                        loading: true
                    })
                    let timer = setInterval(() => {
                        sendData(value);
                        clearInterval(timer, 9000);
                    }, 10000)
                }} getMedias={(value) => {
                    medias.push(value)
                }}/>
            </main>
            <BottomNav/>
        </div>
    )
}

export default Publisher;