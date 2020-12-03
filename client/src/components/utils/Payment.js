import React from 'react';
import Paypal from './Paypal';

function Payment() {
    return (
        <div>
            <div style={{margin: '10px'}}>
                    <div style={{fontSize: '30px'}}>[ 주문하기 ]</div>
                    <br />
                    <div style={{display:'flex'}}>
                        <div style={{marginRight: '20px'}}>결제 카드 선택</div>
                        <select>
                        </select>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{marginRight: '20px'}}>배송 주소 선택</div>
                        <select>
                        </select>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <h2> Total Amount : $</h2>
                    </div>
                </div>
            <Paypal />
        </div>
    )
}

export default Payment;