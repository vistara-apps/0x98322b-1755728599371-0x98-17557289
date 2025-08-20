
"use client";

import { useState } from 'react';
import { Send, Loader2, Check, AlertCircle } from 'lucide-react';
import type { Creator, TipFormData } from '../types';
import { cn } from '../lib/utils';

interface TipWidgetProps {
  creator: Creator;
  variant?: 'compact' | 'expanded';
  onTip?: (data: TipFormData) => Promise<void>;
  className?: string;
}

export function TipWidget({ creator, variant = 'compact', onTip, className }: TipWidgetProps) {
  const [amount, setAmount] = useState(0.01);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const quickAmounts = [0.005, 0.01, 0.02, 0.05];

  const handleTip = async () => {
    if (!onTip) return;
    
    setIsLoading(true);
    setStatus('idle');
    
    try {
      await onTip({
        creatorId: creator.id,
        amount,
        message: message.trim() || undefined,
        platform: 'warpcast',
      });
      setStatus('success');
      setMessage('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn('card-glass p-4 space-y-3', className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium text-sm">{creator.name}</div>
              <div className="text-xs text-muted">{creator.handle}</div>
            </div>
          </div>
          <div className="creator-badge">
            {creator.totalTips} tips
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="input-field flex-1 text-sm"
            placeholder="0.01"
            step="0.001"
            min="0.001"
          />
          <span className="text-sm text-muted">ETH</span>
          <button
            onClick={handleTip}
            disabled={isLoading || amount <= 0}
            className="btn-primary px-3 py-2 text-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>Tip failed. Please try again.</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('card space-y-6', className)}>
      <div className="flex items-center space-x-4">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{creator.name}</h3>
          <p className="text-muted">{creator.handle}</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="creator-badge">
              {creator.totalTips} tips received
            </div>
            <div className="text-sm text-muted">
              {creator.totalRevenue.toFixed(3)} ETH earned
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Tip Amount</label>
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="input-field flex-1"
              placeholder="0.01"
              step="0.001"
              min="0.001"
            />
            <span className="text-muted">ETH</span>
          </div>
          <div className="flex space-x-2">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className={cn(
                  'px-3 py-1 rounded-md text-sm transition-colors',
                  amount === quickAmount
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-white/10 text-muted hover:text-text'
                )}
              >
                {quickAmount} ETH
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Message (optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field w-full h-20 resize-none"
            placeholder="Add a message with your tip..."
            maxLength={280}
          />
          <div className="text-xs text-muted mt-1">
            {message.length}/280
          </div>
        </div>

        <button
          onClick={handleTip}
          disabled={isLoading || amount <= 0}
          className="btn-primary w-full"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending tip...</span>
            </div>
          ) : status === 'success' ? (
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-4 h-4" />
              <span>Tip sent!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send {amount} ETH tip</span>
            </div>
          )}
        </button>

        {status === 'error' && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Failed to send tip. Please try again.</span>
          </div>
        )}
      </div>
    </div>
  );
}
