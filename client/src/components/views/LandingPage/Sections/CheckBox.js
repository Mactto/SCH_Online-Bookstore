import React, {useState} from 'react'
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function CheckBox(props) {
    const [checked, setChecked] = useState([]);
    
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        // state에 넣어주고
        if (currentIndex == -1) {
            newChecked.push(value);
        } else { // 빼준다
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)} checked={checked.indexOf(value._id) === -1 ? false : true}/>
                <span>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Continents" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox;