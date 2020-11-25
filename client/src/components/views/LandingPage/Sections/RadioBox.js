import React, {useState} from 'react';
import {Collapse, Radio} from 'antd';

const {Panel} = Collapse;

function RadioBox(props) {
    const [value, setValue] = useState(0);

    const renderRadioBox = () => (
        props.list && props.list.map(v => (
            <Radio key={v._id} value={v._id}>{v.name}</Radio>
        ))
    )

    const handleChange = (e) => {
        setValue(e.target.value);
        props.handleFilters(e.target.value);
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price" key="1">
                    <Radio.Group onChange={handleChange} value={value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox;