// AxkmQwj98MRVnnrktyyznRJZo802
const initialState = {
    uid: "",
    name: "",
    email: "",
    execPosi: "",
    profilePic: "",
    loading: true,
    isAdmin: false,
    discription: "",
    number: "",
}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case "get_profile":
            return {
                ...state,
                name: action.username,
                uid: action.uid,
                isAdmin: action.isAdmin,
                execPosi: action.execPosi,
                number: action.number,
                discription: action.discription,
                email: action.eamil
            }
        case "update_username":
            return {
                ...state,
                name: action.username,
            }
        case "update_discription":
            return {
                ...state,
                discription: action.discription
            }
        case "update_executive_position":
            return {
                ...state,
                execPosi: action.execPosi,
            }
        case "update_number":
            return {
                ...state,
                number: action.number
            }
        case "get_profile-pic":
            return {
                ...state,
                profilePic: action.url
            }
        case "loading":
            return {
                ...state,
                loading: action.value
            }
        case "clear_profile":
            return {
                ...state,
                uid: "",
                name: "",
                email: "",
                execPosi: "",
                profilePic: "",
                loading: true,
                isAdmin: false,
                discription: "",
                number: ""
            }
        default:
            return state;
    }
}

export default ProfileReducer;