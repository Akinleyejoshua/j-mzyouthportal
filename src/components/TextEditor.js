import {useState} from "react";
import ReactHtmlParser from "react-html-parser";

const TextEditor = (props) => {

    const [state, setState] = useState({
        value: "",
        
        
    })

    return (
        <div id="text-editor">
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
                }}><b className="fa fa-link"></b></button>
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
            {state.value !== "" && <button onClick={() => {
                props.sendData(state.value);
            }}>Publish</button>}
        </div>
    )
}

export default TextEditor;