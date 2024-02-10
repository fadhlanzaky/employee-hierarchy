import React from "react";
import Tree from "react-d3-tree"



// transforms data collected from the backend service to d3's Tree data format recursively
const constructTree = (dataArray) => {

    if(dataArray.length < 1){
        return {}
    }
    const data = dataArray.shift()

    const tree = {
        'name': data.name,
        'attributes': {
            'id': data.id,
            'managerId': data.managerId
        },
    }

    if(data.managerId){
        tree['children'] = [constructTree(dataArray)]
    }else{
        return tree
    }
    return tree
}


// displays d3 Tree
const DisplayTree = (prop) => {
    
    if(prop.data.length > 0){
        const tree = constructTree(prop.data);
        // const tree = {}

        return (
            <Tree
            data={tree}
            collapsible={false}
            pathFunc="step"
            translate={prop.treeTranslate}
            orientation="vertical"
            />
        )
    }

    return
    
  }

export default DisplayTree


