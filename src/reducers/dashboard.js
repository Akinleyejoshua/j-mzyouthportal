const initialState = {
    loading: true,
    users: {
        uid: [],
        username: [],
        img: [],
        isAdmin: [],
    },
    userData: {
        username: "",
        firstname: "",
        lastname: "",
        middlename: "",
        img: "",
        phoneNumber: "",
        homeAddress: "",
        dateOfBirth: "",
        membership: "",
        executivePosition: "",
        maritalStatus: "",
        gender: "",
        churchAssembly: "",
        eductionalQualification: "",
        occupation: "",
        stateOfOrigin: "",
        localGov: "",
        fathername: "",
        mothername: "",
        noOfSiblings: "",
    }
}

const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "get_users":
            return {
                ...state,
                users: {
                    ...state,
                    username: [...state.users.username, action.username],
                    img: [...state.users.img, action.img],
                    uid: [...state.users.uid, action.uid],
                    isAdmin: [...state.users.isAdmin, action.isAdmin],
                }
            }
        case "update_isAdmin":
            return{
                ...state,
                users: {
                    ...state,
                    username: [...state.users.username],
                    img: [...state.users.img],
                    uid: [...state.users.uid],
                    isAdmin: action.isAdmin,
                }
            }
        case "get_user_data":
            return {
                ...state,
                userData: {
                    username: action.username,
                    firstname: action.firstname,
                    middlename: action.middlename,
                    lastname: action.lastname,
                    img: action.img,
                    phoneNumber: action.phoneNumber,
                    homeAddress: action.homeAddress,
                    dateOfBirth: action.dateOfBirth,
                    membership: action.membership,
                    executivePosition: action.executivePosition,
                    maritalStatus: action.maritalStatus,
                    gender: action.gender,
                    churchAssembly: action.churchAssembly,
                    eductionalQualification: action.eductionalQualification,
                    occupation: action.occupation,
                    stateOfOrigin: action.stateOfOrigin,
                    localGov: action.localGov,
                    fathername: action.fathername,
                    mothername: action.mothername,
                    noOfSiblings: action.noOfSiblings,
                }
            };
        case "clear_user_data":
            return {
                ...state,
                userData: {
                    username: "",
                    firstname: "",
                    lastname: "",
                    middlename: "",
                    img: "",
                    phoneNumber: "",
                    homeAddress: "",
                    dateOfBirth: "",
                    membership: "",
                    executivePosition: "Not an Executive",
                    maritalStatus: "",
                    gender: "",
                    churchAssembly: "",
                    eductionalQualification: "",
                    occupation: "",
                    stateOfOrigin: "",
                    localGov: "",
                    fathername: "",
                    mothername: "",
                    noOfSiblings: "",
                }
            }
        case "clear_dashboard":
            return {
                ...state,
                users: {
                    uid: [],
                    username: [],
                    img: [],
                    isAdmin: []
                },
            }
        case "dashboard_loading":
            return {
                ...state,
                loading: action.value
            }
        default:
            return state;
    }
}

export default DashboardReducer;