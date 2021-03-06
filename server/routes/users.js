const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const { auth } = require("../middleware/auth");
const async = require('async');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        image: req.user.image,
        cart: req.user.cart,
        card: req.user.card,
        address: req.user.address,
        history: req.user.history,
    });
});

router.post("/register", (req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    User.findOne({_id: req.user._id},
        (err, userInfo) => {
            let duplicate = false;
            userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            })

            if (duplicate) {
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id" : req.body.productId},
                    {$inc : {"cart.$.quantity" : req.body.count}},
                    {new:true},
                    (err, userInfo) => {
                        if (err) return res.status(400).json({success:false, err})
                        res.status(200).send(userInfo.cart)
                    }
                )
            } else {
                User.findOneAndUpdate(
                    {_id: req.user._id},
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: req.body.count,
                                data: Date.now("<YYYY-mm-dd>")
                            }
                        }
                    },
                    { new:true },
                    (err, userInfo) => {
                        if (err) return res.status(400).json({success:false, err})
                        return res.status(200).send(userInfo.cart);
                    }
                )
            }
        })
});

router.get('/removeFromCart', auth, (req, res) => {
    // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$pull": {
                "cart": {"id": req.query.id},
            }
        },
        {new: true},
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            Product.find({_id: {$in: array}})
            .populate('writer')
            .exec((err, productInfo) => {
                return res.status(200).json({
                    productInfo,
                    cart
                })
            })
        }
    )
})

router.post('/oneSuccessBuy', auth, (req, res) => {
    let transactionData = {};
    
    // 2. Payment Collection 안에 자세한 결제 정보를 넣어주기
    transactionData.product = {
        dateOfPurchase: Date.now(),
        name: req.body.name,
        id: req.body._id,
        price: req.body.price,
        quantity: req.body.quantity,
        paymentId: req.body.paymentData.paymentId,
    };
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        card: req.body.info.cardInfo,
        address: req.body.info.addrInfo
    }
    transactionData.data = req.body.paymentData;
    transactionData.ack = 0;

    const payment = new Payment(transactionData);
    payment.save((err, doc) => {
        if (err) return res.json({success: false, err})
        User.findOneAndUpdate(
            {_id: req.user._id},
            {$push: {history: payment._id}},
            {new: true},
            (err, user) => {
                if (err) return res.json({success:false, err});
            }
        )

        Product.update(
            {_id: req.body.id},
            {
                $inc: {
                    "sold" : 1,
                    "inventory": -(req.body.quantity)
                }
            },
            {new: false}
        )
    })
})

router.post('/successBuy', auth, (req, res) => {
    // 1. User Collection 안에 History 필드 안에 간단한 결제 정보 넣어주기
    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.title,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentId,
        })
    })

    // 2. Payment Collection 안에 자세한 결제 정보를 넣어주기
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        card: req.body.info.cardInfo,
        address: req.body.info.addrInfo
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    transactionData.ack = 0;

    const payment = new Payment(transactionData);
    payment.save((err, doc) => {
        console.log(payment.id);
        if (err) return res.json({success: false, err})
        User.findOneAndUpdate(
            {_id: req.user._id},
            {$push: {history: payment._id}, $set: {cart: []}},
            {new: true},
            (err, user) => {
                if (err) return res.json({success:false, err});
            }
        )

        // 3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기
        let products = [];
        doc.product.forEach(item => {
            products.push({id: item.id, quantity: item.quantity})
        })

        async.eachSeries(products, (item, callback) => {
            Product.update(
                {_id: item.id},
                {
                    $inc: {
                        "sold" : 1,
                        "inventory": -(item.quantity)
                    }
                },
                {new: false},
                callback
            )
        }, (err) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({
                success:true,
                cart: [],
                cartDetail: []
            })
        })
    })
})

router.post("/addToCard", auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $push: {
                card: {
                    num: req.body.info.cardNum,
                    validity: req.body.info.validity,
                    company: req.body.info.kind,
                }
            }
        },
        { new:true },
        (err, cardInfo) => {
            if (err) return res.status(400).json({success:false, err})
            return res.status(200).send(cardInfo.card);
        }
    )
});

router.post("/addToAddress", auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $push: {
                address: {
                    zipcode: req.body.info.zipCode,
                    addr: req.body.info.addr

                }
            }
        },
        { new:true },
        (err, addressInfo) => {
            if (err) return res.status(400).json({success:false, err})
            return res.status(200).send(addressInfo.address);
        }
    )
});

router.get("/withdrawal", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        User.remove({_id: req.user._id},
            (err, respronse) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true
                });
            }
        )
    });
})

router.get('/removeFromCard', auth, (req, res) => {
    // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
    console.log(req.query.num);
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$pull": {
                "card": {"num": req.query.num},
            }
        },
        {new: true},
        (err, cardInfo) => {
            if (err) return res.status(400).json({success:false, err})
            return res.status(200).json(cardInfo.card)
        }
    )
})

router.get('/removeFromAddr', auth, (req, res) => {
    // 먼저 cart 안에 내가 지우려고 한 상품을 지워주기
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$pull": {
                "address": {"zipcode": req.query.zipcode},
            }
        },
        {new: true},
        (err, addrInfo) => {
            if (err) return res.status(400).json({success:false, err})
            return res.status(200).json(addrInfo.address)
        }
    )
})

router.post('/changeUserInfo', auth, (req, res) => {
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            "$set": {
                "email": req.body.email,
                "name": req.body.name,
            }
        },
        {new: true},
        (err, userData) => {
            if (err) return res.status(400).json({success:false, err})
            return res.status(200).json({name: userData.name, email: userData.email});
        }
    )
})

router.get('/user', (req, res) => {
    User.find({role: 0})
    .exec((err, users) => {
        if(err) return res.status(400).send({success: false, err});
        return res.status(200).send(users);
    })
});

router.get('/removeUser', (req, res) => {
    User.remove({_id: req.query.userID})
    .exec((err, products) => {
        User.find({})
        .exec((err, users) => {
            if(err) return res.status(400).send({success: false, err});
            return res.status(200).send(users);
        })
    })
});


module.exports = router;
