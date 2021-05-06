import {useHistory} from "react-router"

const BottomNav = () => {
    const history = useHistory();

    const go = (url) => {
        setTimeout(() => {
            history.push(url)
        }, 1)
    };

    let url = document.location.href.split("/");
    let http = url[0];
    let domain = url[2];

    let locations = [
        `${http}//${domain}/home`,
        `${http}//${domain}/data`,
        `${http}//${domain}/connect`,
        `${http}//${domain}/my-profile`
    ]

    let path = document.location.href

    return (
        <div id="bottom-nav">
            <button onClick={() => go("/home")}>
                <i className="fa fa-home"></i>
                {path === locations[0] && <div className="active"></div>}
                <p>Home</p>
            </button>
            <button  onClick={() => go("/data")}>
                <i className="fa fa-address-card"></i>
                {path === locations[1] && <div className="active"></div>}
                <p>Update Data</p>
            </button>
            <button onClick={() => go("/connect")}>
                <i className="fa fa-users"></i>
                {path === locations[2] && <div className="active"></div>}
                <p>Connect</p>
            </button>
            <button onClick={() => go("/my-profile")}>
                <i className="fa fa-user-circle"></i>
                {path === locations[3] && <div className="active"></div>}
                <p>My Profile</p>
            </button>
        </div>
    )
}

export default BottomNav;