import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAllProduct, removeProduct} from '../../../_actions/user_actions'
import { Input, Button } from 'antd';

function ProductManagementPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProduct())
    }, [props.user.userData])

    const removeHandler = (e) => {
        dispatch(removeProduct(e.currentTarget.value))
    }

    return ( 
        <div style={{width: '80%', marginLeft: '10%', marginTop: '5%'}}>
            <table>
                <thead>
                    <tr>
                        <td>Index</td>
                        <td>상품번호</td>
                        <td>상품명</td>
                        <td>가격</td>
                        <td>상품설명</td>
                        <td>재고량</td>
                        <td>삭제</td>
                    </tr>    
                </thead>
                <tbody>
                    {props.user.products && props.user.products.map((item, index) => (
                        <tr>
                            <td>{index}</td>
                            <td>{item._id}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.discription}</td>
                            <td>{item.inventory}</td>
                            <td><Button type="danger" value={item._id} onClick={removeHandler}>삭제</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{display: 'flex', marginTop: '50px'}}>
                <Input placeholder="상품번호" />
                <Input placeholder="상품명" />
                <Input placeholder="가격" />
                <Input placeholder="상품설명" />
                <Input placeholder="재고량" />
                <Button type="primary">수정하기</Button>
            </div>
        </div>
    )
}

export default ProductManagementPage;