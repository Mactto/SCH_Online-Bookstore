import React, {useState} from 'react';
import { Button, Descriptions, Badge } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {
    const dispatch = useDispatch();
    const [orderNum, setOrderNum] = useState(0);

    const clickHandler = () => {
        dispatch(addToCart(props.detail._id))
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
            
            <div style={{display:'flex', justifyContent: 'center'}}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo