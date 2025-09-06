import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Package, Truck, Wrench, CheckCircle } from "lucide-react";
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

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({
    email: searchParams.get("email") || "",
    orderId: searchParams.get("id") || "",
  });

  const getOrderProgress = (status: string) => {
    switch (status) {
      case "pending":
        return 25;
      case "confirmed":
        return 50;
      case "shipped":
        return 75;
      case "delivered":
        return 90;
      case "installed":
        return 100;
      default:
        return 0;
    }
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { id: "confirmed", label: "Order Confirmed", icon: CheckCircle, date: null },
      { id: "shipped", label: "Equipment Shipped", icon: Truck, date: null },
      { id: "delivered", label: "Equipment Delivered", icon: Package, date: null },
      { id: "installed", label: "Installation Complete", icon: Wrench, date: null },
    ];

    const statusOrder = ["pending", "confirmed", "shipped", "delivered", "installed"];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex - 1,
      current: index === currentIndex - 1,
    }));
  };

  const searchOrder = async () => {
    if (!searchForm.email && !searchForm.orderId) return;
    
    setLoading(true);
    try {
      let query = supabase.from("orders").select("*");
      
      if (searchForm.orderId) {
        query = query.eq("id", searchForm.orderId);
      } else {
        query = query.eq("customer_email", searchForm.email);
      }
      
      const { data, error } = await query.single();
      
      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchForm.email && searchForm.orderId) {
      searchOrder();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const statusSteps = order ? getStatusSteps(order.order_status) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>
                Enter your email or order ID to track your solar installation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={searchForm.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="orderId">Order ID (Optional)</Label>
                  <Input
                    id="orderId"
                    name="orderId"
                    value={searchForm.orderId}
                    onChange={handleInputChange}
                    placeholder="Order ID"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={searchOrder} disabled={loading}>
                    <Search className="h-4 w-4 mr-2" />
                    {loading ? "Searching..." : "Track Order"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {order && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Order ID:</span>
                          <span className="font-mono text-sm">{order.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Product:</span>
                          <span>{order.product_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Customer:</span>
                          <span>{order.customer_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Status:</span>
                          <Badge variant="secondary">{order.order_status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Order Date:</span>
                          <span>{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Expected Delivery:</span>
                          <span>{new Date(order.estimated_delivery).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Install Date:</span>
                          <span>{new Date(order.estimated_install_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">${(order.product_price / 100).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Progress</CardTitle>
                  <CardDescription>
                    Track the status of your solar installation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {getOrderProgress(order.order_status)}%
                        </span>
                      </div>
                      <Progress value={getOrderProgress(order.order_status)} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      {statusSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.id} className="flex items-center gap-4">
                            <div className={`
                              flex items-center justify-center w-10 h-10 rounded-full border-2
                              ${step.completed ? 'bg-primary border-primary text-primary-foreground' : 
                                step.current ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}
                            `}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium ${step.completed ? 'text-primary' : step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {step.label}
                              </div>
                              {step.completed && (
                                <div className="text-sm text-muted-foreground">
                                  Completed
                                </div>
                              )}
                              {step.current && (
                                <div className="text-sm text-primary">
                                  In Progress
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Installation Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{order.customer_address}</p>
                </CardContent>
              </Card>
            </>
          )}

          {loading && (
            <Card>
              <CardContent className="text-center py-8">
                <div>Searching for your order...</div>
              </CardContent>
            </Card>
          )}

          {!order && !loading && (searchForm.email || searchForm.orderId) && (
            <Card>
              <CardContent className="text-center py-8">
                <div>No order found. Please check your email or order ID and try again.</div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;