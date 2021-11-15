import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
		},
		color: {
			type: String,
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Category = mongoose.model('Category', categorySchema)

export default Category
