import React, {useState} from 'react';
import {Input, Form} from 'antd';

function AddressPopup(props) {
    const [zipCode, setZipCode] = useState('');
    const [addr, setAddr] = useState('');

    const zipCodeHandler = (e) => {
        setZipCode(e.currentTarget.value);
    }

    const addrHandler = (e) => {
        setAddr(e.currentTarget.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!zipCode || !addr) {
            return alert("모든 값을 넣어주세요!");
        }

        props.func({
            zipCode: zipCode,
            addr: addr
        })
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <br />
                <br />
                <label>우편 번호</label>
                <Input onChange={zipCodeHandler} value={zipCode}/>
                <br />
                <br />
                <label>주소</label>
                <Input onChange={addrHandler} value={addr}/>
                <br />
                <br />
                <button type="submit">
                    추가하기
                </button>
            </Form>
        </div>
    )
}

export default AddressPopup;