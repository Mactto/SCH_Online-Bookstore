import React, {useState} from 'react';
import { Button, Descriptions, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {
    const dispatch = useDispatch();
    const [orderNum, setOrderNum] = useState(1);

    const clickHandler = () => {
        dispatch(addToCart({id: props.detail._id, count: orderNum}))
    }

    const upHandler = () => {
        setOrderNum(orderNum+1);
    }

    const downHandler = () => {
        if (orderNum > 1){
            setOrderNum(orderNum-1);
        }
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="판매가">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="판매수">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="재고량">{props.detail.inventory}</Descriptions.Item>
                <Descriptions.Item label="책 설명">{props.detail.discription}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />

            <div style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>주문수량 : <Input style={{width: 100}} value={orderNum}/></div>
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <Button style={{height: '50%'}} type="primary" onClick={upHandler}>▲</Button>
                    <Button style={{height: '50%'}} type="primary" onClick={downHandler}>▼</Button>
                </div>
            </div>

            <br />
            <br />
            <br />
            
            <div style={{display:'flex', justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo