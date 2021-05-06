const initialState = {
    darkmode: false,
    alert: false,
    alertContent: "",
}

const MySettingsReducer = (state = initialState, action) => {
    switch (action.type){
        case "darkmode" :
            return {
                ...state,
                darkmode: action.value
            }
        case "toggle_alert":
            return{
                ...state,
                alert: action.alert,
                alertContent: action.alertContent
            }
        default:
            return state;
    }
}

export default MySettingsReducer;