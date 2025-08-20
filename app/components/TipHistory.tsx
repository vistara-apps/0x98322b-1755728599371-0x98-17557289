
"use client";

import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { Tip, Creator } from '../types';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface TipHistoryProps {
  tips: Tip[];
  creators: Creator[];
  className?: string;
}

export function TipHistory({ tips, creators, className }: TipHistoryProps) {
  const getCreator = (creatorId: string) => 
    creators.find(c => c.id === creatorId);

  const getStatusIcon = (status: Tip['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
      case 'retrying':
        return <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-muted" />;
    }
  };

  const getStatusColor = (status: Tip['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'pending':
      case 'retrying':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-muted';
    }
  };

  return (
    <div className={cn('card', className)}>
      <h2 className="font-semibold mb-4">Recent Tips</h2>
      
      {tips.length === 0 ? (
        <div className="text-center py-8 text-muted">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No tips yet. Start tipping creators!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tips.map((tip) => {
            const creator = getCreator(tip.toCreatorId);
            
            return (
              <div key={tip.id} className="flex items-center justify-between p-3 bg-surface/30 rounded-md hover:bg-surface/50 transition-colors">
                <div className="flex items-center space-x-3">
                  {creator && (
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-medium text-sm">
                      {creator?.name || 'Unknown Creator'}
                    </div>
                    <div className="text-xs text-muted">
                      {formatDistanceToNow(new Date(tip.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium tip-amount">
                      {tip.amountETH} ETH
                    </span>
                    {getStatusIcon(tip.status)}
                  </div>
                  <div className={cn('text-xs capitalize', getStatusColor(tip.status))}>
                    {tip.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
