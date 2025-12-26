import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Trash2,
  Edit2,
  Phone,
  Mail,
  User,
  AlertTriangle,
  X,
  Check,
  Clock,
  Bell,
  MapPin,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  getCurrentUser,
  getUserContacts,
  addContact,
  updateContact,
  deleteContact,
  EmergencyContact,
} from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/Layout';

const TIMER_OPTIONS = [
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 120, label: '2 hours' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  // Safety Mode states
  const [safetyModeActive, setSafetyModeActive] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 mins default in seconds
  const [alertTriggered, setAlertTriggered] = useState(false);
  
  // Safety Mode Form states
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [destination, setDestination] = useState('');
  const [timerDuration, setTimerDuration] = useState<number>(5);

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (currentUser.isAdmin) {
      navigate('/admin');
      return;
    }

    loadContacts();
  }, []);

  const loadContacts = () => {
    if (currentUser) {
      setContacts(getUserContacts(currentUser.id));
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (safetyModeActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (safetyModeActive && countdown === 0) {
      triggerAlert();
    }

    return () => clearInterval(timer);
  }, [safetyModeActive, countdown]);

  const triggerAlert = useCallback(() => {
    const alertContacts = contacts.filter(c => selectedContacts.includes(c.id));
    
    setSafetyModeActive(false);
    setAlertTriggered(true);
    
    toast({
      title: '🚨 Emergency Alert Sent!',
      description: `Alert notification sent to ${alertContacts.length} contact(s).`,
      variant: 'destructive',
    });

    // Simulate sending alerts with destination info
    alertContacts.forEach((contact) => {
      console.log(`Alert sent to ${contact.name} at ${contact.email} and ${contact.phone}`);
      console.log(`User was going to: ${destination}`);
    });
  }, [contacts, selectedContacts, destination, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSafetyMode = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: 'No contacts selected',
        description: 'Please select at least one emergency contact.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!destination.trim()) {
      toast({
        title: 'Destination required',
        description: 'Please enter where you are going.',
        variant: 'destructive',
      });
      return;
    }
    
    setCountdown(timerDuration * 60); // Convert minutes to seconds
    setSafetyModeActive(true);
    setAlertTriggered(false);
    
    toast({
      title: 'Safety Mode Activated',
      description: `Cancel within ${timerDuration} minutes or alert will be sent.`,
    });
  };

  const cancelSafetyMode = () => {
    setSafetyModeActive(false);
    setCountdown(timerDuration * 60);
    
    toast({
      title: 'Safety Mode Cancelled',
      description: 'You\'re safe. Alert was not sent.',
    });
  };

  const resetSafetyMode = () => {
    setAlertTriggered(false);
    setSelectedContacts([]);
    setDestination('');
    setTimerDuration(5);
  };

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const openAddDialog = () => {
    setEditingContact(null);
    setFormData({ name: '', email: '', phone: '' });
    setDialogOpen(true);
  };

  const openEditDialog = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({ name: contact.name, email: contact.email, phone: contact.phone });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!currentUser) return;
    
    if (editingContact) {
      updateContact(editingContact.id, formData.name, formData.email, formData.phone);
      toast({ title: 'Contact updated', description: 'Emergency contact has been updated.' });
    } else {
      addContact(currentUser.id, formData.name, formData.email, formData.phone);
      toast({ title: 'Contact added', description: 'Emergency contact has been added.' });
    }
    
    loadContacts();
    setDialogOpen(false);
  };

  const handleDelete = (contactId: string) => {
    deleteContact(contactId);
    setSelectedContacts(prev => prev.filter(id => id !== contactId));
    loadContacts();
    toast({ title: 'Contact removed', description: 'Emergency contact has been removed.' });
  };

  if (!currentUser) return null;

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome, <span className="gradient-text">{currentUser.name}</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your emergency contacts and stay safe.
            </p>
          </motion.div>

          {/* Safety Mode Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className={`p-8 rounded-2xl border ${
              safetyModeActive 
                ? 'bg-destructive/5 border-destructive/30' 
                : alertTriggered 
                  ? 'bg-destructive/10 border-destructive/50'
                  : 'bg-card border-border/50'
            } transition-all duration-300`}>
              
              <AnimatePresence mode="wait">
                {safetyModeActive ? (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-destructive/20 pulse-ring">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">Safety Mode Active</h2>
                        <p className="text-muted-foreground">
                          Going to: <span className="font-medium text-foreground">{destination}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <motion.div
                          className="text-5xl font-bold text-destructive countdown-pulse"
                          key={countdown}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                        >
                          {formatTime(countdown)}
                        </motion.div>
                        <p className="text-sm text-muted-foreground">remaining</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="lg"
                        onClick={cancelSafetyMode}
                        className="gap-2"
                      >
                        <X className="w-5 h-5" />
                        I'm Safe
                      </Button>
                    </div>
                  </motion.div>
                ) : alertTriggered ? (
                  <motion.div
                    key="triggered"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-4 rounded-2xl bg-destructive/20">
                        <Bell className="w-8 h-8 text-destructive" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">Alert Triggered!</h2>
                        <p className="text-muted-foreground">
                          Your contacts have been notified about your location.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={resetSafetyMode}
                      className="gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Dismiss
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-primary/10">
                        <Shield className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1">Start Safety Mode</h2>
                        <p className="text-muted-foreground">
                          Select contacts and set up your safety timer
                        </p>
                      </div>
                    </div>

                    {contacts.length === 0 ? (
                      <div className="text-center py-8 bg-muted/30 rounded-xl">
                        <p className="text-muted-foreground mb-4">
                          Add emergency contacts first to use Safety Mode
                        </p>
                        <Button onClick={openAddDialog} className="gap-2">
                          <Plus className="w-4 h-4" />
                          Add Contact
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Contact Selection */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">Select Contacts to Notify</Label>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={selectAllContacts}
                              className="text-primary"
                            >
                              {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
                            </Button>
                          </div>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {contacts.map((contact) => (
                              <div
                                key={contact.id}
                                onClick={() => toggleContactSelection(contact.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                  selectedContacts.includes(contact.id)
                                    ? 'bg-primary/10 border-primary/50'
                                    : 'bg-background border-border/50 hover:border-primary/30'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox 
                                    checked={selectedContacts.includes(contact.id)}
                                    onCheckedChange={() => toggleContactSelection(contact.id)}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{contact.phone}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Destination Input */}
                        <div className="space-y-2">
                          <Label htmlFor="destination" className="text-base font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Where are you going?
                          </Label>
                          <Textarea
                            id="destination"
                            placeholder="e.g., Meeting John at Starbucks on Main Street, 123 Main St..."
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="resize-none"
                            rows={2}
                          />
                        </div>

                        {/* Timer Selection */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                          <div className="space-y-2 flex-1 w-full sm:w-auto">
                            <Label htmlFor="timer" className="text-base font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Timer Duration
                            </Label>
                            <Select 
                              value={timerDuration.toString()} 
                              onValueChange={(v) => setTimerDuration(Number(v))}
                            >
                              <SelectTrigger className="w-full sm:w-[200px]">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIMER_OPTIONS.map((option) => (
                                  <SelectItem key={option.value} value={option.value.toString()}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <Button
                            variant="hero"
                            size="lg"
                            onClick={startSafetyMode}
                            className="gap-2 w-full sm:w-auto"
                            disabled={selectedContacts.length === 0 || !destination.trim()}
                          >
                            <Shield className="w-5 h-5" />
                            Start Safety Mode
                          </Button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contacts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Emergency Contacts</h2>
                <p className="text-muted-foreground text-sm">
                  {contacts.length} contact{contacts.length !== 1 ? 's' : ''} saved
                </p>
              </div>
              <Button onClick={openAddDialog} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </div>

            {contacts.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border/50">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No contacts yet</h3>
                <p className="text-muted-foreground mb-6">
                  Add emergency contacts to enable Safety Mode
                </p>
                <Button onClick={openAddDialog} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(contact)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(contact.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold mb-3">{contact.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Add/Edit Contact Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingContact ? 'Edit Contact' : 'Add Emergency Contact'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Name</Label>
              <Input
                id="contactName"
                placeholder="Contact name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contact@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingContact ? 'Save Changes' : 'Add Contact'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dashboard;
