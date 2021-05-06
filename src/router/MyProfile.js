import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import {useSelector} from "react-redux";
import {useHistory} from "react-router"

const MyProfile = () => {
    document.title = "My Profile"
    const profile = useSelector(state => state.profile);
    const mysettings = useSelector(state => state.mysettings);

    const history = useHistory();

    const showData = () => {
        return(
            <div>
                <h3>{profile.name}</h3>
                {profile.discription !== "" && <div className="discription">{profile.discription}</div>}
                <button onClick={() => {
                    setTimeout(() => {
                        history.push("/edit-profile");
                    }, 1);
                }}>
                    <i className="fa fa-edit"></i>
                    <p>Edit</p>
                </button>
                {(profile.email !== "" || profile.execPosi !== "" || profile.number !== "") &&
                <div className="data">
                    {profile.email !== undefined ? <p><i className="fa fa-envelope"></i>{profile.email}</p> : undefined}
                    {profile.execPosi !== "" ? <p><i className="fa fa-user-circle"></i>{profile.execPosi}</p> : undefined}
                    {profile.number !== "" ? <p><i className="fab fa-whatsapp"></i>{profile.number}</p> : undefined}
                </div>}
            </div>
            
        )
    }

    document.title = "My Profile"

    return(
        <div id="my-profile" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            {profile.loading === true && <Loader/>}
            <Header/>
            <main>
                <div className="img-top">
                    <img src={profile.profilePic} alt=""/>
                </div>
                {profile.loading === false && showData()}
            </main>
            <BottomNav/>
        </div>
    )
}

export default MyProfile;