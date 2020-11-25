import React, { useState, useEffect } from 'react';
import ImageGallery from'react-image-gallery';

function ProdcutImage(props) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let img = []
            props.detail.images.map(item => {
                img.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(img);
        }
    }, [props.detail]);

    return (
        <div>
            <ImageGallery items={images}/>
        </div>
    )
}

export default ProdcutImage;