const Loader = () => {
    let msg = ["Please wait...", "Good things take time", "Kindly be patient", "Love is Kind", "Peace be unto you"];
    const i = Math.floor(Math.random() * msg.length);
    
    return (
        <div className="loader">
            <div id="ld-center">
                <div className="bg"></div> 
                <div className="circle"></div> 
                <div className="circle"></div> 
                <div className="circle"></div> 
                <div className="circle"></div> 
                <div className="circle"></div>
            </div>
            <p>{msg[i]}</p>
        </div>
    )
}

export default Loader;