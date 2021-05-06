import {Route, Switch} from "react-router-dom";
import Signin from "./Signin";
import Signup from './Signup';
import Dashboard from "./Dashboard";
import Home from "./Home";
import Connect from "./Connect";
import ViewProfile from "./ViewProfile";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import UpdateData from "./UpdateData";
import MySettings from "./MySettings";
import Publisher from "./Publisher";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import Firebase from "../db/Firebase";

const MyRouter = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let url = document.location.href.split("/");
    let http = url[0];
    let domain = url[2];
    let locations = [
        `${http}//${domain}/`,
        `${http}//${domain}`,
        `${http}//${domain}/home`,
        `${http}//${domain}/signin`,
        `${http}//${domain}/signup`,
        `${http}//${domain}/dashboard`,
        `${http}//${domain}/data`,
        `${http}//${domain}/view-profile`,
        `${http}//${domain}/publisher`
    ]

    Firebase().auth.onAuthStateChanged(user => {
        if (user){
            dispatch({
                type: "get_profile",
                uid: user.uid
            });
            
            if (document.location.href === `${http}//${domain}/` || document.location.href === `${http}//${domain}` || document.location.href === locations[3] || document.location.href === locations[4] || document.location.href === locations[7]){
                history.push("/home");
            }
        } else {
            history.push("/signin");
        }
    });

    const error404 = () => {
        if (!locations.includes(document.location.href)){
            return(
                <div id="error-404">
                    <i className="fa fa-info"></i>
                    <h2>404 Not Found</h2>
                </div>
            )
        } else {
            return null;
        }
    }
    return(
        <div>
            <Switch>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/data" component={UpdateData}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/edit-profile" component={EditProfile}/>
                <Route exact path="/connect" component={Connect}/>
                <Route exact path="/view-profile" component={ViewProfile}/>
                <Route exact path="/my-profile" component={MyProfile}/>
                <Route exact path="/my-settings" component={MySettings}/>
                <Route exact path="/publisher" component={Publisher}/>
                <Route component={error404}/>
            </Switch>
        </div>
        
    )
}

export default MyRouter;