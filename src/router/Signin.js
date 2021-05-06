import LogoImg from "../img/logo.jpg";
import {Link} from "react-router-dom"
import {useState} from "react";
import Firebase from "../db/Firebase";
import Loader from "../components/Loader";

const Signin = () => {
    document.title = 'Sign in';

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        loading: false,
    });

    const handleForm = (event, type) => {   
        switch(type){
            case "email":
                setState({
                    ...state,
                    email: event.target.value
                });
                break;
            case "password":
                setState({
                    ...state,
                    password: event.target.value
                });
                break;
            default:
                return state;
        }
    };

    const [error, setErr] = useState({
        emptyFields: false,
        error: false,
        errorMsg: ""
    })

    const submit = (event) => {
        event.preventDefault();
        if (state.email === "" || state.password === ""){
            setErr({
                emptyFields: true,
            }) 
        } else {
            setErr({
                passwordLength: false,
                emptyFields: false,
            });
            setState({
                ...state,
                loading: true
            })
            Firebase().auth.signInWithEmailAndPassword(state.email, state.password).catch(error => {
                if (error){
                    setErr({
                        error: true,
                        errorMsg: error.code.replace("auth/", "").replace("-", " ")
                    });
                    setState({
                        ...state,
                        loading: false
                    })
                }
            })
        }
        
    }

    return(
        <div id="login">
            {state.loading === true && <Loader />}
            <div id="intro">
                <div id="img">
                    <img alt="logo" src={LogoImg}/>
                </div>
                <div id="msg">
                    <h2>C.A.C Mount Zion District</h2>
                    <h3>Youth Portal</h3>
                    <p>You are welcome</p>
                </div>
            </div>
            <form method="dialog">
                <h4>SIGN IN</h4>
                <div id="input">
                    <i className="fa fa-at"></i>
                    <input placeholder="email" type="email" onChange={(event) => handleForm(event, "email")}/>
                </div>
                <div id="input">
                    <i className="fa fa-key"></i>
                    <input placeholder="password" type="password" onChange={(event) => handleForm(event, "password")}/>
                </div>
                <div className="msg">
                    <h6>
                        {error.error === true && error.errorMsg}
                        {error.emptyFields === true && "All fields are required"}
                    </h6>
                </div>
                <button onClick={submit}>Sign in</button>
                <div id="action">
                    <h5>Not Registered?</h5>
                    <Link to="signup">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default Signin;