import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getPaymentItem, changeOrderState } from '../../../_actions/user_actions';
import { Button } from 'antd';

function ManagementPage(props) {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);

    useEffect(() => {
        dispatch(getPaymentItem())
        .then(response => setList(response.payload));
    }, [])

    const stateHandler = (e) => {
        let body = {
            paymentId: list[e.currentTarget.value]._id,
        }
        console.log(body);
        dispatch(changeOrderState(body))
        .then(response => setList(response.payload));
    }

    return (
        <div style={{width: '80%', marginLeft: '10%', marginTop: '5%'}}>
            <div>{console.log(list)}</div>
            <table>
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>결제코드</td>
                        <td>결제유저</td>
                        <td>상품코드</td>
                        <td>결제금액</td>
                        <td>주문승인</td>
                    </tr>    
                </thead>
                <tbody>
                {list && list.map((item, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item._id}</td>
                        <td>{item.user[0].id}</td>
                        <td>{item.product[0].id}</td>
                        <td>{item.product[0].price * item.product[0].quantity}</td>
                        <td>{item.ack ? <div>승인완료</div> : <Button type="primary" value={index} onClick={stateHandler}>승인</Button>}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagementPage;