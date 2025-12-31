import { ServedOrder } from "../models/ServedOrder.model.js";

// @route   GET /api/served-orders
// @desc    Get all served orders with optional table number filter
// @access  Protected (owner/admin)
export const getServedOrders = async (req, res) => {
    try {
        const { tableNumber } = req.query;

        const filter = {};
        if (tableNumber) {
            filter.tableNumber = parseInt(tableNumber);
        }

        const servedOrders = await ServedOrder.find(filter)
            .populate("servedBy", "full_name email")
            .sort({ servedAt: -1 }) // Most recent first
            .lean();

        // Transform to match frontend expectations
        const transformed = servedOrders.map(order => ({
            _id: order._id,
            id: order._id,
            table_number: order.tableNumber,
            tableNumber: order.tableNumber,
            orders: order.orders.map(o => ({
                order_id: o.orderId,
                items: o.items.map(item => ({
                    item_name: item.item_name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total_amount: o.totalAmount,
                totalAmount: o.totalAmount,
                status: o.status,
                created_at: o.createdAt,
                createdAt: o.createdAt,
                updated_at: o.updatedAt,
                updatedAt: o.updatedAt,
            })),
            total_bill_amount: order.totalBillAmount,
            totalBillAmount: order.totalBillAmount,
            bill_details: order.billDetails,
            billDetails: order.billDetails,
            served_at: order.servedAt,
            servedAt: order.servedAt,
            served_by: order.servedBy,
            servedBy: order.servedBy,
            created_at: order.createdAt,
            createdAt: order.createdAt,
            updated_at: order.updatedAt,
            updatedAt: order.updatedAt,
        }));

        return res.json(transformed);
    } catch (error) {
        console.error("getServedOrders error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// @route   GET /api/served-orders/:id
// @desc    Get specific served order details
// @access  Protected (owner/admin)
export const getServedOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const servedOrder = await ServedOrder.findById(id)
            .populate("servedBy", "full_name email")
            .lean();

        if (!servedOrder) {
            return res.status(404).json({ message: "Served order not found" });
        }

        // Transform to match frontend expectations
        const transformed = {
            _id: servedOrder._id,
            id: servedOrder._id,
            table_number: servedOrder.tableNumber,
            tableNumber: servedOrder.tableNumber,
            orders: servedOrder.orders.map(o => ({
                order_id: o.orderId,
                items: o.items.map(item => ({
                    item_name: item.item_name,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total_amount: o.totalAmount,
                totalAmount: o.totalAmount,
                status: o.status,
                created_at: o.createdAt,
                createdAt: o.createdAt,
                updated_at: o.updatedAt,
                updatedAt: o.updatedAt,
            })),
            total_bill_amount: servedOrder.totalBillAmount,
            totalBillAmount: servedOrder.totalBillAmount,
            bill_details: servedOrder.billDetails,
            billDetails: servedOrder.billDetails,
            served_at: servedOrder.servedAt,
            servedAt: servedOrder.servedAt,
            served_by: servedOrder.servedBy,
            servedBy: servedOrder.servedBy,
        };

        return res.json(transformed);
    } catch (error) {
        console.error("getServedOrderById error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// @route   GET /api/served-orders/:id/bill
// @desc    Get bill data for reprinting
// @access  Protected (owner/admin)
export const getServedOrderBill = async (req, res) => {
    try {
        const { id } = req.params;

        const servedOrder = await ServedOrder.findById(id).lean();

        if (!servedOrder) {
            return res.status(404).json({ message: "Served order not found" });
        }

        if (!servedOrder.billDetails) {
            return res.status(404).json({ message: "Bill details not found for this order" });
        }

        return res.json(servedOrder.billDetails);
    } catch (error) {
        console.error("getServedOrderBill error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
