import mongoose from 'mongoose'

const orderItemSchema = mongoose.Schema(
	{
		quantity: {
			type: Number,
			required: true,
		},
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

export default OrderItem
