import {combineReducers} from "redux";

import ProfileReducer from "./profile";
import DashboardReducer from "./dashboard";
import ConnectReducer from "./connnect";
import ViewProfileReducer from "./viewProfile"
import MySettingsReducer from "./mySettings";
import ListFeedReducer from "./listFeed";

const allReducers = combineReducers({
    profile: ProfileReducer,
    dashboard: DashboardReducer,
    connect: ConnectReducer,
    viewprofile: ViewProfileReducer,
    mysettings: MySettingsReducer,
    listfeed: ListFeedReducer,
})

export default allReducers;