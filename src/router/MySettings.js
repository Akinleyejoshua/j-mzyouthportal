import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import {useSelector, useDispatch} from "react-redux";

const MySettings = () => {
    document.title = "My Settings";
    const dispatch = useDispatch();
    const loading = useSelector(state => state.profile.loading);
    const mysettings = useSelector(state => state.mysettings);

    const toggleDarkmode = () => {
        mysettings.darkmode === false ?
        dispatch({
            type: "darkmode",
            value: true
        })
        :    
        dispatch({
            type: "darkmode",
            value: false
        })
    
    }

    return(
        <div id="my-settings" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            {loading === true && <Loader />}
            <Header/>
            <main>
                <h4>Settings</h4>
                <div className="top-line">
                    <p>Display</p>
                    <div className="line"></div>
                </div>
                <div className="options">
                    <div className="left">
                        <p>Dark Mode</p>
                        <i>To change to night color</i>
                    </div>
                    <div onClick={toggleDarkmode}className="right">
                    <div className={mysettings.darkmode === true  ? "btn-toggler btn-toggled" : "btn-toggler"}>
                        <div className={(mysettings.darkmode === true)  ? "toggler btn-toggled" : "toggler"}></div>
                    </div>
                    </div>
                </div>
            </main>
            <BottomNav/>
        </div>
    )
}

export default MySettings;