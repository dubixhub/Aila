import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is AILA?',
    answer: 'AILA is a personal safety app that helps you stay connected with trusted contacts. It features a countdown timer that automatically alerts your emergency contacts if you don\'t cancel it in time.',
  },
  {
    question: 'How does the safety timer work?',
    answer: 'When you activate Safety Mode, a countdown begins. If you don\'t cancel the countdown before it ends, AILA automatically sends an alert notification to all your saved emergency contacts.',
  },
  {
    question: 'Is my data stored securely?',
    answer: 'Yes! AILA stores all data locally on your device. No information is sent to external servers, ensuring your personal data remains private and secure.',
  },
  {
    question: 'How many emergency contacts can I add?',
    answer: 'You can add as many emergency contacts as you need. Each contact requires a name, email address, and phone number.',
  },
  {
    question: 'Can I edit or remove contacts?',
    answer: 'Absolutely! You can manage all your emergency contacts from your dashboard. Add, edit, or remove contacts at any time.',
  },
  {
    question: 'What happens when an alert is triggered?',
    answer: 'When the countdown ends without cancellation, all your emergency contacts receive a notification with your alert message, letting them know you may need help.',
  },
  {
    question: 'Is AILA free to use?',
    answer: 'Yes, AILA is completely free. We believe everyone deserves access to personal safety tools.',
  },
];

const FAQ = () => {
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
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about AILA.
            </p>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 bg-card data-[state=open]:border-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5 transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
