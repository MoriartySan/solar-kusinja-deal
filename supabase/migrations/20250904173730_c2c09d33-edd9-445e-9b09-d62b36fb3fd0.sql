-- Fix function search path issue
CREATE OR REPLACE FUNCTION public.get_installer_average_rating(installer_user_id UUID)
RETURNS DECIMAL(3,2) 
LANGUAGE plpgsql 
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT COALESCE(AVG(rating), 0)::DECIMAL(3,2)
    FROM public.ratings 
    WHERE installer_id = installer_user_id
  );
END;
$$;