import React, {useState} from 'react';
import {Button} from 'antd';

function HistoryPage(props) {
    const getHandler = (e) => {
        console.log(e.currentTarget.key)
    }

    return (
        <div style={{width:'80%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h1>History</h1>
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
                        <th>수취</th>
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
                            <td>{item.state ? <div>판매완료</div> : <div>신청</div>}</td>
                            <td>{item.state ? <Button disabled>수취완료</Button> : <Button onClick={getHandler}>수취완료</Button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage;