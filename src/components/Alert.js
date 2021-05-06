import Logo from "../img/logo.jpg";
import {useDispatch} from "react-redux";


const Alert = (props) => {
    const dispatch = useDispatch();

    return (
        <div className="alert">
            <div className="alert-body">
                <div className="alert-top">
                    <img src={Logo} alt=""/>
                    <i className="fa fa-times" onClick={() => {
                        dispatch({
                            type: "toggle_alert",
                            value: false
                        })
                    }}></i>
                </div>
                <div className="alert-content">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

export default Alert;