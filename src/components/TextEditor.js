import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import Firebase from "../db/Firebase";
import ReactHtmlParser from "react-html-parser";
import Alert from "../components/Alert";
import Loader from "../components/Loader";


const TextEditor = (props) => {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        value: "",
        imgBlob: "",
        loading: false
    })

    const profile = useSelector(state => state.profile);
    const mysettings = useSelector(state => state.mysettings);

    return (
        <div id="text-editor">
            {state.loading === true && <Loader/>}
            {mysettings.alert === true && <Alert content="loading Picture, Be Patient"/>}
            <div className="toolbar">
                <button onClick={() => {
                    setState(prevState => ({
                        value: prevState.value + "<h3> </h3>",
                    }))
                }}><h3>H</h3></button>
                <button onClick={() => {
                    setState(prevState => ({
                        value: prevState.value + "<p> </p>",
                    }))
                }}><p>P</p></button>
                <button onClick={() => {
                    setState(prevState => ({
                        value: prevState.value + "<i> </i>",
                    }))
                }}><i>I</i></button>
                <button onClick={() => {
                    setState(prevState => ({
                        value: prevState.value + "<u> </u>",
                    }))
                }}>U</button>
                <button onClick={() => {
                    setState(prevState => ({
                        value: prevState.value + "<b> </b>",
                    }))
                }}><b>B</b></button>
                <button onClick={() => {
                    let link = prompt("Provide a url for the link");
                    let name = prompt("Provide a name for the link")
                    setState(prevState => ({
                        value: prevState.value + `<a href=${link} target='_blank'>${name}</a>`,
                    }))
                }}><i className="fa fa-link"></i></button>
                <button className="fa fa-image"
                    style={{
                        position: "relative"
                    }}>
                    <input type="file"
                        className="hidden"
                        onChange={(event) => {
                            setState({
                                ...state,
                                imgBlob: event.target.files[0],
                                loading: true
                            })
                            dispatch({
                                type: "toggle_alert",
                                alert: true,
                            });
                            let random = Math.floor( Math.random() * 1000000000000);
                            Firebase().storage.ref(`images/${profile.uid}/feeds/${random}.jpg`)
                            .put(event.target.files[0])
                            .then(() => {
                                Firebase().storage.ref(`images/${profile.uid}/feeds/${random}.jpg`)
                                .getDownloadURL()
                                .then(url => {
                                    dispatch({
                                        type: "toggle_alert",
                                        alert: false,
                                    });
                                    setState({
                                        ...state,
                                        loading: false
                                    })
                                    setState(prevState => ({
                                        value: prevState.value + `<img src='${url}' alt=''/>`,
                                    }))
                                })
                            })
                        }
                    }/>   
                </button>
            </div>
            <h5>Content</h5>
            <textarea placeholder="*Help tips*
                when using the text formatter
                * H : Header
                * P : Paragraph
                * U : Underline
                * B : Bold
                Write the content in between the tags
                e.g <h3>Hello</h3>
            "
                value={(state.value)}
                onChange={(event) => {
                    setState(prevState => ({
                        value: event.target.value
                    }))
            }} className="editor"/>
            <h5>Preview</h5>
            <div className="editor">{ReactHtmlParser(state.value)}</div>
            {state.value !== "" && <button
                style={{
                    background: "royalblue",
                    color: "white",
                    borderRadius: ".2rem",
                    boxShadow: "0 0 5px gray",
                }}
                onClick={() => {
                    props.sendData(state.value);
            }}>Publish</button>}
        </div>
    )
}

export default TextEditor;