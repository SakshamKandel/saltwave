'use client';

import React, { useState, type FC, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logoSrc: string;
  companyName?: string;
  description?: string;
  usefulLinks?: { label: string; href: string }[];
  socialLinks?: { label: string; href: string; icon: ReactNode }[];
  newsletterTitle?: string;
  onSubscribe?: (email: string) => Promise<boolean>;
}

export const Footer: FC<FooterProps> = ({
  logoSrc,
  companyName = 'Datally Inc.',
  description = 'Empowering businesses with intelligent financial solutions, designed for the future of finance.',
  usefulLinks = [
    { label: 'Products', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  socialLinks = [
    { label: 'Facebook', href: '#', icon: <DummyIcon /> },
    { label: 'Instagram', href: '#', icon: <DummyIcon /> },
    { label: 'Twitter (X)', href: '#', icon: <DummyIcon /> },
  ],
  newsletterTitle = 'Subscribe our newsletter',
  onSubscribe,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !onSubscribe || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubscribe(email);

    setSubscriptionStatus(success ? 'success' : 'error');
    setIsSubmitting(false);

    if (success) {
      setEmail('');
    }

    setTimeout(() => {
      setSubscriptionStatus('idle');
    }, 3000);
  };

  return (
    <footer className={cn('bg-black text-white', className)} style={{ backgroundColor: '#000', color: '#fff' }} {...props}>
      <div 
        style={{ 
          maxWidth: '1280px', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          paddingTop: '64px', 
          paddingBottom: '64px', 
          paddingLeft: '16px', 
          paddingRight: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={logoSrc} 
              alt={`${companyName} Logo`} 
              style={{ height: '48px', width: 'auto', display: 'block' }}
            />
            <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.025em', color: '#fff', textTransform: 'uppercase', fontStyle: 'italic' }}>{companyName}</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#a3a3a3', lineHeight: '1.5' }}>{description}</p>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: '600', color: '#fff' }}>Useful Link</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: '#a3a3a3', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#a3a3a3')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: '600', color: '#fff' }}>Follow Us</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#a3a3a3', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) => (e.currentTarget.style.color = '#a3a3a3')}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: '600', color: '#fff' }}>{newsletterTitle}</h3>
          <form onSubmit={handleSubscribe} style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <div style={{ position: 'relative', display: 'flex' }}>
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                required
                aria-label="Email for newsletter"
                style={{ 
                  paddingRight: '100px', 
                  borderColor: '#262626', 
                  backgroundColor: '#171717', 
                  color: '#fff',
                  height: '40px'
                }}
              />
              <Button
                type="submit"
                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                style={{ 
                  position: 'absolute', 
                  right: 0, 
                  top: 0, 
                  height: '100%', 
                  borderTopLeftRadius: 0, 
                  borderBottomLeftRadius: 0, 
                  backgroundColor: '#fff', 
                  color: '#000',
                  padding: '0 16px'
                }}
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </Button>
            </div>
            {(subscriptionStatus === 'success' || subscriptionStatus === 'error') && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  textAlign: 'center',
                  backdropFilter: 'blur(4px)',
                  zIndex: 10
                }}
              >
                {subscriptionStatus === 'success' ? (
                  <span style={{ fontWeight: '600', color: '#4ade80' }}>Subscribed!</span>
                ) : (
                  <span style={{ fontWeight: '600', color: '#f87171' }}>Failed.</span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
};

const DummyIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-muted-foreground"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);
