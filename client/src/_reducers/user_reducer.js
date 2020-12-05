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
    CHANGE_USER_INFO,
    GET_PAYMENT_ITEM,
    GET_USER_PAYMENT_ITEM,
    CHANGE_ORDER_STATE,
    GET_ALL_PRODUCT,
    GET_ALL_USER,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state, products: action.payload }
        case ADD_TO_CART:
            return {...state, userData: {...state.userData, cart: action.payload}}
        case GET_CART_ITEMS:
            return {...state, cartDetail: action.payload}
        case REMOVE_CART_ITEM:
            return {...state, cartDetail: action.payload.productInfo, userData:{...state.userData, cart: action.payload.cart}}
        case ON_SUCCESS_BUY:
            return {...state, cartDetail: action.payload.cartDetail, userData:{...state.userData, cart: action.payload.cart}}         
        case ADD_TO_CARD:
            return {...state, userData: {...state.userData, card: action.payload}}
        case ADD_TO_ADDRESS:
            return {...state, userData: {...state.userData, address: action.payload}}
        case REMOVE_CARD_ITEM:
            return {...state, userData: {...state.userData, card: action.payload}}
        case REMOVE_ADDR_ITEM:
            return {...state, userData: {...state.userData, address: action.payload}}
        case REMOVE_PRODUCT:
            return {...state, products: action.payload}
        case CHANGE_USER_INFO:
            return {...state, userData: {...state.userData, name: action.payload.name, email: action.payload.email}}
        case GET_PAYMENT_ITEM:
            return {...state, paymentDetail: action.payload}
        case GET_USER_PAYMENT_ITEM:
            return {...state, paymentData: action.payload}
        case CHANGE_ORDER_STATE:
            return {...state, paymentDetail: action.payload}
        case GET_ALL_PRODUCT:
            return {...state, products: action.payload}
        case GET_ALL_USER:
            return {...state, users: action.payload}
        default:
            return state;
    }
}