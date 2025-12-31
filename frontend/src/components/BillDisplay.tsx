import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface BillDisplayProps {
  bill: any;
  onClose: () => void;
}

const BillDisplay = ({ bill, onClose }: BillDisplayProps) => {
  const handlePrintCustomer = () => {
    // Print only customer receipt
    const printContent = document.getElementById('customer-receipt');
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
    toast.success("Customer receipt printed!");
  };

  const handlePrintKitchen = () => {
    // Print only kitchen ticket
    const printContent = document.getElementById('kitchen-ticket');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Kitchen Ticket - Table ${tableNumber}</title>
          <style>
            body { font-family: 'Satoshi', Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
            .header-title { font-size: 22px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
            .table-info { text-align: center; margin-bottom: 20px; background: #f5f5f5; padding: 15px; border-radius: 8px; border: 1px solid #ddd; }
            .table-number { font-size: 42px; font-weight: 700; }
            .items { margin-top: 20px; }
            .item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: #f9f9f9; border-radius: 8px; margin-bottom: 10px; border: 1px solid #e5e5e5; }
            .item-name { font-weight: 600; font-size: 16px; }
            .item-qty { font-size: 28px; font-weight: 700; color: #ea580c; background: #fff3e0; padding: 8px 16px; border-radius: 6px; }
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
    toast.success("Kitchen ticket printed!");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Handle different bill data structures
  const tableNumber = bill?.table?.table_number || bill?.tableNumber || 'N/A';
  const billId = bill?.id || bill?._id || 'N/A';
  const createdAt = bill?.created_at || bill?.createdAt || bill?.servedAt || new Date().toISOString();
  const orderId = bill?.order_id || bill?.orderId || billId;

  // Handle items array - could be in different formats
  const items = bill?.items || bill?.billDetails?.items || [];

  // Handle totals - with fallbacks for different structures
  const subtotal = bill?.subtotal || bill?.billDetails?.subtotal || 0;
  const tax = bill?.tax || bill?.billDetails?.tax || 0;
  const totalAmount = bill?.total_amount || bill?.totalAmount || bill?.totalBillAmount || bill?.billDetails?.total_amount || 0;


  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fade-in px-2 sm:px-4">
      {/* Customer Receipt */}
      <Card id="customer-receipt" className="print:shadow-none border-2">
        <CardHeader className="text-center border-b-2 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="space-y-3">
            <CardTitle className="text-4xl font-bold tracking-tight">KHAO PEEO</CardTitle>
            <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Customer Receipt</p>
            <p className="text-xs text-muted-foreground font-mono">
              {formatDate(createdAt)}
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
              <p className="text-lg font-mono font-bold">{billId.toString().slice(0, 8).toUpperCase()}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg uppercase tracking-wide border-b pb-2">Order Items</h3>
            <div className="space-y-3">
              {items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-dashed">
                  <div className="flex-1">
                    <p className="font-semibold text-base">{item.name || item.item_name || 'Unknown Item'}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">
                      ₹{(item.price || 0).toFixed(2)} × {item.quantity || 0}
                    </p>
                  </div>
                  <p className="font-bold text-lg">₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Totals */}
          <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Subtotal:</span>
              <span className="font-semibold">₹{parseFloat(subtotal.toString()).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Tax (5%):</span>
              <span className="font-semibold">₹{parseFloat(tax.toString()).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-bold pt-2">
              <span>Total Amount:</span>
              <span className="text-primary text-2xl">₹{parseFloat(totalAmount.toString()).toFixed(2)}</span>
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

      {/* Kitchen Ticket */}
      <Card id="kitchen-ticket" className="print:shadow-none border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
          <CardTitle className="text-center text-2xl font-bold tracking-wide">KITCHEN TICKET</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="text-center space-y-2 bg-muted/50 p-4 rounded-lg border">
            <p className="text-5xl font-bold">TABLE {tableNumber}</p>
            <p className="text-sm font-mono text-muted-foreground">{formatDate(createdAt)}</p>
            <p className="text-xs font-mono text-muted-foreground">Order ID: {orderId?.toString().slice(0, 8).toUpperCase()}</p>
          </div>
          <Separator />
          <div className="space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">Items Required:</h3>
            {items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-primary/10">
                <span className="font-bold text-lg">{item.name || item.item_name || 'Unknown Item'}</span>
                <span className="text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded">× {item.quantity || 0}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 print:hidden">
        <Button onClick={handlePrintCustomer} className="flex-1 touch-target" variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Print Customer Receipt</span>
          <span className="sm:hidden">Customer Receipt</span>
        </Button>
        <Button onClick={handlePrintKitchen} className="flex-1 touch-target" variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Print Kitchen Ticket</span>
          <span className="sm:hidden">Kitchen Ticket</span>
        </Button>
        <Button onClick={onClose} className="flex-1 touch-target">
          <CheckCircle className="h-4 w-4 mr-2" />
          Done
        </Button>
      </div>
    </div>
  );
};

export default BillDisplay;
