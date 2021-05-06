import LogoImg from "../img/logo.jpg";
import {Link} from "react-router-dom";
import {useState} from "react";
import Loader from "../components/Loader";
import Firebase from "../db/Firebase";

const Signup = () => {
    document.title = 'Sign up';

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        loading: false
    })

    const handleForm = (event, type) => {   
        switch(type){
            case "username":
                setState({
                    ...state,
                    username: event.target.value
                });
                break;
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
        username: false,
        emailUsed: false,
        invalidEmail: false,
        passwordLength: false,
        emptyFields: false,
        error: false,
        errorMsg: ""
    })


    const submit = (event) => {
        event.preventDefault();

        if (state.username === "" || state.email === "" || state.password === ""){
            setErr({
                emptyFields: true,
            }) 
        } else {
            if (state.password.length < 6){
                setErr({
                    passwordLength: true,
                })
            } else {
                setErr({
                    passwordLength: false,
                    emptyFields: false
                });
                setState({
                    ...state,
                    loading: true
                })
                Firebase().auth.createUserWithEmailAndPassword(state.email, state.password).then(()=>{
                    Firebase().auth.onAuthStateChanged((user) =>{
                        if (user){
                            Firebase().db.ref("users/" + user.uid).set({
                                username: state.username,
                                isAdmin: false,
                                phoneNumber: "",
                                discription: "",
                                email: state.email,
                                profilePic: "",
                                executivePosition: ""
                            }).then(() => {
                                setErr({
                                    ...state,
                                    error: false,
                                    loading: false
                                });
                            });
                            
                            setState({
                                ...state,
                                loading: true
                            })
                        } else {
                            setErr({
                                error: true,
                                errorMsg: "Oops, an error occured, try again"
                            });
                            setState({
                                ...state,
                                loading: false
                            })
                        }
                    })
                }).catch((error) => {
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
                <h4>SIGN UP</h4>
                <div id="input" onChange={(event) => handleForm(event, "username")}>
                    <i className="fa fa-user"></i>
                    <input placeholder="username" type="text"/>
                </div>
                <div id="input" onChange={(event) => handleForm(event, "email")}>
                    <i className="fa fa-at"></i>
                    <input placeholder="email" type="email"/>
                </div>
                <div id="input" onChange={(event) => handleForm(event, "password")}>
                    <i className="fa fa-key"></i>
                    <input placeholder="password" type="password"/>
                </div>
                <div className="msg">
                    <h6>
                        {error.emptyFields === true && "All fields are required"}
                        {error.passwordLength === true && "Password too weak, Atleast not less than 6 characters"}
                        {error.error === true && error.errorMsg}
                    </h6>
                </div>
                <button onClick={submit}>Sign up</button>
                <div id="action">
                    <h5>Registered Already?</h5>
                    <Link to="signin">Sign in</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;