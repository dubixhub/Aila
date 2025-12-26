import { motion } from 'framer-motion';
import { Shield, Heart, Users, Target } from 'lucide-react';
import { Layout } from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Mission</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">AILA</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering individuals with smart safety tools for peace of mind.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-card border border-border/50 glass-card">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    AILA was created with a simple yet powerful mission: to give people a reliable way to stay connected with their trusted contacts during uncertain situations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're meeting someone new, traveling alone, or simply want an extra layer of security, AILA provides peace of mind with its intuitive safety timer and instant alert system.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-muted-foreground">
                We believe in the power of trusted connections. AILA strengthens the safety net between you and your loved ones.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-muted-foreground">
                Safety tools should be easy to use. AILA's clean interface ensures you can activate protection in seconds.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
