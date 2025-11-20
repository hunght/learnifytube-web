'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Fake a network request so the UI still feels interactive
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubscribed(true);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      {isSubscribed ? (
        <div className="rounded-md bg-green-50 p-4 text-green-800 dark:bg-green-950 dark:text-green-300">
          <p className="text-center font-medium">
            Thank you for subscribing! We&apos;ll keep you updated on the latest
            news and releases.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0"
        >
          <div className="flex-grow">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
              disabled={isSubmitting}
              aria-label="Email address"
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-500 hover:bg-amber-600"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}
    </div>
  );
}
