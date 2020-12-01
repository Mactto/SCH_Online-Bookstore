import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Row, Col, Button} from 'antd';
import CardPopup from './Sections/CardPopup';
import AddressPopup from './Sections/AddressPopup';
import { USER_SERVER } from '../../Config';
import { addToCard, addToAddress, removeCardItem } from '../../../_actions/user_actions';

// 등록된 회원은 결제할 카드(카드종류, 카드번호, 유효기간)와 배송주소(우편번호, 주소)를 등록할 수 있다. 
// 단 카드는 여러 개 등록 가능, 배송주소는 자택과 직장 두 가지

function ProfilePage(props) {
    const dispatch = useDispatch();
    const [cardPopup, setCardPopup] = useState(false);
    const [addressPopup, setAddressPopup] = useState(false);
    const [modify, setModify] = useState(false);

    //-------------------------------------Card--------------------------------------------
    const addCardHandler = () => {
        setCardPopup(true);
    }

    const cardPopupHandler = (cardInfo) => {
        setCardPopup(false);
        dispatch(addToCard(cardInfo));
    }

    //-------------------------------------Address--------------------------------------------
    const addAddressHandler = () => {
        setAddressPopup(true);
    }

    const addressPopupHandler = (addressInfo) => {
        setAddressPopup(false);
        dispatch(addToAddress(addressInfo));
    }

    const modifyHandler = () => {
        setModify(true);
    }

    const confirmHandler = () => {
        setModify(false);
    } 

    const removeFromCard = (num) => {
        dispatch(removeCardItem(num))
        .then(response => {
            console.log(response);
        })
    }

    const renderCards = () => (
        props.user.userData && props.user.userData.card.map((item, index) => (
            <tr key={index}>
                <td>{item.num}</td>
                <td>{item.validity}</td>
                <td>{item.company}</td>
                <td><Button type="primary" onClick={() => removeFromCard(item.num)}>삭제</Button></td>
            </tr>
        ))
    )

    const renderAddrs = () => (
        props.user.userData.address.map((item, index) => (
            <tr key={index}>
                <td>{item.zipcode}</td>
                <td>{item.addr}</td>
                <td><Button type="primary">삭제</Button></td>
            </tr>
        ))
    )

    const withdrawal = () => {
        axios.get(`${USER_SERVER}/withdrawal`)
        .then(response => {
            if (response.status == 200) {
                props.history.push("/");
                alert('정상적으로 탈퇴 처리 되었습니다!');
            } else {
                alert('Log Out Failed');
            }
        })
    }

    return (
        <div style={{width: '80%'}}>
            {props.user.userData && 
            <div style={{marginLeft: '150px', marginTop: 50, fontSize:15}}>
                {!modify &&
                <Row gutter={[16,16]}>
                    <Col>[ 회원 정보 ]</Col>
                    <Col><img src={props.user.userData.image}/></Col>
                    <Col>유저 고유 ID : {modify ? <div>input</div> : props.user.userData._id}</Col>
                    <Col>이메일 : {modify ? <div>input</div> : props.user.userData.email}</Col>
                    <Col>이름 : {modify ? <div>input</div> : props.user.userData.name}</Col>
                    <Button type="primary" onClick={modifyHandler}>프로필 수정</Button>
                </Row>
                }
                <Row style={{marginTop: '50px'}} gutter={[16,16]}>
                    <Col>[ 카드 정보 ]</Col>
                    {!cardPopup && 
                        <table>
                            <thead>
                                <tr>
                                    <td>카드번호</td>
                                    <td>유효기간</td>
                                    <td>카드회사</td>
                                    <td>수정</td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCards()}
                            </tbody>
                        </table>}
                    {cardPopup ? <CardPopup func={cardPopupHandler}/> : <Button type="primary" onClick={addCardHandler}>카드 추가</Button>}
                </Row>
                <Row style={{marginTop: '50px'}} gutter={[16,16]}>
                    <Col>[ 배송 주소 ]</Col>
                    {!addressPopup && 
                            <table>
                                <thead>
                                    <tr>
                                        <td>우편번호</td>
                                        <td>상세주소</td>
                                        <td>수정</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderAddrs()}
                                </tbody>
                            </table>
                    }
                    {addressPopup ? <AddressPopup func={addressPopupHandler}/> : <Button type="primary" onClick={addAddressHandler}>배송지 추가</Button>}
                </Row>
                <Row style={{marginTop: '50px'}} gutter={[16,16]}>
                    <Button style={{backgroundColor: 'red', color: 'white'}} onClick={withdrawal}>
                        회원탈퇴
                    </Button>
                </Row>
            </div>
        }
        </div>
    )
}

export default ProfilePage;