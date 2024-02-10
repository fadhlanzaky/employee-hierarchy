import React, {useEffect, useState, useRef} from 'react'
import SearchBar from './search'
import { isLogged } from '../auth';
import { useNavigate } from 'react-router-dom';
import DisplayTree from './tree';


// render the main page. 
const Main = (prop) => {

    const navigate = useNavigate();
    const logged = isLogged();

    // checks authentication
    useEffect(()=>{
        if(!logged){
            navigate('/signin');
        }else{
            return
        }
    })

    const shouldRecenterTreeRef = useRef(true);
    const [treeTranslate, setTreeTranslate] = useState({ x: 0, y: 0 });
    const treeContainerRef = useRef(null);

    // calculates display's dimension
    // this will center the Tree graph
    useEffect(() => {
        
        if (treeContainerRef.current && shouldRecenterTreeRef.current) {
            shouldRecenterTreeRef.current = false;
            const dimensions = treeContainerRef.current.getBoundingClientRect();
    
            setTreeTranslate({
            x: dimensions.width / 2,
            y: dimensions.height / 6,
            });

        }
    });
    
    const [employee, setEmployee] = useState([]);

    return (
        <div className='row main-board'>
            <div className='col-12 mb-3' style={{'textAlign': "center"}}>
                <h1>
                    Employee Hierarchy
                </h1>
            </div>
            <div className='col-sm-12 col-lg-12 d-flex justify-content-center'><SearchBar employee={setEmployee} alert={prop.alert}/></div>
            <div className='col-md-12 col-lg-12' id="tree-canvas" style={{'minHeight': '60vh'}} ref={treeContainerRef}>{employee && employee.length > 0 && <DisplayTree data={employee} treeTranslate={treeTranslate} treeContainerRef={treeContainerRef}/>}</div>
        </div>
    )
}

export default Main