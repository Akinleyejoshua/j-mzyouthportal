const initialState = {
    uid: "",
    img: "",
    username: "",
    discription: "",
    number: "",
    execPosition: "",
    email: "",
}

const ViewProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "get_user_profile":
            return {
                ...state,
                img: action.img,
                username: action.username,
                discription: action.discription,
                number: action.number,
                execPosition: action.execPosition,
                email: action.email,
                uid: action.uid
            }
        
        case "clear_user_profile":
            return {
                ...state,
                img: "",
                username: "",
                discription: "",
                number: "",
                execPosition: "",
                email: "",
                uid: ""
            }
        default:
            return state;
    }
}

export default ViewProfileReducer;