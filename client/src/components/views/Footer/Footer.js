import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> 순천향대학교 컴퓨터공학과 20184067 최세환 <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
