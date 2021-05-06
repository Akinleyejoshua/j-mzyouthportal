import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import Firebase from "../db/Firebase";
import {useHistory} from "react-router"

const CommentBar = (props) => {
    const [state, setState] = useState({
        value: "",
        onsend: false,
    })
    
    const history = useHistory();
    const dispatch = useDispatch();

    const profile = useSelector(state => state.profile);
    const commentbar = useSelector(state => state.listfeed.commentbar);

    const commentArr = props.data.commentuid.map((items, i) =>
        <div className="comment-list" key={i}>
            <div className="left">
                <img alt="" src={props.data.commentimg[i]}/>
            </div>
            <div className="right">
                <h4 key={props.data.commentsenderuid[i]} onClick={(event) => {
                        dispatch({
                            type: "clear_user_profile"
                        })
                        let id = props.data.commentsenderuid[i]
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
                                history.push("/view-profile");
                            }, 1);
                        })
      
                    }}>{props.data.commentsender[i]}</h4>
                <p>{props.data.comments[i]}</p>
            </div>
        </div>
    )

    return (
        <div id="comment-bar" className={commentbar === true ? "flex" : ""}>
            <div className="comment-top">
                <i className="fa fa-times" onClick={() => props.onClick()}></i>
                <h4>{props.data.comments.length} Comments</h4>
            </div>
            <div className="comment-content">
                {commentArr}
            </div>
            <div className="comment-bottom">
                <input placeholder="comment here" onChange={(event) => {
                    setState({
                        ...state,
                        value: event.target.value
                    })
                }}/>
                {state.value !== "" && <button className="fa fa-paper-plane" onClick={(event) => {         
                    setState({
                        ...state,
                        value: ""
                    })
                    event.target.previousElementSibling.value = ""
                    Firebase().db.ref(`feeds/${props.id}/comments`).push({
                        sender: profile.name,
                        img: profile.profilePic,
                        content: state.value,
                        uid: profile.uid
                    }).then(() => {
                        props.onReload();
                        Firebase().db.ref(`feeds/${props.id}/comments`).limitToLast(1).once("value").then(snapshot => {
                            snapshot.forEach(items => {
                                dispatch({
                                    type: "get_comments_uid",
                                    commentuid: items.key
                                });
                                dispatch({
                                    type: "get_comments",
                                    comments: items.val().content,
                                    commentsender: items.val().sender,
                                    commentimg: items.val().img,
                                    commentuserid: items.val().uid
                                })
                            })
                        })
                    })
                }}></button>}
            </div>
        </div>
    )
}

export default CommentBar;