import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Icon, Col, Card, Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents, price } from './Sections/Datas';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [postSize, setPostSize] = useState(0);
    const [filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [searchTerm, setSearchTerm] = useState('');

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                if (body.loadMore) {
                    setProducts([...products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo);
                }
                setPostSize(response.data.postSize)
            } else {
                alert("상품들을 가져오는데 실패했습니다.");
            }
        })
    }

    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
            loadMore: false
        }
        getProducts(body);
    }, [])
    
    const renderCards = products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card cover={<a href={`product/${product._id}`}><ImageSlider images={product.images}/></a>}>
                <Meta title={product.title} description={`$${product.price}`}/>
            </Card>
            </Col>
    })

    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const showFilteredResults = (filter) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filter
        }

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filter, category) => {
        const newFilters = {...filters}
        newFilters[category] = filter;

        if (category === "price") {
            let priceValues = handlePrice(filter)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);

        let body = {
            skip: 0,
            limit: Limit,
            filter: filters,
            searchTerm: newSearchTerm
        }
        setSkip(0);
        setSearchTerm(newSearchTerm);
        getProducts(body);
    }

    return (
        <div style={{width:'75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center' }}>
                <h2> 도서 목록 </h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filter => handleFilters(filter, "continent")}/>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filter => handleFilters(filter, "price")}/>
                </Col>
            </Row>
            
            <div style={{display:"flex", justifyContent:"flex-end", margin: '1rem auto'}}>
                <SearchFeature refreshFunction={updateSearchTerm}/>
            </div>

            <br />

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br />

            {postSize >= Limit && 
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }
        </div>
    )
}

export default LandingPage
