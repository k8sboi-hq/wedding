'use client';

import { useEffect } from 'react';

interface TallyFormProps {
  formId?: string;
}

export default function TallyForm({ formId }: TallyFormProps) {
  useEffect(() => {
    if (!formId) return;

    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [formId]);

  if (!formId) {
    return (
      <div className="text-center p-16 bg-white/95 backdrop-blur-sm rounded-xl border-3 border-accent shadow-xl">
        <h3 className="text-2xl font-serif text-primary mb-4">RSVP Form</h3>
        <p className="text-muted-foreground mb-6">
          RSVP form will be integrated here using Tally.
        </p>
        <code className="block bg-background p-4 rounded-lg text-left text-sm">
          {`<TallyForm formId="your-form-id" />`}
        </code>
      </div>
    );
  }

  return (
    <iframe
      data-tally-src={`https://tally.so/embed/${formId}`}
      width="100%"
      height="500"
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}
      title="RSVP Form"
    />
  );
}
