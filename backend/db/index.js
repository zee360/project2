const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userService = require('../services/user.service');
const categoryService = require('../services/category.service');
const productService = require('../services/product.service');

const initAdmin = async () => {
    const admin = await userService.getUserByEmail(process.env.ADMIN_EMAIL);

    if (!admin) {
        const email = process.env.ADMIN_EMAIL;
        const password = await bcrypt.hash( process.env.ADMIN_PASSWORD , 10);
        const newAdmin = await userService.createUser({
            name: 'Admin',
            email: email,
            password: password,
            role: 'admin',
        });
        console.log('Admin created!')
    } else if(admin.role !== 'admin') {
        await userService.updateUser(admin._id, { role: 'admin' });
        console.log('Admin role updated!')
    }
}


const seedCategories = async () => {
    [
        'Electronics',
        'Fashion',
        'Home & Garden',
        'Sports',
        'Toys',
        'Other'
    ].forEach((cat) => {
        categoryService.createCategory({
            title: cat,
        }).then(console.log)
    })
}

const seedProducts = async () => {

    [
        {
            title: 'iPhone X',
            description: 'iPhone X features a new all-screen design. Face ID, which makes your face your password',
            price: 1000,
            imageUrl: 'https://images.unsplash.com/photo-1510166089176-b57564a542b1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1424',
            category: '6287d3119bb7921054620a80'
        },
        {
            title: 'XBOX One S',
            description: 'Xbox One S features a new all-screen design. Play your games at an immersive scale',
            price: 800,
            imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1919',
            category: '6287d3119bb7921054620a80'
        }
    ] .forEach((p) => {
        productService.createProduct(p).then(console.log)
    })
}

const con = mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce'
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to DB');
        initAdmin();
    }   
});



module.exports =  con;