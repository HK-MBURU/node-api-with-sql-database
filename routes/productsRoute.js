const express=require('express')

const router=express.Router()
const{getAllProducts,getProductById,getSalesPerYear}=require('../controllers/productController')

router.get('/products',getAllProducts)
router.get('/products/:product_id',getProductById)
router.get('/products/sales/:page/:limit/:year',getSalesPerYear)




module.exports=router