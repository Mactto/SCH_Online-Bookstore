import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getPaymentItem, changeOrderState, getAllUser } from '../../../_actions/user_actions';
import { Button } from 'antd';

function PaymentManagementPage(props) {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        dispatch(getPaymentItem()).then(res => setFilter(res.payload));
        dispatch(getAllUser());
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

    const filterHandler = (e) => {
        setFilter([]);
        if (e.currentTarget.value === 'all') {
            setFilter(props.user.paymentDetail);
        } else {
            let array = []
            props.user.paymentDetail.map(item => {
                if (item.user[0].id == e.currentTarget.value) {
                    array.push(item);
                }
            })
            setFilter(array);
        }
    }

    return (
        <div style={{width: '80%', marginLeft: '10%', marginTop: '5%'}}>
            <div style={{textAlign: 'right', marginBottom: '20px'}}>
            <select onClick={filterHandler}>
                <option key='0' value='all'>전체</option>
                {props.user.users && props.user.users.map(item => (
                    <option key={item._id} value={item._id}>{item._id + ' ' + item.name}</option>
                ))}
            </select>
            </div>

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
                {props.user.paymentDetail && filter.map((item, index) => (
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