import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload (props) {
    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        const formData = new FormData();
        formData.append('file', files[0]);
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        axios.post('/api/product/image', formData, config)
        .then(response => {
            if(response.data.success) {
                setImages([...Images, response.data.filePath]);
                props.refreshFunction([...Images, response.data.filePath]);
            } else {
                alert('파일을 저장하는데 실패했습니다.');
            }
        })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        // splice : (deleteIndex, how many delete)
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div 
                        style={{
                            width:300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize: '3rem'}}/>
                    </div>
                    </section>
                )}
            </Dropzone>

            <div style={{ display:'flex', width:'350px', height:'240px', overflowX: 'scroll'}}>
                        {Images.map((image, index) => (
                            <div onClick={()=>deleteHandler(image)} key={index}>
                                <img style={{ minWIdth:'300px', width: '300px', hegiht:'240px'}}
                                    src={`http://localhost:5000/${image}`}
                                />
                            </div>
                        ))}
            </div>
        </div>
    )
}

export default FileUpload
