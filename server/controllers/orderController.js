const asyncHandler = require('express-async-handler')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const mongoose = require('mongoose')

const getAllOrders = asyncHandler(async (req, res) => {
  const orderList = await Order.find()
    .populate('user', 'name')
    .sort({ dateOrdered: -1 })
  if (!orderList) {
    res.status(500).json({ success: false })
  }
  res.status(200).json(orderList)
})

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        populate: 'category',
      },
    })
  if (!order) {
    res.status(500).json({ success: false })
  }
  res.status(200).json(order)
})

const addOrder = asyncHandler(async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      })

      newOrderItem = await newOrderItem.save()
      return newOrderItem._id
    })
  )
  const orderItemsIdsResolved = await orderItemsIds
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        'product',
        'price'
      )
      const totalPrice = orderItem.product.price * orderItem.quantity
      return totalPrice
    })
  )

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  })

  order = await order.save()
  if (!order) {
    return res.status(404).json({ message: 'The order cannot be created!' })
  }
  res.status(200).json(order)
})

const updateOrder = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Order ID' })
  }
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  )
  if (!order) {
    return res.status(404).json({ message: 'The order cannot be updated!' })
  }
  res.status(200).json(order)
})

const deleteOrder = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid order ID' })
  }
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem)
        })
        return res
          .status(200)
          .json({ success: true, message: 'the order is deleted' })
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'order not found' })
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err })
    })
})

const getTotalSales = asyncHandler(async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalsales: { $sum: 'totalPrice' } } },
  ])

  if (!totalSales) {
    return res
      .status(400)
      .json({ message: 'The order sales cannot be generated' })
  }

  res.status(200).json({ totalsales: totalSales.pop().totalsales })
})

const getOrderCount = asyncHandler(async (req, res) => {
  const orderCount = await Order.countDocuments()
    .then((count) => count)
    .catch((err) => {
      return res.status(400).json({ success: false, error: err })
    })

  if (!orderCount) {
    return res.status(500).json({ success: false })
  }

  res.status(200).json({
    count: orderCount,
  })
})

module.exports = {
  getAllOrders,
  getSingleOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getOrderCount,
}
