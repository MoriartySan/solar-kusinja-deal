import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, MapPin, Star, Phone, Mail, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  address: string;
  system_type: string;
  system_size: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  notes: string | null;
  estimated_duration_hours: number;
}

interface Rating {
  id: string;
  rating: number;
  review_text: string | null;
  created_at: string;
  jobs: {
    customer_name: string;
    system_type: string;
  };
}

const InstallerDashboard = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate("/auth");
      return;
    }
    
    fetchJobs();
    fetchRatings();
  }, [session, navigate]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("installer_id", user?.id)
        .order("scheduled_date", { ascending: true });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    }
  };

  const fetchRatings = async () => {
    try {
      const { data, error } = await supabase
        .from("ratings")
        .select(`
          *,
          jobs!inner(customer_name, system_type)
        `)
        .eq("installer_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRatings(data || []);

      // Calculate average rating
      if (data && data.length > 0) {
        const avg = data.reduce((sum, rating) => sum + rating.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
      toast.error("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  const updateJobStatus = async (jobId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: newStatus })
        .eq("id", jobId);

      if (error) throw error;
      
      toast.success(`Job status updated to ${newStatus}`);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Failed to update job status");
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "scheduled": return "outline";
      case "in_progress": return "default";
      case "completed": return "secondary";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  const upcomingJobs = jobs.filter(job => job.status === "scheduled" || job.status === "in_progress");
  const completedJobs = jobs.filter(job => job.status === "completed");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-background via-muted/30 to-secondary/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Installer Dashboard
              </h1>
              <div className="flex items-center justify-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{averageRating || "No ratings yet"}</span>
                  <span className="text-muted-foreground">
                    ({ratings.length} review{ratings.length !== 1 ? "s" : ""})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">{completedJobs.length}</span>
                  <span className="text-muted-foreground">completed jobs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">
                  Upcoming Jobs ({upcomingJobs.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed Jobs ({completedJobs.length})
                </TabsTrigger>
                <TabsTrigger value="ratings">
                  My Ratings ({ratings.length})
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Jobs */}
              <TabsContent value="upcoming" className="space-y-6">
                {upcomingJobs.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No upcoming jobs</h3>
                      <p className="text-muted-foreground">
                        You're all caught up! New jobs will appear here when they're scheduled.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {upcomingJobs.map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl mb-2">{job.customer_name}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {job.address}
                              </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(job.status)} className="flex items-center gap-1">
                              {getStatusIcon(job.status)}
                              {job.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm">
                                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{formatDate(job.scheduled_date)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{formatTime(job.scheduled_time)} ({job.estimated_duration_hours}h estimated)</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span>{job.customer_email}</span>
                              </div>
                              {job.customer_phone && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{job.customer_phone}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm font-medium">System Type:</span>
                                <p className="text-sm text-muted-foreground">{job.system_type}</p>
                              </div>
                              <div>
                                <span className="text-sm font-medium">System Size:</span>
                                <p className="text-sm text-muted-foreground">{job.system_size}</p>
                              </div>
                              {job.notes && (
                                <div>
                                  <span className="text-sm font-medium flex items-center gap-1">
                                    <FileText className="w-4 h-4" />
                                    Notes:
                                  </span>
                                  <p className="text-sm text-muted-foreground">{job.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 pt-4 border-t">
                            {job.status === "scheduled" && (
                              <Button 
                                onClick={() => updateJobStatus(job.id, "in_progress")}
                                className="flex-1"
                              >
                                Start Job
                              </Button>
                            )}
                            {job.status === "in_progress" && (
                              <Button 
                                onClick={() => updateJobStatus(job.id, "completed")}
                                className="flex-1"
                                variant="secondary"
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Completed Jobs */}
              <TabsContent value="completed" className="space-y-6">
                {completedJobs.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No completed jobs yet</h3>
                      <p className="text-muted-foreground">
                        Completed installations will appear here for your reference.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {completedJobs.map((job) => (
                      <Card key={job.id} className="opacity-90">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{job.customer_name}</h3>
                              <p className="text-sm text-muted-foreground">{job.system_type} - {job.system_size}</p>
                              <p className="text-sm text-muted-foreground">{formatDate(job.scheduled_date)}</p>
                            </div>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Ratings */}
              <TabsContent value="ratings" className="space-y-6">
                {ratings.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No ratings yet</h3>
                      <p className="text-muted-foreground">
                        Customer ratings and reviews will appear here after job completion.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-xl font-bold">{averageRating}</span>
                        <span className="text-muted-foreground">average rating</span>
                      </div>
                    </div>
                    {ratings.map((rating) => (
                      <Card key={rating.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{rating.jobs.customer_name}</h3>
                              <p className="text-sm text-muted-foreground">{rating.jobs.system_type}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= rating.rating
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 font-semibold">{rating.rating}/5</span>
                            </div>
                          </div>
                          {rating.review_text && (
                            <p className="text-sm text-muted-foreground italic mb-2">
                              "{rating.review_text}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {new Date(rating.created_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InstallerDashboard;