import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getUserPaymentItem} from '../../../_actions/user_actions';
import {Button} from 'antd';

function HistoryPage(props) {
    const dispatch = useDispatch();
    const [acked, setAcked] = useState(false);
    const [list, setList] = useState(false);
    const getHandler = () => {
        setAcked(true);
    }

    const viewHandler = () => {
        dispatch(getUserPaymentItem({history: props.user.userData.history}))
        .then(response => console.log(response))
        if (list) {
            setList(false)
        } else {
            setList(true)
        }
    }

    const ackHandler = () => {
        setAcked(true);
    }

    if (list) {
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
                        {props.user.userData.paymentData && 
                        props.user.userData.paymentData.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item._id}</td>
                                <td>{item.product.length > 1 ? item.product[0].name + ' 포함 ' + item.product.length : item.product[0].name}</td>
                                <td>{item.product.length > 1 ? item.product[0].price : item.product[0].price}</td>
                                <td>{item.product[0].dateOfPurchase}</td>
                                <td>{item.ack ? acked ? '판매완료' : <Button type="primary" onClick={ackHandler}>수취완료</Button> : '승인대기중'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{marginTop: '100px'}}>
                    {!list && <Button type="primary" onClick={viewHandler}>자세히보기</Button>}
                </div>
            </div>
        )
    } else {
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
                        </tr>
                    </thead>
                    <tbody>
                        {props.user.userData && 
                        props.user.userData.history.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button type="primary" onClick={viewHandler}>자세히보기</Button>
            </div>
        )
    }
}

export default HistoryPage;