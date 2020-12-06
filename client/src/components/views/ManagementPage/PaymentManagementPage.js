import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getPaymentItem, changeOrderState } from '../../../_actions/user_actions';
import { Button } from 'antd';

function PaymentManagementPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPaymentItem())
    }, [props.user.userData])

    const stateHandler = (e) => {
        let body = {
            paymentId: e.currentTarget.value,
        }
        dispatch(changeOrderState(body))
    }

    const calTotalPrice = (index) => {
        let total = 0;
        props.user.paymentDetail[index].product.map(item => {
            total += item.price * item.quantity;
        })
        return total;
    }

    return (
        <div style={{width: '80%', marginLeft: '10%', marginTop: '5%'}}>
            <table>
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>결제코드</td>
                        <td>결제유저코드</td>
                        <td>결제유저이름</td>
                        <td>결제금액</td>
                        <td>주문승인</td>
                    </tr>    
                </thead>
                <tbody>
                {props.user.paymentDetail && props.user.paymentDetail.map((item, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item._id}</td>
                        <td>{item.user[0].id}</td>
                        <td>{item.user[0].name}</td>
                        <td>{calTotalPrice(index)}</td>
                        {item.ack === 0 && <td><Button type="primary" value={item._id} onClick={stateHandler}>승인</Button></td>}
                        {item.ack === 1 && <td>{'승인완료'}</td>}
                        {item.ack === 2 && <td>{'판매완료'}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentManagementPage;