'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error('Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-foreground font-medium">Thanks for signing up!</p>
        <p className="text-sm text-muted-foreground mt-1">
          We&apos;ll keep you posted on new writing and framework updates.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md"
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        required
      />
      <Button
        type="submit"
        variant="outline"
        disabled={status === 'loading'}
        className="border-label text-label hover:bg-label hover:text-primary-foreground"
      >
        {status === 'loading' ? '...' : 'Subscribe'}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-500 mt-1">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
