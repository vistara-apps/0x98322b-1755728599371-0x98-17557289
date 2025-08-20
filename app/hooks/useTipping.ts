
"use client";

import { useState, useCallback } from 'react';
import type { TipFormData, Tip } from '../types';
import { generateTxHash } from '../lib/utils';

export function useTipping() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendTip = useCallback(async (data: TipFormData): Promise<Tip> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate gasless transaction processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate occasional failures for demo
      if (Math.random() < 0.1) {
        throw new Error('Transaction failed due to network congestion');
      }

      const tip: Tip = {
        id: `tip-${Date.now()}`,
        fromUserId: 'current-user',
        toCreatorId: data.creatorId,
        amountETH: data.amount,
        gasPaid: 0, // Gasless!
        status: 'success',
        txHash: generateTxHash(),
        createdAt: new Date(),
        settledAt: new Date(),
        platform: data.platform,
        message: data.message,
      };

      return tip;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send tip';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendTip,
    isLoading,
    error,
  };
}
