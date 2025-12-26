import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Layout } from '@/components/Layout';

const Terms = () => {
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
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-card border border-border/50 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using AILA, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  AILA is a personal safety application that allows users to set countdown timers and automatically notify emergency contacts if the timer is not cancelled. The service is provided "as is" for personal safety purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to provide accurate contact information for your emergency contacts.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">4. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  AILA is designed as a supplementary safety tool and should not be relied upon as your sole means of emergency communication. We are not liable for any damages resulting from the use or inability to use our service.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">5. Modifications</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
                <p className="text-muted-foreground">
                  You may terminate your account at any time by deleting your data. We reserve the right to terminate or suspend access to our service at our discretion.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">7. Contact</h2>
                <p className="text-muted-foreground">
                  For any questions regarding these Terms of Service, please contact us through our Contact page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
