const { userModel } = require("../../modules/admin/user/users.model");
const { copyObject } = require("./convertObject.utils");

async function getUserBasket(userId){
    const basket = await userModel.aggregate([
        { $match: { _id: userId } },
        {
            $project: { basket: 1 }
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.products.productId",
                foreignField: "_id",
                as: 'productDetails'
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "basket.courses.courseId",
                foreignField: "_id",
                as: 'courseDetails'
            }
        },
        {
            $addFields: {
                "productDetails": {
                    $function: {
                        body: function (productDetails, products) {
                            return productDetails.map(function (product) {
                                const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count;
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args: ["$productDetails", "$basket.products"],
                        lang: "js"
                    },
                },
                "courseDetails": {
                    $function: {
                        body: function (courseDetails) {
                            return courseDetails.map(function (course) {
                                const totalPrice = 1 * course.price
                                return {
                                    ...course,
                                    finalPrice: totalPrice - ((course.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args: ["$courseDetails", "$basket.courses"],
                        lang: "js"
                    },
                },
                "paymentDetails": {
                    $function: {
                        body: function (courseDetails, productDetails, products) {
                            let courseAmount =0 ;
                            if(courseDetails.length > 0){
                                courseAmount = courseDetails.reduce(function (total,course) {
                                    return total + Number(course.price - ((course.discount / 100) * course.price))
                                },0)
                            }
                            let productAmount = 0;
                            if(productDetails.length > 0){
                                productAmount = productDetails.reduce(function (total,product) {
                                    const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count;
                                    const totalPrice = count * product.price
                                    return total + (Number(totalPrice - ((product.discount / 100) * totalPrice)))
                                },0)
                            }
                            const courseIds = courseDetails.map(course => course._id.valueOf())
                            const productIds = productDetails.map(product => product._id.valueOf())
                            return {
                                courseAmount,
                                productAmount,
                                paymentAmount: courseAmount + productAmount,
                                courseIds,
                                productIds
                            }
                        },
                        args: ["$courseDetails", "$productDetails", "$basket.products"],
                        lang: "js"
                    },
                }
            }
        },
    ])
    return copyObject(basket)
}
module.exports ={
    getUserBasket
}