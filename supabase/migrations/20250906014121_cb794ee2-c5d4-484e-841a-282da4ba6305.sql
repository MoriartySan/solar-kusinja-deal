-- Create orders table for customer purchases
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_address TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price INTEGER NOT NULL, -- in cents
  order_status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  estimated_delivery DATE,
  estimated_install_date DATE,
  installer_id UUID,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow customers to view orders by email
CREATE POLICY "customers_view_own_orders" ON public.orders
  FOR SELECT
  USING (true); -- Public for now, can be restricted later

-- Allow order creation
CREATE POLICY "allow_order_creation" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Allow order updates for processing
CREATE POLICY "allow_order_updates" ON public.orders
  FOR UPDATE
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();