import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Store, Package } from 'lucide-react';

interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  hours: string;
  verified: boolean;
  category_id: string;
}

const VendorDashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    hours: '',
    category_id: '',
    location_lat: 40.7128,
    location_lng: -74.0060,
  });

  useEffect(() => {
    if (!loading && (!user || userRole !== 'vendor')) {
      navigate('/auth');
    }
  }, [user, userRole, loading, navigate]);

  useEffect(() => {
    if (user && userRole === 'vendor') {
      fetchShops();
      fetchCategories();
    }
  }, [user, userRole]);

  const fetchShops = async () => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('vendor_id', user?.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load shops",
        variant: "destructive",
      });
    } else {
      setShops(data || []);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*');
    setCategories(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('shops').insert({
      ...formData,
      vendor_id: user?.id,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Shop created successfully. Pending verification.",
      });
      setDialogOpen(false);
      setFormData({
        name: '',
        description: '',
        address: '',
        phone: '',
        hours: '',
        category_id: '',
        location_lat: 40.7128,
        location_lng: -74.0060,
      });
      fetchShops();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Vendor Dashboard</h1>
              <p className="text-muted-foreground">Manage your shops and products</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Shop
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Shop</DialogTitle>
                  <DialogDescription>Add your business to Just Go Local</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Shop Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Business Hours</Label>
                    <Input
                      id="hours"
                      placeholder="Mon-Fri: 9AM-6PM"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">Create Shop</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shops.map((shop) => (
              <Card key={shop.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Store className="h-8 w-8 text-primary" />
                    {shop.verified ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified</span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Pending</span>
                    )}
                  </div>
                  <CardTitle>{shop.name}</CardTitle>
                  <CardDescription>{shop.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{shop.description}</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Phone:</strong> {shop.phone}</p>
                    <p><strong>Hours:</strong> {shop.hours}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => navigate(`/shop/${shop.id}`)}>
                    View Shop
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {shops.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No shops yet</h3>
                <p className="text-muted-foreground mb-4">Create your first shop to get started</p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Shop
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VendorDashboard;
