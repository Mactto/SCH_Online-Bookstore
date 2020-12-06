import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAllUser, removeUser} from '../../../_actions/user_actions';
import { Card, Button } from 'antd';

function CustomerManagementPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUser())
    }, [props.user.userData])

    const removeHandler = (e) => {
        dispatch(removeUser(e.currentTarget.value))
    }

    return (
        <div style={{width: '40%', marginLeft: '30%', marginTop: '5%'}}>
            {props.user.users && props.user.users.map(item => (
                <Card title={item.title} style={{width: '100%', marginBottom: '30px', backgroundColor: '#F4E3E3'}}>
                    <img src={item.image} style={{marginBottom: '20px'}}/>
                    <p>회원번호 : {item._id}</p>
                    <p>이메일 : {item.email}</p>
                    <p>회원이름 : {item.name}</p>
                    {item.address.map(con => (
                        <div>
                            <hr />
                            <p>우편주소 : {con.zipcode}</p>
                            <p>상세주소 : {con.addr}</p>
                        </div>
                    ))}
                    {item.card.map(con => (
                        <div>
                            <hr />
                            <p>카드번호 : {con.num}</p>
                            <p>유효기간 : {con.validity}</p>
                            <p>카드회사 : {con.company}</p>
                        </div>
                    ))}
                    <hr />
                    <div style={{textAlign: 'right'}}>
                        <Button type="danger" value={item._id} onClick={removeHandler}>회원삭제</Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default CustomerManagementPage;