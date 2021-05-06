const initialState = {
    username: [],
    img: [],
    uid: [],
    churchAssembly: [],
    phoneNumber: [],
    loading: true,
}

const ConnectReducer = (state = initialState, action) => {
    switch(action.type){
        case "get_connect_user":
            return {
                ...state,
                username: [...state.username, action.username],
                img: [...state.img, action.img],
                uid: [...state.uid, action.uid],
                churchAssembly: [...state.churchAssembly, action.churchAssembly],
                phoneNumber: [...state.phoneNumber, action.phoneNumber],
            }
        case "clear_connect_user":
            return{
                ...state,
                username: [],
                img: [],
                uid: [],
                churchAssembly: [],
                phoneNumber: [],
            }
        case "toggle_connect_loader": 
            return {
                ...state,
                loading: action.value
            }
        default:
            return state;
    }  
}

export default ConnectReducer;