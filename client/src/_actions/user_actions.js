import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    ADD_TO_CARD,
    ADD_TO_ADDRESS,
    REMOVE_CARD_ITEM,
    REMOVE_ADDR_ITEM,
    REMOVE_PRODUCT,
    REMOVE_USER,
    CHANGE_USER_INFO,
    GET_PAYMENT_ITEM,
    CHANGE_ORDER_STATE,
    GET_USER_PAYMENT_ITEM,
    GET_ALL_PRODUCT,
    GET_ALL_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(d){
    let body = {
        productId: d.id,
        count: d.count
    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
    .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {
    const request = axios.get(`/api/product/product_by_id?id=${cartItems}&type=array`)
    .then(response => {
        // CartItem들에 해당하는 정보들을 Product Collection에서 가져온 후에
        // Quantity 정보를 넣어 준다
        userCart.forEach(cartItem => {
            response.data.forEach((productDetail, idx) => {
                if (cartItem.id === productDetail._id) {
                    response.data[idx].quantity = cartItem.quantity
                }
            })
        })
        return response.data;
    });

    return {
        type: GET_CART_ITEMS,
        payload: request,
    }
}

export function removeCartItem(productId){
    const request = axios.get(`/api/users/removeFromCart?id=${productId}`)
    .then(response => {
        response.data.cart.forEach(item => {
            response.data.productInfo.forEach((product, index) => {
                if (item.id === product.id) {
                    response.data.productInfo[index].quantity = item.quantity
                }
            })
        })

        return response.data;
    })

    return {
        type: REMOVE_CART_ITEM,
        payload: request,
    }
}

export function onSuccessBuy(data) {
    const request = axios.post(`/api/users/successBuy`, data)
    .then(response => {
        return response.data;
    });

    return {
        type: ON_SUCCESS_BUY,
        payload: request,
    }
}

export function addToCard(cardInfo) {
    let body = {
        info: cardInfo,
    }
    const request = axios.post(`${USER_SERVER}/addToCard`, body)
    .then(response => {
        return response.data;
    });

    return {
        type: ADD_TO_CARD,
        payload: request,
    }
}

export function addToAddress(addressInfo) {
    let body = {
        info: addressInfo,
    }
    const request = axios.post(`${USER_SERVER}/addToAddress`, body)
    .then(response => {
        return response.data;
    });

    return {
        type: ADD_TO_ADDRESS,
        payload: request,
    }
}

export function removeCardItem(num){
    const request = axios.get(`${USER_SERVER}/removeFromCard?num=${num}`)
    .then(response => {
        return response.data;
    })

    return {
        type: REMOVE_CARD_ITEM,
        payload: request,
    }
}

export function removeAddrItem(zipcode){
    const request = axios.get(`${USER_SERVER}/removeFromAddr?zipcode=${zipcode}`)
    .then(response => {
        return response.data;
    })

    return {
        type: REMOVE_ADDR_ITEM,
        payload: request,
    }
}

export function changeUserInfo(info){
    const request = axios.post(`${USER_SERVER}/changeUserInfo`, info)
    .then(response => {
        console.log(response);
        return response.data;
    })

    return {
        type: CHANGE_USER_INFO,
        payload: request,
    }
}

export function getPaymentItem() {
    const request = axios.get('/api/product/payment')
    .then(response => {
        return response.data;
    });

    return {
        type: GET_PAYMENT_ITEM,
        payload: request,
    }
}

export function getUserPaymentItem(info) {
    const request = axios.post('/api/product/payment', info)
    .then(response => {
        return response.data;
    });
    
    return {
        type: GET_USER_PAYMENT_ITEM,
        payload: request,
    }
}

export function changeOrderState(info) {
    const request = axios.post('/api/product/changeOrderState', info)
    .then(response => {
        return response.data;
    });
    return {
        type: CHANGE_ORDER_STATE,
        payload: request,
    }
}

export function getAllProduct() {
    const request = axios.get('/api/product/product')
    .then(response => {
        return response.data;
    });
    return {
        type: GET_ALL_PRODUCT,
        payload: request,
    }
}

export function getAllUser() {
    const request = axios.get(`${USER_SERVER}/user`)
    .then(response => {
        return response.data;
    });
    return {
        type: GET_ALL_USER,
        payload: request,
    }
}

export function removeProduct(id){
    const request = axios.get(`/api/product/removeProduct?productID=${id}`)
    .then(response => {
        return response.data;
    })

    return {
        type: REMOVE_PRODUCT,
        payload: request,
    }
}

export function removeUser(id){
    const request = axios.get(`${USER_SERVER}/removeUser?userID=${id}`)
    .then(response => {
        return response.data;
    })

    return {
        type: REMOVE_USER,
        payload: request,
    }
}