import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Loader from "../components/Loader";
import {useSelector, useDispatch} from "react-redux";
import Firebase from "../db/Firebase";
import {useEffect, useState} from "react";

const Dashboard = () => {
    document.title = "Admin Dashboard";
    const preLoading = useSelector(state => state.profile.loading);
    const loading = useSelector(state => state.dashboard.loading);
    const dispatch = useDispatch();
    const users = useSelector(state => state.dashboard.users.username);
    const userImg = useSelector(state => state.dashboard.users.img);
    const userId = useSelector(state => state.dashboard.users.uid);
    const isAdmin = useSelector(state => state.dashboard.users.isAdmin);
    const userData = useSelector(state => state.dashboard.userData);
    const mysettings = useSelector(state => state.mysettings);

    const [preview, setPrev] = useState({
        uid: "",
        toggled: false,
    });

    const loadDashboard = (church) => {
        dispatch({
            type: "dashboard_loading",
            value: true,
        })
        dispatch({ type: "clear_dashboard" })
        Firebase().db.ref("users/").once("value").then(snapshot => {
            snapshot.forEach(items => {
                church === items.val().churchAssembly && dispatch({
                    type: "get_users",
                    username: items.val().username,
                    isAdmin: items.val().isAdmin,
                    img: items.val().profilePic,
                    uid: items.key,
                })

                church === "All" && dispatch({
                    type: "get_users",
                    username: items.val().username,
                    isAdmin: items.val().isAdmin,
                    img: items.val().profilePic,
                    uid: items.key,
                })
            })
        }).then(() => {
            dispatch({
                type: "dashboard_loading",
                value: false
            })
        })
    }

    useEffect(() => {
        loadDashboard("All");
    }, []);

    const listUsers = users.map((items, i) => 
        <div className="bar" key={i} >
            <div className="left" id="img">
                {userImg[i] === "" ? <i className="fa fa-user"></i> : <img src={userImg[i]} alt=""/>}
                <div className="col">
                    <h4 id={userId[i]} onClick={(event) => {
                        dispatch({
                            type: "dashboard_loading",
                            value: true
                        });
                        dispatch({
                            type: "clear_user_data"
                        });
                        let id  = event.target.id
                        Firebase().db.ref("users/"+id).once("value").then(snapshot => {
                            dispatch({
                                type: "get_user_data",
                                firstname: snapshot.val().firstname,
                                middlename: snapshot.val().middlename,
                                lastname: snapshot.val().lastname,
                                username: snapshot.val().username,
                                img: snapshot.val().profilePic,
                                phoneNumber: snapshot.val().phoneNumber,
                                homeAddress: snapshot.val().homeAddress,
                                dateOfBirth: snapshot.val().dateOfBirth,
                                membership: snapshot.val().membership,
                                executivePosition: snapshot.val().executivePosition,
                                maritalStatus: snapshot.val().maritalStatus,
                                gender: snapshot.val().gender,
                                churchAssembly: snapshot.val().churchAssembly,
                                eductionalQualification: snapshot.val().eductionalQualification,
                                occupation: snapshot.val().occupation,
                                stateOfOrigin: snapshot.val().stateOfOrigin,
                                localGov: snapshot.val().localGov,
                                fathername: snapshot.val().fathername,
                                mothername: snapshot.val().mothername,
                                noOfSiblings: snapshot.val().noOfSiblings,
                            })       
                        }).then(() => {
                            dispatch({
                                type: "dashboard_loading",
                                value: false,
                            })
                            setPrev({
                                ...preview,
                                toggled: true
                            })
                        })
                        
                    }}>{items}</h4>
                    {isAdmin[i] === true && <h6>Admin</h6>}
                </div>
            </div>
            {isAdmin[i] === true ? <button onClick={() => {
                Firebase().db.ref("users/"+userId[i]).update({
                    isAdmin: false,
                }).then(() => {
                    Firebase().db.ref("users/").once("value").then(snapshot => {
                        let allIsAdmin = [];
                        snapshot.forEach(items => {
                            allIsAdmin.push(items.val().isAdmin)
                            dispatch({
                                type: "update_isAdmin",
                                isAdmin: allIsAdmin
                            });
                        })
                        allIsAdmin = [];
                    })
                });
            }}><i className="fa fa-minus"></i> <i className="fa fa-user-cog"></i></button> : <button onClick={() => {
                Firebase().db.ref("users/"+userId[i]).update({
                    isAdmin: true,
                }).then(() => {
                    Firebase().db.ref("users/").once("value").then(snapshot => {
                        let allIsAdmin = [];
                        snapshot.forEach(items => {
                            allIsAdmin.push(items.val().isAdmin)
                            dispatch({
                                type: "update_isAdmin",
                                isAdmin: allIsAdmin
                            });
                        });
                        allIsAdmin = [];
                    })
                });
            }}><i className="fa fa-plus"></i> <i className="fa fa-user-cog"></i></button>}
        </div>
    )

    const getAge = () => {
        let currentYear = new Date().getFullYear();
        let birthYear = userData.dateOfBirth.split("-")[0];
        return currentYear - birthYear;
    };
    
    return(
        <div className={mysettings.darkmode === true ? "dark-mode dashboard" : "dashboard"}>
            {(preLoading === true || loading === true) && <Loader/>}
            <Header/>
            <main>
                <div id="notice">
                    <h5>Dashboard</h5>
                </div>
                <label>Church Assembly</label>
                <select onChange={(event) => {
                    loadDashboard(event.target.value);
                }}>
                    <option>All</option>
                    <option>Mount Zion HQ</option>
                    <option>Orisun Anu Magada</option>
                    <option>Mount Zion Ijoko</option>
                    <option>Santuary of praise</option>
                    <option>Mount Zion Orimerimu</option>
                </select>
                <div id="users">
                    <div className="top-line">
                        {/* <i className="fa fa-user"></i> */}
                        <label>{users.length === 0 ? "" : users.length} users</label>
                        <div className="line"></div>
                    </div>
                    <div id="list-users">
                        {listUsers}
                    </div>
                </div>
                
                <div id="preview" className={preview.toggled ===  true ? "preview-toggled" : undefined}>
                    <div className="preview-top">
                        <i className="fa fa-arrow-right" onClick={() => setPrev({
                            ...preview,
                            toggled: false
                        })}></i>
                    </div>
                    <div id="notice">
                        <h4>Data for {userData.username}</h4>
                    </div>
                    <div className="label">
                        <img src={userData.img} alt=""/>
                    </div>
                    <div className="label">
                        <h6>Firstname</h6>
                        <p>{userData.firstname}</p>
                    </div>
                    <div className="label">
                        <h6>Middlename</h6>
                        <p>{userData.middlename}</p>
                    </div>
                    <div className="label">
                        <h6>Lastname</h6>
                        <p>{userData.lastname}</p>
                    </div>
                    <div className="label">
                        <h6>Father's name</h6>
                        <p>{userData.fathername}</p>
                    </div>
                    <div className="label">
                        <h6>Mother's name</h6>
                        <p>{userData.mothername}</p>
                    </div>
                    <div className="label">
                        <h6>Phone number</h6>
                        <p>{userData.phoneNumber}</p>
                    </div>
                    <div className="label">
                        <h6>Home address</h6>
                        <p>{userData.homeAddress}</p>
                    </div>
                    <div className="label">
                        <h6>Date of Birth</h6>
                        <p>{userData.dateOfBirth}</p>
                    </div>
                    <div className="label">
                        <h6>Age</h6>
                        <p>{getAge()}</p>
                    </div>
                    <div className="label">
                        <h6>Membership</h6>
                        <p>{userData.membership}</p>
                    </div>
                    <div className="label">
                        <h6>Executive Position</h6>
                        <p>{userData.executivePosition}</p>
                    </div>
                    <div className="label">
                        <h6>Marital Status</h6>
                        <p>{userData.maritalStatus}</p>
                    </div>
                    <div className="label">
                        <h6>Gender</h6>
                        <p>{userData.gender}</p>
                    </div>
                    <div className="label">
                        <h6>Church Assembly</h6>
                        <p>{userData.churchAssembly}</p>
                    </div>
                    <div className="label">
                        <h6>Educational Qualification</h6>
                        <p>{userData.eductionalQualification}</p>
                    </div>
                    <div className="label">
                        <h6>Occupation</h6>
                        <p>{userData.occupation}</p>
                    </div>
                    <div className="label">
                        <h6>State of Origin</h6>
                        <p>{userData.stateOfOrigin}</p>
                    </div>
                    <div className="label">
                        <h6>Local Govenment Area</h6>
                        <p>{userData.localGov}</p>
                    </div>
                    <div className="label">
                        <h6>Number of Siblings</h6>
                        <p>{userData.noOfSiblings}</p>
                    </div>
                    <button onClick={() => {
                        window.print();
                    }}>Print</button>
                </div>
            </main>
            <BottomNav/>
        </div>
    )
}

export default Dashboard;