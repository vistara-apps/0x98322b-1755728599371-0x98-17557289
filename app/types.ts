
export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  preferences: {
    defaultTipAmount: number;
    platformIntegrations: string[];
  };
  verified: boolean;
  createdAt: Date;
}

export interface Tip {
  id: string;
  fromUserId: string;
  toCreatorId: string;
  amountETH: number;
  gasPaid: number;
  status: 'pending' | 'success' | 'failed' | 'retrying';
  txHash?: string;
  createdAt: Date;
  settledAt?: Date;
  platform: string;
  message?: string;
}

export interface Creator {
  id: string;
  profileUrl: string;
  name: string;
  handle: string;
  revenueShare: number;
  platformHandles: Record<string, string>;
  totalTips: number;
  totalRevenue: number;
  avatar?: string;
}

export interface Wallet {
  id: string;
  walletAddress: string;
  chain: string;
  isGaslessEnabled: boolean;
  userId: string;
}

export interface TipFormData {
  creatorId: string;
  amount: number;
  message?: string;
  platform: string;
}
