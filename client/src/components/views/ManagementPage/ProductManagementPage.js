import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getAllProduct, removeProduct, updateProductInfo} from '../../../_actions/user_actions'
import { Input, Button } from 'antd';

function ProductManagementPage(props) {
    const dispatch = useDispatch();
    const [targetID, setTargetID] = useState('');
    const [fix, setFix] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [discription, setDiscription] = useState('');
    const [inventory, setInventory] = useState(0);

    useEffect(() => {
        dispatch(getAllProduct())
    }, [props.user.userData])

    const removeHandler = (e) => {
        dispatch(removeProduct(e.currentTarget.value))
    }

    const titleHandler = (e) => {
        setTitle(e.currentTarget.value);
    }
    const priceHandler = (e) => {
        setPrice(e.currentTarget.value);
    }
    const discriptionHandler = (e) => {
        setDiscription(e.currentTarget.value);
    }
    const inventoryHandler = (e) => {
        setInventory(e.currentTarget.value);
    }

    const fixHandler = (e) => {
        setFix(true);
        props.user.products.map(item => {
            if (e.currentTarget.value == item._id) {
                setTargetID(item._id);
                setTitle(item.title);
                setPrice(item.price);
                setDiscription(item.discription);
                setInventory(item.inventory);
            }
        })
    }
    const submitHandler = () => {
        let body = {
            id: targetID,
            title: title,
            price: price,
            discription: discription,
            inventory: inventory,
        }
        dispatch(updateProductInfo(body)).then(alert('수정완료!'))
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

            <div style={{marginTop: '50px'}}>
                <h2>수정하기</h2>
                <div>
                    <select onClick={fixHandler}>
                        <option key='0' value='none'>선택없음</option>
                        {props.user.products && props.user.products.map(item => (
                            <option key={item._id} value={item._id}>{item.title}</option>
                        ))}
                    </select>
                    {fix ? 
                        <div>
                        <div style={{display: 'flex', marginTop: '20px'}}>
                            <Input placeholder={title} value={title} onChange={titleHandler}/>
                            <Input type="number" placeholder={price} value={price} onChange={priceHandler} />
                            <Input placeholder={discription} value={discription} onChange={discriptionHandler}/>
                            <Input type="number" placeholder={inventory} value={inventory} onChange={inventoryHandler}/>
                            <Button type="primary" onClick={submitHandler}>수정하기</Button>
                        </div>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductManagementPage;