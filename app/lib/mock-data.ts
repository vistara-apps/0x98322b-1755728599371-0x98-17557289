
import type { User, Tip, Creator } from '../types';

export const mockCreators: Creator[] = [
  {
    id: 'creator-1',
    name: 'Alex Chen',
    handle: '@alexbuilds',
    profileUrl: 'https://warpcast.com/alexbuilds',
    revenueShare: 0.05,
    platformHandles: {
      warpcast: '@alexbuilds',
      twitter: '@alexbuilds',
    },
    totalTips: 156,
    totalRevenue: 2.34,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
  },
  {
    id: 'creator-2',
    name: 'Sarah Kim',
    handle: '@sarahcreates',
    profileUrl: 'https://warpcast.com/sarahcreates',
    revenueShare: 0.03,
    platformHandles: {
      warpcast: '@sarahcreates',
      twitter: '@sarahcreates',
    },
    totalTips: 89,
    totalRevenue: 1.67,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  },
  {
    id: 'creator-3',
    name: 'Mike Torres',
    handle: '@mikedesigns',
    profileUrl: 'https://warpcast.com/mikedesigns',
    revenueShare: 0.04,
    platformHandles: {
      warpcast: '@mikedesigns',
    },
    totalTips: 234,
    totalRevenue: 3.21,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
  },
];

export const mockTips: Tip[] = [
  {
    id: 'tip-1',
    fromUserId: 'user-1',
    toCreatorId: 'creator-1',
    amountETH: 0.01,
    gasPaid: 0.002,
    status: 'success',
    txHash: '0x1234567890abcdef',
    createdAt: new Date('2024-01-20T10:30:00Z'),
    settledAt: new Date('2024-01-20T10:31:00Z'),
    platform: 'warpcast',
    message: 'Great post about Base development!',
  },
  {
    id: 'tip-2',
    fromUserId: 'user-1',
    toCreatorId: 'creator-2',
    amountETH: 0.005,
    gasPaid: 0.0015,
    status: 'pending',
    createdAt: new Date('2024-01-20T11:00:00Z'),
    platform: 'twitter',
    message: 'Love your design work',
  },
  {
    id: 'tip-3',
    fromUserId: 'user-1',
    toCreatorId: 'creator-3',
    amountETH: 0.02,
    gasPaid: 0.003,
    status: 'failed',
    createdAt: new Date('2024-01-20T09:15:00Z'),
    platform: 'warpcast',
  },
];

export const mockUser: User = {
  id: 'user-1',
  walletAddress: '0x742f35c85b39f2c9bc8b76f0b1b8b5c8d04a8b6c',
  email: 'user@example.com',
  kycStatus: 'verified',
  preferences: {
    defaultTipAmount: 0.01,
    platformIntegrations: ['warpcast', 'twitter'],
  },
  verified: true,
  createdAt: new Date('2024-01-15T00:00:00Z'),
};
