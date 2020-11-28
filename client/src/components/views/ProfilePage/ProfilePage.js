import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Button} from 'antd';
import CardPopup from './Sections/CardPopup';
import AddressPopup from './Sections/AddressPopup';
import { addToCard } from '../../../_actions/user_actions';
import { addToAddress } from '../../../_actions/user_actions';

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

    const renderCards = () => (
        props.user.userData.card.map((item, index) => (
            <tr key={index}>
                <td>{item.num}</td>
                <td>{item.validity}</td>
                <td>{item.company}</td>
            </tr>
        ))
    )

    const renderAddrs = () => (
        props.user.userData.address.map((item, index) => (
            <tr key={index}>
                <td>{item.zipcode}</td>
                <td>{item.addr}</td>
            </tr>
        ))
    )

    return (
        <div>
            {props.user.userData && 
            <div style={{marginLeft: 50, marginTop: 50, fontSize:25}}>
                <Row gutter={[16,16]}>
                    <Col>[ 회원 정보 ]</Col>
                    <Col>User ID : {modify ? <div>input</div> : props.user.userData._id}</Col>
                    <Col>Email : {modify ? <div>input</div> : props.user.userData.email}</Col>
                    <Col>Name : {modify ? <div>input</div> : props.user.userData.name}</Col>
                </Row>
                <Row gutter={[16,16]}>
                    <Col>[ 카드 정보 ]</Col>
                    {!cardPopup && 
                        <table>
                            <thead>
                                <tr>
                                    <td>카드번호</td>
                                    <td>유효기간</td>
                                    <td>카드회사</td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCards()}
                            </tbody>
                        </table>}
                    {cardPopup ? <CardPopup func={cardPopupHandler}/> : <Button type="primary" onClick={addCardHandler}>카드 추가</Button>}
                </Row>
                <Row gutter={[16,16]}>
                    <Col>[ 배송 주소 ]</Col>
                    {!addressPopup && 
                            <table>
                                <thead>
                                    <tr>
                                        <td>우편번호</td>
                                        <td>상세주소</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderAddrs()}
                                </tbody>
                            </table>
                    }
                    {addressPopup ? <AddressPopup func={addressPopupHandler}/> : <Button type="primary" onClick={addAddressHandler}>배송지 추가</Button>}
                </Row>
                {modify ? (<Button type="primary" onClick={confirmHandler}>수정완료</Button>) : (<Button type="primary" onClick={modifyHandler}>프로필 수정</Button>)}
            </div>
        }
        </div>
    )
}

export default ProfilePage;