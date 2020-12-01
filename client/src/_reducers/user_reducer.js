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
            return {...state }
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
        default:
            return state;
    }
}