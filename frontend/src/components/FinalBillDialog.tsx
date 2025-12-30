import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { billsAPI } from "@/api/bills";
import { toast } from "sonner";

interface FinalBillDialogProps {
    tableId: string;
    tableNumber: number;
    open: boolean;
    onClose: () => void;
}

const FinalBillDialog = ({ tableId, tableNumber, open, onClose }: FinalBillDialogProps) => {
    const [loading, setLoading] = useState(true);
    const [billData, setBillData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            generateBill();
        }
    }, [open, tableId]);

    const generateBill = async () => {
        setLoading(true);
        setError(null);
        try {
            const bill = await billsAPI.createFinal(tableId);
            setBillData(bill);
            toast.success(`Final bill generated for Table ${tableNumber}`);
        } catch (error: any) {
            console.error("Failed to generate final bill:", error);
            const errorMessage = error.response?.data?.message || error.message || "Failed to generate final bill";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('final-customer-receipt');
        if (!printContent) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        printWindow.document.write(`
      <html>
        <head>
          <title>Customer Receipt - Table ${tableNumber}</title>
          <style>
            body { font-family: 'Satoshi', Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 15px; }
            .title { font-size: 32px; font-weight: 700; margin-bottom: 5px; letter-spacing: 1px; }
            .subtitle { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
            .info { display: flex; justify-content: space-between; padding: 15px; background: #f5f5f5; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ddd; }
            .items { margin-bottom: 20px; }
            .item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #ddd; }
            .item-name { font-weight: 600; font-size: 14px; }
            .item-details { font-size: 11px; color: #666; font-family: monospace; margin-top: 3px; }
            .totals { margin-top: 20px; background: #f9f9f9; padding: 15px; border-radius: 8px; }
            .total-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
            .total-final { font-size: 22px; font-weight: 700; margin-top: 10px; padding-top: 10px; border-top: 2px solid #000; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; font-weight: 500; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
        toast.success("Customer receipt sent to printer!");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Final Bill - Table {tableNumber}</DialogTitle>
                </DialogHeader>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-lg font-medium text-muted-foreground">Generating final bill...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="text-destructive text-center">
                            <p className="text-lg font-semibold mb-2">Error generating bill</p>
                            <p className="text-sm">{error}</p>
                        </div>
                        <Button onClick={onClose} variant="outline">
                            Close
                        </Button>
                    </div>
                )}

                {!loading && !error && billData && (
                    <div className="space-y-4">
                        {/* Customer Receipt */}
                        <Card id="final-customer-receipt" className="border-2">
                            <CardHeader className="text-center border-b-2 bg-gradient-to-r from-orange-50 to-red-50">
                                <div className="space-y-3">
                                    <CardTitle className="text-4xl font-bold tracking-tight">KHAO PEEO</CardTitle>
                                    <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Customer Receipt</p>
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {formatDate(billData.created_at || new Date().toISOString())}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                {/* Table Info */}
                                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg border">
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Table Number</p>
                                        <p className="text-3xl font-bold">#{tableNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Bill Number</p>
                                        <p className="text-lg font-mono font-bold">{(billData.id || billData._id || '').slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-lg uppercase tracking-wide border-b pb-2">Order Items</h3>
                                    <div className="space-y-3">
                                        {billData.items?.map((item: any, index: number) => (
                                            <div key={index} className="flex justify-between items-center py-3 border-b border-dashed">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-base">{item.name || item.item_name || 'Unknown Item'}</p>
                                                    <p className="text-xs text-muted-foreground font-mono mt-1">
                                                        ₹{item.price.toFixed(2)} × {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Totals */}
                                <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Subtotal:</span>
                                        <span className="font-semibold">₹{parseFloat(billData.subtotal || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">Tax (5%):</span>
                                        <span className="font-semibold">₹{parseFloat(billData.tax || 0).toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-xl font-bold pt-2">
                                        <span>Total Amount:</span>
                                        <span className="text-primary text-2xl">₹{parseFloat(billData.total_amount || 0).toFixed(2)}</span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                {/* Footer */}
                                <div className="text-center space-y-2 py-4">
                                    <p className="text-sm font-semibold">Thank you for dining with us!</p>
                                    <p className="text-xs text-muted-foreground">We hope to serve you again soon</p>
                                    <div className="h-px bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent mt-4"></div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <Button onClick={handlePrint} className="flex-1" size="lg">
                                <Printer className="h-4 w-4 mr-2" />
                                Print Bill
                            </Button>
                            <Button onClick={onClose} variant="outline" className="flex-1" size="lg">
                                <X className="h-4 w-4 mr-2" />
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FinalBillDialog;
