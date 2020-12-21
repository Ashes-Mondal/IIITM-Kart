import React,{useReducer,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from './Components/CardList';
import SearchBox from './Components/SearchBox';

const reducer = (currState,action)=>{
    switch(action.type){
        case 'fetchedRobotJson':
            console.log("dispatch-robotsData",action.payload);
            return action.payload
        default:
            return currState
    };
}

const App = () => {
    //const cart = React.createContext()
    const [robots, dispatch] = useReducer(reducer, []);

    //side effect when page first time rendered
    useEffect(() => {
        const URL = "http://localhost:8000";

        const fetchJSON_fromServer = async ()=>{
            const robotsData = await (await fetch(URL)).json()
            dispatch({type:"fetchedRobotJson",payload:robotsData});
        }
        fetchJSON_fromServer();
    }, [])

    return (
        //<cart.provider value={hbh}>
        <div className = "container" >
            <h1>RoboFriends</h1>
            <SearchBox />
            <CardList robots={robots} />
        </div>
        //</cart.provider>
    )
}

export default App;