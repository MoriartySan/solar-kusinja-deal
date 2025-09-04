-- Create jobs table for installation appointments
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  address TEXT NOT NULL,
  system_type TEXT NOT NULL,
  system_size TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  installer_id UUID REFERENCES auth.users(id) NOT NULL,
  notes TEXT,
  estimated_duration_hours INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ratings table for installer ratings
CREATE TABLE public.ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  installer_id UUID REFERENCES auth.users(id) NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs table
CREATE POLICY "Installers can view their own jobs" 
ON public.jobs 
FOR SELECT 
USING (auth.uid() = installer_id);

CREATE POLICY "Installers can update their own jobs" 
ON public.jobs 
FOR UPDATE 
USING (auth.uid() = installer_id);

-- Create policies for ratings table
CREATE POLICY "Installers can view their own ratings" 
ON public.ratings 
FOR SELECT 
USING (auth.uid() = installer_id);

CREATE POLICY "Anyone can insert ratings" 
ON public.ratings 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_jobs_installer_id ON public.jobs(installer_id);
CREATE INDEX idx_jobs_scheduled_date ON public.jobs(scheduled_date);
CREATE INDEX idx_ratings_installer_id ON public.ratings(installer_id);

-- Create trigger for automatic timestamp updates on jobs
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate installer average rating
CREATE OR REPLACE FUNCTION public.get_installer_average_rating(installer_user_id UUID)
RETURNS DECIMAL(3,2) AS $$
BEGIN
  RETURN (
    SELECT COALESCE(AVG(rating), 0)::DECIMAL(3,2)
    FROM public.ratings 
    WHERE installer_id = installer_user_id
  );
END;
$$ LANGUAGE plpgsql STABLE;