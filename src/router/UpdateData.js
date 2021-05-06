import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import {useState} from "react";
import Firebase from "../db/Firebase";
import {useSelector} from "react-redux";
import Loader from "../components/Loader";

const UpdateData = () => {
    document.title = "Update Data";
    
    const uid = useSelector(state => state.profile.uid);
    const loading = useSelector(state => state.profile.loading);
    const mysettings = useSelector(state => state.mysettings);

    const [state, setState] = useState({
        loading: false,
        dataSent: null,
        imgSent: null,
        picPreview: "",
        firstname: "",
        lastname: "",
        middlename: "",
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
    });

    const [preview, setPreview] = useState(false);

    const submit = (event) => {
        setState({
            ...state,
            loading: true,
        })
        event.preventDefault();

        const updateToFirebase = (data) => {
            Firebase().db.ref("users/" + uid).update(data).then(() => {
                setState({
                    ...state,
                    loading: false,
                    dataSent: true
                })
            })
        }

        let updateTimer = setInterval(() => {
            state.firstname !== "" && updateToFirebase({
                firstname: state.firstname,
            })
            state.lastname !== "" && updateToFirebase({
                lastname: state.lastname,
            })
            state.middlename !== "" && updateToFirebase({
                middlename: state.middlename,
            })
            state.phoneNumber !== "" && updateToFirebase({
                phoneNumber: state.phoneNumber,
            })
            state.homeAddress !== "" && updateToFirebase({
                homeAddress: state.homeAddress,
            })
            state.dateOfBirth !== "" && updateToFirebase({
                dateOfBirth: state.dateOfBirth,
            })
            state.membership !== "" && updateToFirebase({
                membership: state.membership,
            })
            state.executivePosition !== "" && updateToFirebase({
                executivePosition: state.executivePosition,
            })
            state.maritalStatus !== "" && updateToFirebase({
                maritalStatus: state.maritalStatus,
            })
            state.gender !== "" && updateToFirebase({
                gender: state.gender,
            })
            state.churchAssembly !== "" && updateToFirebase({
                churchAssembly: state.churchAssembly,
            })
            state.eductionalQualification !== "" && updateToFirebase({
                eductionalQualification: state.eductionalQualification,
            })
            state.stateOfOrigin !== "" && updateToFirebase({
                stateOfOrigin: state.stateOfOrigin,
            })
            state.localGov !== "" && updateToFirebase({
                localGov: state.localGov,
            })
            state.fathername !== "" && updateToFirebase({
                fathername: state.fathername,
            })
            state.mothername !== "" && updateToFirebase({
                mothername: state.mothername,
            })
            state.noOfSiblings !== "" && updateToFirebase({
                noOfSiblings: state.noOfSiblings
            })

            setTimeout(() => {
                clearTimeout(updateTimer);
                if (state.dataSent ===  null) {
                    setState({
                        ...state,
                        loading: false,
                        dataSent: false
                    });
                }
            }, 10000)

        }, 11000)
            
    }
    
    return (
        <div id="update-data" className={mysettings.darkmode === true ? "dark-mode" : undefined}>
            {(state.loading === true || loading === true) && <Loader />}
            <Header/>
            <main className={preview === true ? "no-scroll" : undefined}>
                <div id="notice">
                    <h3>DATA</h3>
                    <h5 className="msg">Kindly fill out the forms carefully</h5>
                </div>
                <form method="dialog">
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input placeholder="firstname" onChange={(event) => {
                            setState({
                                ...state,
                                firstname: event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input placeholder="lastname" onChange={(event) => {
                            setState({
                                ...state,
                                lastname: event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input placeholder="middlename" onChange={(event) => {
                            setState({
                                ...state,
                                middlename: event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-phone"></i>
                        <input placeholder="phone number" onChange={(event) => {
                            setState({
                                ...state,
                                phoneNumber: event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-map-marker"></i>
                        <input placeholder="home address" onChange={(event) => {
                            setState({
                                ...state,
                                homeAddress: event.target.value
                            });
                        }}/>
                    </div>
                    <label>Date of Birth:</label>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input type="date"  onChange={(event) => {
                            setState({
                                ...state,
                                dateOfBirth: event.target.value
                            });
                        }}/>
                    </div>
                    <label>Membership:</label>
                    <select  onChange={(event) => {
                         setState({
                            ...state,
                            membership: event.target.value
                        });
                    }}>
                        <option></option>
                        <option>Excecutive</option>
                        <option>Member</option>
                    </select>
                    <label>Executive Position</label>
                    <select onChange={(event) => {
                        setState({
                            ...state,
                            executivePosition: event.target.value
                        });
                    }}>
                        <option>Not an Executive</option>    
                        <option>Assembly Youth Leader</option>
                        <option>District Youth Leader</option>
                        <option>Zonal Youth Leader</option>    
                        <option>Assembly Ass. Youth Leader</option>   
                        <option>Youth Coordinator</option>
                        <option>P.R.O</option>
                        <option>Ass. P.R.O</option>
                        <option>Secretary</option>
                        <option>Ass. Secretary</option>
                        <option>Treasurer</option>
                        <option>Ass. Treasurer</option>    
                        <option>Warfare Manager</option>
                    </select>
                    <label>Marital Status:</label>
                    <select onChange={(event) => {
                        setState({
                            ...state,
                            maritalStatus: event.target.value
                        });
                    }}>
                        <option></option>
                        <option>Single</option>
                        <option>Engaged</option>
                        <option>Married</option>
                    </select>
                    <label>Gender:</label>
                    <select onChange={(event) => {
                        setState({
                            ...state,
                            gender: event.target.value
                        });
                    }}>
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <label>Church Assembly:</label>
                    <select onChange={(event) => {
                        setState({
                            ...state,
                            churchAssembly: event.target.value
                        });
                    }}>
                        <option></option>
                        <option>Mount Zion HQ</option>
                        <option>Orisun Anu Magada</option>
                        <option>Mount Zion Ijoko</option>
                        <option>Santuary of praise</option>
                        <option>Mount Zion Orimerimu</option>
                    </select>
                    <label>Educational qualification:</label>
                    <select onChange={(event) => {
                        setState({
                            ...state,
                            eductionalQualification: event.target.value
                        });
                    }}>
                        <option></option>
                        <option>Primary School</option>
                        <option>Secondary School</option>
                        <option>Undergraduate</option>
                        <option>Graduate</option>
                    </select>
                    <label>Not a student?:</label>
                    <div id="input">
                        <i className="fa fa-briefcase"></i>
                        <input placeholder="occupation" onChange={(event) => {
                            setState({
                                ...state,
                                occupation: event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input placeholder="State of origin" onChange={(event) => {
                            setState({
                                ...state,
                                stateOfOrigin: event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input placeholder="Local Goverment" onChange={(event) => {
                            setState({
                                ...state,
                                localGov:  event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="far fa-user"></i>
                        <input placeholder="Father's name" onChange={(event) => {
                            setState({
                                ...state,
                                fathername:  event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="far fa-user"></i>
                        <input placeholder="Mothers's name" onChange={(event) => {
                            setState({
                                ...state,
                                mothername:  event.target.value
                            });
                        }}/>
                    </div>
                    <div id="input">
                        <i className="fa fa-user"></i>
                        <input placeholder="Number of siblings" onChange={(event) => {
                            setState({
                                ...state,
                                noOfSiblings:  event.target.value
                            });
                        }}/>
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        setPreview(true);
                    }}>Preview</button>
                </form>
                <div id="preview" className={preview ===  true ? "preview-toggled" : undefined}>
                <i className="fa fa-arrow-right" onClick={() => setPreview(false)}></i>
                    <div id="notice">
                        <h3>Preview</h3>
                        <h5 className="msg">Preview your data for proper corrections</h5>
                    </div>                        
                    <div className="label">
                        <h5>Firstname</h5>
                        <p>{state.firstname}</p>
                    </div>
                    <div className="label">
                        <h5>Middlename</h5>
                        <p>{state.middlename}</p>
                    </div>
                    <div className="label">
                        <h5>Lastname</h5>
                        <p>{state.lastname}</p>
                    </div>
                    <div className="label">
                        <h5>Father's Name</h5>
                        <p>{state.fathername}</p>
                    </div>
                    <div className="label">
                        <h5>Mothers's Name</h5>
                        <p>{state.mothername}</p>
                    </div>
                    <div className="label">
                        <h5>Phone Number </h5>
                        <p>{state.phoneNumber}</p>
                    </div>
                    <div className="label">
                        <h5>Home Address</h5>
                        <p>{state.homeAddress}</p>
                    </div>
                    <div className="label">
                        <h5>Data of Birth</h5>
                        <p>{state.dateOfBirth}</p>
                    </div>
                    <div className="label">
                        <h5>Membership</h5>
                        <p>{state.membership}</p>
                    </div>
                    <div className="label">
                        <h5>Departmental position</h5>
                        <p>{state.executivePosition}</p>
                    </div>
                    <div className="label">
                        <h5>Marital Status</h5>
                        <p>{state.maritalStatus}</p>
                    </div>
                    <div className="label">
                        <h5>Gender</h5>
                        <p>{state.gender}</p>
                    </div>
                    <div className="label">
                        <h5>Church Assembly</h5>
                        <p>{state.churchAssembly}</p>
                    </div>
                    <div className="label">
                        <h5>Educational Qualification</h5>
                        <p>{state.eductionalQualification}</p>
                    </div>
                    <div className="label">
                        <h5>Occupation</h5>
                        <p>{state.occupation}</p>
                    </div>
                    <div className="label">
                        <h5>State of Origin</h5>
                        <p>{state.stateOfOrigin}</p>
                    </div>
                    <div className="label">
                        <h5>Local Government Area</h5>
                        <p>{state.localGov}</p>
                    </div>
                    <div className="label">
                        <h5>Number of Siblings</h5>
                        <p>{state.noOfSiblings}</p>
                    </div>
                    {state.dataSent === true && <div className="sucess-alert"><h6>Data Sent Sucessfully</h6></div>}
                    {state.dataSent === false && <div className="msg"><h6>Update Failed: Check your network connection or Empty fields</h6></div>}
                    <button onClick={submit}>UPDATE</button>
                </div>
            </main>
            <BottomNav/>
        </div>
    )
}

export default UpdateData;