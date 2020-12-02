import React, {useState} from 'react';
import { Form, Input, Button } from 'antd';

function CardPopup(props) {
    const [cardNum, setCardNum] = useState("")
    const [validity, setValidity] = useState("");
    const [kind, setKind] = useState(0);
    const cardKind = [
        {key: 1, value:"농협"},
        {key: 2, value:"국민"},
        {key: 3, value:"기업"},
        {key: 4, value:"신한"},
        {key: 5, value:"우리"},
        {key: 6, value:"하나"},
        {key: 7, value:"카카오뱅크"},
    ]

    const cardNumHandler = (e) => {
        setCardNum(e.currentTarget.value);
    }
    
    const validityHandler = (e) => {
        setValidity(e.currentTarget.value);
    }

    const cardKindHanlder = (e) => {
        setKind(e.currentTarget.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (!cardNum || !validity || !kind) {
            return alert("모든 값을 넣어주세요!");
        }

        props.func({
            cardNum: cardNum,
            validity: validity,
            kind: kind,
        })
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <br />
                <br />
                <label>카드번호</label>
                <Input type="number" onChange={cardNumHandler} value={cardNum}/>
                <br />
                <br />
                <label>유효기간</label>
                <Input type="number" onChange={validityHandler} value={validity}/>
                <br />
                <br />
                <select onChange={cardKindHanlder}>
                    {cardKind.map(item => (
                        <option key={item.key} value={item.value}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    추가하기
                </button>
            </Form>
        </div>
    )
}

export default CardPopup;