
"use client";

import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import type { Creator, Tip } from '../types';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface CreatorDashboardProps {
  creator: Creator;
  tips: Tip[];
  variant?: 'cards' | 'detailed';
  className?: string;
}

export function CreatorDashboard({ creator, tips, variant = 'cards', className }: CreatorDashboardProps) {
  const recentTips = tips.slice(0, 5);
  const todayTips = tips.filter(tip => 
    new Date(tip.createdAt).toDateString() === new Date().toDateString()
  );
  
  const totalToday = todayTips.reduce((sum, tip) => sum + tip.amountETH, 0);
  const successRate = tips.length > 0 
    ? (tips.filter(tip => tip.status === 'success').length / tips.length) * 100 
    : 0;

  const stats = [
    {
      label: 'Total Revenue',
      value: `${creator.totalRevenue.toFixed(3)} ETH`,
      icon: DollarSign,
      trend: '+12%',
      color: 'text-green-400',
    },
    {
      label: 'Total Tips',
      value: creator.totalTips.toString(),
      icon: Users,
      trend: '+8%',
      color: 'text-blue-400',
    },
    {
      label: 'Today\'s Tips',
      value: `${totalToday.toFixed(3)} ETH`,
      icon: TrendingUp,
      trend: `${todayTips.length} tips`,
      color: 'text-purple-400',
    },
    {
      label: 'Success Rate',
      value: `${successRate.toFixed(1)}%`,
      icon: Activity,
      trend: 'Last 30 days',
      color: 'text-yellow-400',
    },
  ];

  if (variant === 'cards') {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={cn('w-5 h-5', stat.color)} />
                <span className="text-xs text-muted">{stat.trend}</span>
              </div>
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="card">
        <h2 className="text-display mb-6">Creator Dashboard</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={cn('w-5 h-5', stat.color)} />
                <span className="text-xs text-muted">{stat.trend}</span>
              </div>
              <div className="text-xl font-semibold">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Recent Tips</h3>
          <div className="space-y-3">
            {recentTips.map((tip) => (
              <div key={tip.id} className="flex items-center justify-between p-3 bg-surface/30 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    tip.status === 'success' && 'bg-green-400',
                    tip.status === 'pending' && 'bg-yellow-400',
                    tip.status === 'failed' && 'bg-red-400'
                  )} />
                  <div>
                    <div className="font-medium text-sm">{tip.amountETH} ETH</div>
                    <div className="text-xs text-muted">
                      {formatDistanceToNow(new Date(tip.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    'text-xs px-2 py-1 rounded-full',
                    tip.status === 'success' && 'status-success',
                    tip.status === 'pending' && 'status-pending',
                    tip.status === 'failed' && 'status-failed'
                  )}>
                    {tip.status}
                  </div>
                  {tip.message && (
                    <div className="text-xs text-muted mt-1 max-w-32 truncate">
                      "{tip.message}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
