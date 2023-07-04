import Tab from "./Tab"

function Home(){
    let panelStyle = {
        width : '90vw',
        padding : '5px',
        margin : '15px',
        marginTop : '50px'
    }
    return(
        <div className="mainPanel" style={panelStyle}>
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
        </div>
    )
}

export default Home