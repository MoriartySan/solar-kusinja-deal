import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Truck, Wrench } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  product_name: string;
  product_price: number;
  order_status: string;
  payment_status: string;
  estimated_delivery: string;
  estimated_install_date: string;
  created_at: string;
}

const OrderConfirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { orderId, customerEmail } = location.state || {};

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        // Simulate payment success by updating order status
        await supabase
          .from("orders")
          .update({ 
            payment_status: "paid",
            order_status: "confirmed"
          })
          .eq("id", orderId);

        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div>Loading order details...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div>Order not found.</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
              <CardDescription>
                Thank you for your purchase. Your order has been successfully placed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span className="font-mono text-sm">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Product:</span>
                  <span>{order.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">${(order.product_price / 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge variant="secondary">{order.order_status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment:</span>
                  <Badge variant="default">{order.payment_status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Equipment Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Expected: {new Date(order.estimated_delivery).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Installation</div>
                    <div className="text-sm text-muted-foreground">
                      Scheduled: {new Date(order.estimated_install_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Track Your Order</div>
                    <div className="text-sm text-muted-foreground">
                      Monitor progress and get updates
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link to={`/order-tracking?email=${customerEmail}&id=${order.id}`}>
                Track Order
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;