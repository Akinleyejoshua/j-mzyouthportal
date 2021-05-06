const initialState = {
    uid: [],
    userID: [],
    username: [],
    content: [],
    img: [],
    commentlength: [],
    commentsender: [],
    commentsenderuid: [],
    commentimg: [],
    comments: [],
    commentuid: [],
    likes: [],
    likedBy: [],
    loading: true,
    commentbar: false,
}

const ListFeedReducer = (state = initialState, action) => {
    switch (action.type){
        case "get_feeds":
            return {
                ...state,
                uid: [...state.uid, action.uid],
                userID: [...state.userID, action.userID],
                username: [...state.username, action.username],
                content: [...state.content, action.content],
                img: [...state.img, action.img],
            }
        case "get_like_metrics": 
            return {
                ...state,
                likes: [...state.likes, action.likes],
                likedBy: [...state.likedBy, action.likedBy],
            }
        case "clear_like_metrics":
            return {
                ...state,
                likes: [],
                feedID: [],
                likedBy: []
            }
        case "get_comment_metrics":
            return {
                ...state,
                commentlength: [...state.commentlength, action.commentlength],
            }
        case "get_comments":
            return {
                ...state,
                comments: [...state.comments, action.comments],
                commentsender: [...state.commentsender, action.commentsender],
                commentimg: [...state.commentimg, action.commentimg],
                commentsenderuid: [...state.commentsenderuid, action.commentsenderuid]
            }
        case "get_comments_uid": 
            return {
                ...state,
                commentuid: [...state.commentuid, action.commentuid]
            }
        case "clear_comments_uid": 
            return {
                ...state,
                commentuid: []
            }
        case "clear_comments": 
            return {
                ...state,
                commentsender: [],
                commentsenderuid: [],
                commentimg: [],
                comments: [],
            }
        case "clear_comment_metrics":
            return  {
                ...state,
                commentlength: [],
            }
        case "toggle_loader":
            return {
                ...state,
                loading: action.value
            }
        case "toggle_comment_bar":
            return {
                ...state,
                commentbar: action.value,
            }
        default:
            return state;
    }
}

export default ListFeedReducer;