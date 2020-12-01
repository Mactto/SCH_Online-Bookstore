import React, {useState} from 'react';
import {Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

function UploadProductPage(props) {
    const [name, setName] = useState("");
    const [discription, setDiscription] = useState("");
    const [price, setPrice] = useState(0);
    const [inventory, setInventory] = useState(1)
    const [images, setImages] = useState([]);

    const nameChangeHandler = (e) => {
        setName(e.currentTarget.value);
    }

    const discriptionChangeHandler = (e) => {
        setDiscription(e.currentTarget.value);
    }

    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    }

    const inventoryChangeHandler = (e) => {
        setInventory(e.currentTarget.value);
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit event");

        if (!name || !discription || !price || !images) {
            return alert("모든 값을 넣어주세요!");
        }
        
        // 서버에 채운 값들을 request로 보낸다.
        const body = {
            writer: props.user.userData._id,
            title: name,
            discription: discription,
            price: price,
            inventory: inventory,
            images: images,
        }
        Axios.post("/api/product", body)
        .then(response => {
            if(response.data.success) {
                alert("상품 업로드 완료!");
                props.history.push('/');
            }
            else {
                alert("상품 업로드 실패!");
            }
        })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> 도서 상품 업로드 </Title>
            </div>

            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages}/>
                <br />
                <br />
                <label>이름</label>
                <Input onChange={nameChangeHandler} value={name}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={discriptionChangeHandler} value={discription} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={price}/>
                <br />
                <br />
                <label>재고량</label>
                <Input type="number" onChange={inventoryChangeHandler} value={inventory}/>
                <br />
                <br />
                <button type='submit'>
                    확인
                </button>
            </Form>
        </div>
    )
}

export default UploadProductPage;