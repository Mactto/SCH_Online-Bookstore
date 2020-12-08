import React, {useState, useEffect} from 'react';
import { Button, Descriptions, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart, onSuccessBuy } from '../../../../_actions/user_actions';
import Paypal from '../../../utils/Paypal';
import axios from 'axios';

function ProductInfo(props) {
    const dispatch = useDispatch();
    const [orderNum, setOrderNum] = useState(1);
    const [cards, setCards] = useState([]);
    const [addrs, setAddrs] = useState([]);
    const [info, setInfo] = useState({
        cardInfo: '',
        addrInfo: ''
    });

    useEffect(() => {
        let cardItems = []
        let addrItems = []

        if (props.user && props.user.card) {
            if (props.user.card.length > 0) {
                props.user.card.map((item, index) => {
                    cardItems.push({key: index, value: item.company + " " + item.num})
                })
                setCards(cardItems);
            }
        }
        if (props.user && props.user.address) {
            if (props.user.address.length > 0) {
                props.user.address.map((item, index) => {
                    addrItems.push({key: index, value: item.zipcode + " " + item.addr})
                })
                setAddrs(addrItems);
            }
        }
        setInfo({cardInfo: cardItems[0], addrInfo: addrItems[0]})
    }, [props.user])

    const clickHandler = () => {
        dispatch(addToCart({id: props.detail._id, count: orderNum}))
    }

    const upHandler = () => {
        setOrderNum(orderNum+1);
    }

    const downHandler = () => {
        if (orderNum > 1) {
            setOrderNum(orderNum-1);
        }
    }
    
    const cardChangeHandler = (e) => {
        setInfo({addrInfo: info.addrInfo, cardInfo: e.currentTarget.value});
    }

    const addrChangeHandler = (e) => {
        setInfo({cardInfo: info.cardInfo, addrInfo: e.currentTarget.value});
    }

    const transactionSuccess = (data) => {
        let body = {
            info: info,
            price: props.detail.price,
            name: props.detail.title,
            id: props.detail._id,
            quantity: orderNum, 
            paymentData: data
        }
        axios.post(`/api/users/oneSuccessBuy`, body)
        alert('구매 완료!');
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

            <div style={{margin: '10px'}}>
                    <div style={{fontSize: '30px'}}>[ 주문하기 ]</div>
                    <br />
                    <div style={{display:'flex'}}>
                        <div style={{marginRight: '20px'}}>결제 카드 선택</div>
                        <select onClick={cardChangeHandler}>
                        {cards.map(item => (
                            <option key={item.key} value={item.value}>{item.value}</option>
                        ))}
                        </select>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{marginRight: '20px'}}>배송 주소 선택</div>
                        <select onClick={addrChangeHandler}>
                        {addrs.map(item => (
                            <option key={item.key} value={item.value}>{item.value}</option>
                        ))}
                        </select>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <h2> Total Amount : {props.detail.price * orderNum}원</h2>
                    </div>
                </div>
            
            <br />
            <br />
            <br />
            
            <div style={{display:'flex', justifyContent: 'center'}}>
                <div style={{marginRight: '10px'}}>
                    <Paypal total={props.detail.price * orderNum} onSuccess={transactionSuccess}/>
                </div>

                <div style={{marginLeft: '10px'}}>
                    <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                        장바구니
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo