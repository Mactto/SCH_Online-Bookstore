import React, { useState, useEffect } from 'react';
import {Empty, Result} from 'antd';
import {useDispatch} from 'react-redux'
import {getCartItems, removeCartItem, onSuccessBuy} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [cards, setCards] = useState([]);
    const [addrs, setAddrs] = useState([]);
    const [info, setInfo] = useState({
        cardInfo: '',
        addrInfo: ''
    });

    useEffect(() => {
        let cartItems = []
        let cardItems = []
        let addrItems = []

        // 리덕스 User state 안에 cart 안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then(response => {calculateTotal(response.payload)})
            }
        }
        if (props.user.userData && props.user.userData.card) {
            if (props.user.userData.card.length > 0) {
                props.user.userData.card.map((item, index) => {
                    cardItems.push({key: index, value: item.company + " " + item.num})
                })
                setCards(cardItems);
            }
        }
        if (props.user.userData && props.user.userData.address) {
            if (props.user.userData.address.length > 0) {
                props.user.userData.address.map((item, index) => {
                    addrItems.push({key: index, value: item.zipcode + " " + item.addr})
                })
                setAddrs(addrItems);
            }
        }
        setInfo({cardInfo: cardItems[0], addrInfo: addrItems[0]})
    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity; 
        })
        setTotal(total)
        setShowTotal(true);
    }

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then(response => {
            if(response.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
        })
    }

    const cardChangeHandler = (e) => {
        setInfo({addrInfo: info.addrInfo, cardInfo: e.currentTarget.value});
    }

    const addrChangeHandler = (e) => {
        setInfo({cardInfo: info.cardInfo, addrInfo: e.currentTarget.value});
    }

    const transactionSuccess = (data) => {
        dispatch(onSuccessBuy({info: info, paymentData: data, cartDetail: props.user.cartDetail}))
        .then(response => {
            if(response.payload.success) {
                setShowTotal(false);
                setShowSuccess(true);
            }
        })
    }

    return (
        <div style={{width:'85%', margin: '3rem auto'}}>
            <h1>장바구니</h1>
            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>

            <br />
            <br />
            <br />
            <br />
            

            {showTotal ? 
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
                        <h2> Total Amount : ${total}</h2>
                    </div>
                </div>
                : showSuccess ?
                    <Result
                    status="success"
                    title="Successfully Purchased Items!"
                    /> 
                    : 
                    <div><br/><Empty description={false}/></div>
            }

            {showTotal && <Paypal total={total} onSuccess={transactionSuccess}/>}
            
        </div>
    )
}

export default CartPage;