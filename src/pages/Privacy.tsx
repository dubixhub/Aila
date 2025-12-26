import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Layout } from '@/components/Layout';

const Privacy = () => {
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
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy <span className="gradient-text">Policy</span>
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
            className="max-w-3xl mx-auto prose prose-slate"
          >
            <div className="p-8 rounded-2xl bg-card border border-border/50 space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground">
                  AILA collects minimal personal information necessary to provide our safety services. This includes your name, email address, and the emergency contact information you provide. All data is stored locally on your device.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground">
                  Your information is used solely to provide safety alert services. When you activate Safety Mode and the countdown expires, your stored contact information is used to send emergency notifications.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">3. Data Storage</h2>
                <p className="text-muted-foreground">
                  All data is stored locally on your device using browser storage. We do not transmit your personal information to external servers. Your data remains private and under your control.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We prioritize the security of your personal information. Since all data is stored locally, you have full control over your information. We recommend keeping your device secure and protected.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to access, modify, or delete your personal information at any time through your dashboard. You can also clear all data by removing your account.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us through our Contact page.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
