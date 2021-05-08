import {useSelector, useDispatch} from "react-redux";
import ReactHtmlParser from "react-html-parser";
import Firebase from "../db/Firebase";
import {useHistory} from "react-router"
import {useEffect} from "react";
import CommentBar from "./CommentBar";

const ListFeed = () => {
    const listfeed = useSelector(state => state.listfeed);
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch();
    const history = useHistory();

    const returnToHTML = (i) => {
        return (
            <div>{ReactHtmlParser(listfeed.content[i])}</div>
        )
    }

    const loadLikeMetrics = () => {
        let likes = [];
        let likedBy = [];

        dispatch({type: "clear_like_metrics"})
        Firebase().db.ref("feeds/").once("value").then(snapshot => {
            snapshot.forEach(items => {
                let child = items.val().metrics;

                if (child === undefined) {
                    dispatch({
                        type: "get_like_metrics",
                        likes: 0,
                        likedBy: likedBy,
                    })
                } else {
                    Firebase().db.ref("feeds/" + items.key + "/metrics/likes").once("value").then(snapshot => {
                        snapshot.forEach(items => {
                            likes.push(items.key);
                            likedBy.push(items.key);
                        })     
                        
                    }).then(() => {
                        dispatch({
                            type: "get_like_metrics",
                            likes: likes.length,
                            likedBy: likedBy,
                        })
                        likes = [];
                        likedBy = [];                         
                    })
                }
                   
            })
        })
    }; 

    const loadCommentMetrics = () => {
        let comments = [];

        dispatch({type: "clear_comment_metrics"})
        Firebase().db.ref("feeds/").once("value").then(snapshot => {
            snapshot.forEach(items => {
                let child = items.val().comments;
                if (child === undefined) {
                    dispatch({
                        type: "get_comment_metrics",
                        commentlenght: 0,
                    })
                } else {
                    Firebase().db.ref("feeds/" + items.key + "/comments").once("value").then(snapshot => {
                        snapshot.forEach(items => {
                            comments.push(items.key);
                            dispatch({
                                type: "get_comment_uid",
                                commentuid: items.key
                            })
                        })
                    }).then(() => {
                        dispatch({
                            type: "get_comment_metrics",
                            commentlength: comments.length,
                        })
                        comments = [];
                    })
                }
                   
            })
        })
    }

    const loadFeeds = () => {
        Firebase().db.ref("feeds/").once("value").then(snapshot => {
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
        }).then(() => {
            loadLikeMetrics();
            loadCommentMetrics();
        }).then(() => {
            dispatch({
                type: "toggle_loader",
                value: false
            })
        })
    };

    useEffect(() => {
        listfeed.loading === true && loadFeeds();
    }, [])

    const checkIfListMatch = (a, b, i) => {
        for (let j = i; a.length > j; j++){
            return (a[j].includes(b))
        }
    }

    const getLikeLength = (a, i) => {
        return a[i]
    }

    const feedArr = listfeed.uid.map((items, i) => 
        <div key={i} className="bar">
            <div className="bar-top">
                <div className="left" onClick={() => {
                    dispatch({
                        type: "clear_user_profile"
                    })
                    let id = listfeed.userID[i]
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
                }}>
                    <img alt="" src={listfeed.img[i]}/>
                    <h5>{listfeed.username[i]}</h5>
                </div>
                <div className="dropdown fa fa-ellipsis-h">
                    <div className="panel">
                        {listfeed.userID[i] === profile.uid && <button onClick={(event) => {
                            Firebase().db.ref("feeds/"+ items).remove().then(() => {
                                event.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                            })
                        }}><i className="far fa-trash-alt"></i> Delete</button>}
                    </div>
                </div>
            </div>
            <div className="bar-content">
                <div className="content">
                    {returnToHTML(i)}
                </div>
            </div>
            <div className="bar-actions">
                {checkIfListMatch(listfeed.likedBy, profile.uid, i) === true ? 
                    <button className="fa fa-heart liked" onClick={(event) => {
                        if (event.target.className === "fa fa-heart liked"){
                            event.target.className = "far fa-heart";
                            event.target.innerHTML  = parseInt(event.target.innerHTML) - 1;
                            Firebase().db.ref("feeds/" + items + "/metrics/likes/" + profile.uid).remove();
                        } else {
                            event.target.className = "fa fa-heart liked";
                            event.target.innerHTML  = parseInt(event.target.innerHTML) + 1;
                            Firebase().db.ref("feeds/" + items + "/metrics/likes/" + profile.uid).set({
                                status: true
                            })
                        }    
                }}>{getLikeLength(listfeed.likes, i)}</button> : <button className="far fa-heart" onClick={(event) => {
                    if (event.target.className === "far fa-heart"){
                        event.target.className = "fa fa-heart liked";
                        event.target.innerHTML  = parseInt(event.target.innerHTML) + 1;
                        Firebase().db.ref("feeds/" + items + "/metrics/likes/" + profile.uid).set({
                            status: true
                        })
                    } else {
                        event.target.className = "far fa-heart";
                        event.target.innerHTML  = parseInt(event.target.innerHTML) - 1;
                        Firebase().db.ref("feeds/" + items + "/metrics/likes/" + profile.uid).remove();
                    }
                    
                }}>{getLikeLength(listfeed.likes, i)}</button>}
                <button className="far fa-comment-alt" onClick={() => {
                    let id = listfeed.uid[i];
                    dispatch({type: "clear_comments"})
                    dispatch({type: "clear_comments_uid"})
                    Firebase().db.ref(`feeds/${id}/comments`).once("value").then(snapshot => {
                        snapshot.forEach(items => {
                            dispatch({
                                type: "get_comments_uid",
                                commentuid: items.key
                            });
                            dispatch({
                                type: "get_comments",
                                comments: items.val().content,
                                commentsender: items.val().sender,
                                commentsenderuid: items.val().uid,
                                commentimg: items.val().img
                            })
                        })
                    }).then(() =>{
                        dispatch({
                            type: "toggle_comment_bar",
                            value: true,
                            id: items
                        })
                    })      
                }}>{listfeed.commentlength[i]}</button>
                <button className="fa fa-share-alt"></button>
            </div>
            <CommentBar data={listfeed} onReload={() => {
                loadCommentMetrics();
            }} onClick={() => {
                dispatch({type: "clear_comments"})
                dispatch({
                    type: "toggle_comment_bar",
                    value: false
                })
            }}/>
        </div>
    )
    return (
        
        <div id="list-feed">
            {feedArr}
        </div>
    )
}

export default ListFeed;