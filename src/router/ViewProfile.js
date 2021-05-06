import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import {useSelector} from "react-redux";

const ViewProfile = () => {
    const profile = useSelector(state => state.viewprofile);
    const mysettings = useSelector(state => state.mysettings);

    document.title = "Profile for " + profile.username;

    const showData = () => {
        return(
            <div>
                {(profile.discription !== "") &&
                    <div className="top-line">
                        <p>Discription</p>
                        <div className="line"></div>
                    </div>
                }
                {(profile.discription !== "") && <div className="discription">{profile.discription}</div>}
                {(profile.execPosition !== "" || profile.email !== "" || profile.number !== "") &&
                    <div className="top-line">
                        <p>Info</p>
                        <div className="line"></div>
                    </div>
                }
                <div className="data">
                    {(profile.email !== "") ? <p><i className="fa fa-envelope"></i>{profile.email}</p> : undefined}
                    {(profile.execPosition !== "") ? <p><i className="fa fa-user-circle"></i>{profile.execPosition}</p> : undefined}
                    {(profile.number !== "") ? <p><i className="fab fa-whatsapp"></i>{profile.number}</p> : undefined}
                </div>
            </div>
            
        )
    }

    return(
        <div id="view-profile" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            <Header/>
            <main>
                <div className="img-top">
                    <img src={profile.img} alt=""/>
                    <div className="top-bar">
                        <p>{profile.username}</p>
                        {profile.number !== "" && <a className="far fa-comments"
                            href={`https://api.whatsapp.com/send?phone=234${profile.number}`}
                            target="_blank"
                            rel="noreferrer">
                        </a>}
                    </div>
                </div>
                {showData()}
            </main>
            <BottomNav/>
        </div>
    )
}

export default ViewProfile;