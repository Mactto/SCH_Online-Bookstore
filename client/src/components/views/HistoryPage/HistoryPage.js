import React, {useState} from 'react';
import {Button} from 'antd';

function HistoryPage(props) {
    const [acked, setAcked] = useState(false);
    const getHandler = () => {
        setAcked(true);
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
                        <th>상품이름</th>
                        <th>결제금액</th>
                        <th>주문수량</th>
                        <th>주문일자</th>
                        <th>주문상태</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData && 
                    props.user.userData.history.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.dateOfPurchase}</td>
                            <td>{item.ack ? 
                                acked ? 
                                    <div>판매완료</div>
                                    :
                                    <Button onClick={getHandler}>수취완료</Button> 
                                : 
                                <div>승인대기중</div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage;