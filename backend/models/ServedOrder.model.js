import mongoose from "mongoose";

const servedOrderItemSchema = new mongoose.Schema(
    {
        item_name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    },
    { _id: false }
);

const servedOrderDetailSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true },
        items: [servedOrderItemSchema],
        totalAmount: { type: Number, required: true },
        status: { type: String, required: true },
        createdAt: { type: Date, required: true },
        updatedAt: { type: Date, required: true },
    },
    { _id: false }
);

const servedOrderSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number,
            required: true,
            index: true, // Index for fast filtering by table number
        },
        orders: [servedOrderDetailSchema],
        totalBillAmount: {
            type: Number,
            required: true,
        },
        billDetails: {
            type: mongoose.Schema.Types.Mixed, // Store complete bill data for reprinting
        },
        servedAt: {
            type: Date,
            default: Date.now,
            index: true, // Index for sorting by date
        },
        servedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Compound index for efficient table number + date queries
servedOrderSchema.index({ tableNumber: 1, servedAt: -1 });

export const ServedOrder = mongoose.model("ServedOrder", servedOrderSchema);
