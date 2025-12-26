import { motion } from 'framer-motion';
import { Shield, ArrowRight, Users, Clock, Bell, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: Users,
    title: 'Emergency Contacts',
    description: 'Add trusted contacts who will be notified in case of emergency.',
  },
  {
    icon: Clock,
    title: 'Safety Timer',
    description: 'Set a countdown. If you don\'t cancel, help is on the way.',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Automatic notifications sent to all your emergency contacts.',
  },
];

const reviews = [
  {
    name: 'Sarah Mitchell',
    role: 'Student',
    rating: 5,
    content: 'AILA gave me peace of mind during late-night commutes. My parents love that they can be notified instantly if something goes wrong.',
    avatar: 'SM'
  },
  {
    name: 'James Chen',
    role: 'Young Professional',
    rating: 5,
    content: 'I travel frequently for work. AILA is my safety net. The timer feature is genius - it automatically alerts my family unless I cancel it.',
    avatar: 'JC'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Parent',
    rating: 5,
    content: 'Knowing my teenage daughter has this app makes me sleep better at night. It\'s reliable, simple, and actually works when needed.',
    avatar: 'ER'
  },
  {
    name: 'Michael Torres',
    role: 'Solo Traveler',
    rating: 5,
    content: 'I\'ve used AILA on multiple international trips. The instant alert feature is a lifesaver, and it\'s so easy to use in an emergency.',
    avatar: 'MT'
  },
  {
    name: 'Lisa Park',
    role: 'Healthcare Worker',
    rating: 5,
    content: 'Working irregular shifts means I\'m often alone. AILA makes me feel protected, and my loved ones know exactly how to help if needed.',
    avatar: 'LP'
  },
  {
    name: 'David White',
    role: 'Entrepreneur',
    rating: 5,
    content: 'The best safety app I\'ve used. Clean interface, works perfectly, and the support team is incredibly responsive.',
    avatar: 'DW'
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Your Personal Safety Companion</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Stay Safe with{' '}
              <span className="gradient-text">AILA</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Your trusted safety companion for every moment. 
              One tap to alert your loved ones when you need them most.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/register')}
                className="group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </motion.div>

            {/* Floating Shield Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative p-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Shield className="w-16 h-16 text-primary" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AILA Keeps You <span className="gradient-text">Safe</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Simple, effective safety features designed for real-world situations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Real Users</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See what people are saying about AILA
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              key={currentReviewIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-card border border-border/50"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                    {reviews[currentReviewIndex].avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{reviews[currentReviewIndex].name}</p>
                    <p className="text-sm text-muted-foreground">{reviews[currentReviewIndex].role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-lg italic">"{reviews[currentReviewIndex].content}"</p>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevReview}
              >
                ← Previous
              </Button>
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentReviewIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-border w-2 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={nextReview}
              >
                Next →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AILA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">AILA</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Trusted by thousands for reliable, instant emergency communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Always Available', desc: 'Works 24/7 with no downtime, even in areas with poor connectivity' },
              { title: 'Privacy First', desc: 'Your location and data are encrypted and only shared with contacts you trust' },
              { title: 'No Subscriptions', desc: 'Completely free to use with optional premium features for extra protection' },
              { title: 'Multiple Languages', desc: 'Supports 15+ languages so your loved ones understand immediately' },
              { title: 'Smart Notifications', desc: 'Intelligent alerts ensure your contacts get the message right away' },
              { title: 'Easy Setup', desc: 'Add contacts in seconds and activate safety features with just one tap' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in <span className="gradient-text">3 Simple Steps</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Create Account', desc: 'Sign up with your phone number in under 2 minutes' },
                { step: '2', title: 'Add Contacts', desc: 'Add trusted family and friends who care about your safety' },
                { step: '3', title: 'Stay Protected', desc: 'You\'re ready! Activate safety features whenever needed' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 -right-4 text-primary/30 text-2xl">→</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Feel <span className="gradient-text">Safer</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands who trust AILA to keep them connected with their loved ones in critical moments.
              </p>
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate('/register')}
                className="group"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;