import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUserPaymentItem, changeOrderState} from '../../../_actions/user_actions';
import {Button} from 'antd';

function HistoryPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        props.user.userData && dispatch(getUserPaymentItem({history: props.user.userData.history}))
    }, [props.user.userData])

    const ackHandler = (e) => {
        let body = {
            paymentId: e.currentTarget.value,
        }
        dispatch(changeOrderState(body))
    }

    const calTotalPrice = (index) => {
        let total = 0;
        props.user.paymentData[index].product.map(item => {
            total += item.price * item.quantity;
        })
        return total;
    }

    return (
        <div style={{width:'80%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h1>결제내역</h1>
            </div>
            <br />
    
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>결제코드</th>
                        <th>주문상품</th>
                        <th>결제금액</th>
                        <th>주문날짜</th>
                        <th>상태</th>
                    </tr>
                 </thead>
                <tbody>
                    {props.user.paymentData && 
                    props.user.paymentData.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item._id}</td>
                            <td>{item.product.length > 1 ? item.product[0].name + ' 외 ' + (item.product.length-1) + '개' : item.product[0].name}</td>
                            <td>{calTotalPrice(index)}</td>
                            <td>{item.product[0].dateOfPurchase}</td>
                            {item.ack === 0 && <td>{'승인대기중'}</td>}
                            {item.ack === 1 && <td><Button type="primary" value={item._id} onClick={ackHandler}>수취완료</Button></td>}
                            {item.ack === 2 && <td>{'판매완료'}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage;