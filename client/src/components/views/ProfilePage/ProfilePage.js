import React, {useState, useEffect} from 'react';
import {Row, Col, Button} from 'antd';

// 등록된 회원은 결제할 카드(카드종류, 카드번호, 유효기간)와 배송주소(우편번호, 주소)를 등록할 수 있다. 
// 단 카드는 여러 개 등록 가능, 배송주소는 자택과 직장 두 가지

function ProfilePage(props) {
    const [modify, setModify] = useState(false);


    const modifyHandler = () => {
        setModify(true);
    }

    const confirmHandler = () => {
        setModify(false);
    } 

    return (
        <div>
            {props.user.userData && 
            <div style={{marginLeft: 50, marginTop: 50, fontSize:25}}>
                <div>{console.log(props.user.userData)}</div>
                <Row gutter={[16,16]}>
                    <Col>[ 회원 정보 ]</Col>
                    <Col>User ID : {modify ? <div>input</div> : props.user.userData._id}</Col>
                    <Col>Email : {modify ? <div>input</div> : props.user.userData.email}</Col>
                    <Col>Name : {modify ? <div>input</div> : props.user.userData.name}</Col>
                </Row>
                <Row gutter={[16,16]}>
                    <Col>[ 카드 정보 ]</Col>
                </Row>
                {modify ? (<Button type="primary" onClick={confirmHandler}>수정완료</Button>) : (<Button type="primary" onClick={modifyHandler}>프로필 수정</Button>)}
            </div>
        }
        </div>
    )
}

export default ProfilePage;