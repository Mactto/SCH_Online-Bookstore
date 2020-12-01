import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Button} from 'antd';

function profilePopup(props) {
    const [modify, setModify] = useState(false);

    const modifyHandler = () => {
        setModify(true);
    }

    const confirmHandler = () => {
        setModify(false);
    } 

    return (
        <div>
            <Row gutter={[16,16]}>
                <Col>[ 회원 정보 ]</Col>
                <Col>유저 ID : {modify ? <div>input</div> : props._id}</Col>
                <Col>이메일 : {modify ? <div>input</div> : props.email}</Col>
                <Col>이름 : {modify ? <div>input</div> : props.name}</Col>
                {modify ? (<Button type="primary" onClick={confirmHandler}>수정완료</Button>) : (<Button type="primary" onClick={modifyHandler}>프로필 수정</Button>)}
            </Row>
        </div>
    )
}

export default profilePopup;