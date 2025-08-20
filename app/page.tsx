
"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  usePrimaryButton,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useState, useCallback } from "react";
import { Plus, Zap, TrendingUp, Users } from "lucide-react";

import { AppShell } from "./components/AppShell";
import { TipWidget } from "./components/TipWidget";
import { TipHistory } from "./components/TipHistory";
import { CreatorDashboard } from "./components/CreatorDashboard";
import { mockCreators, mockTips, mockUser } from "./lib/mock-data";
import { useTipping } from "./hooks/useTipping";
import type { TipFormData, Tip } from "./types";

export default function TipFluxApp() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'tip' | 'history' | 'dashboard'>('tip');
  const [tips, setTips] = useState<Tip[]>(mockTips);
  const [selectedCreator, setSelectedCreator] = useState(mockCreators[0]);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const { sendTip, isLoading } = useTipping();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  usePrimaryButton(
    {
      text: activeTab === 'tip' ? 'Quick Tip 0.01 ETH' : 
            activeTab === 'history' ? 'View All Tips' : 'Creator Analytics',
    },
    () => {
      if (activeTab === 'tip') {
        handleTip({
          creatorId: selectedCreator.id,
          amount: 0.01,
          platform: 'warpcast',
        });
      } else if (activeTab === 'history') {
        setActiveTab('tip');
      } else {
        openUrl('https://tipflux.base.eth/analytics');
      }
    }
  );

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame();
    setFrameAdded(Boolean(result));
  }, [addFrame]);

  const handleTip = async (data: TipFormData) => {
    try {
      const newTip = await sendTip(data);
      setTips(prev => [newTip, ...prev]);
    } catch (error) {
      console.error('Tip failed:', error);
    }
  };

  const userTips = tips.filter(tip => tip.fromUserId === mockUser.id);
  const creatorTips = tips.filter(tip => tip.toCreatorId === selectedCreator.id);

  return (
    <AppShell variant="glass">
      <div className="py-4 space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-display text-white">TipFlux</h1>
              <p className="text-sm text-muted">Gasless ETH tipping</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Wallet className="z-10">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            
            {context && !context.client.added && (
              <button
                onClick={handleAddFrame}
                className="btn-ghost p-2"
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
            
            {frameAdded && (
              <div className="text-green-400 text-sm animate-fade-in">
                ✓ Saved
              </div>
            )}
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex space-x-1 bg-surface/50 p-1 rounded-lg">
          {[
            { id: 'tip', label: 'Send Tips', icon: Zap },
            { id: 'history', label: 'History', icon: TrendingUp },
            { id: 'dashboard', label: 'Dashboard', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted hover:text-text hover:bg-surface/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className="space-y-6">
          {activeTab === 'tip' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="font-semibold">Select Creator</h2>
                <div className="space-y-3">
                  {mockCreators.map((creator) => (
                    <button
                      key={creator.id}
                      onClick={() => setSelectedCreator(creator)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        selectedCreator.id === creator.id
                          ? 'border-primary bg-primary/5 animate-pulse-glow'
                          : 'border-white/10 bg-surface/30 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="font-medium">{creator.name}</div>
                          <div className="text-sm text-muted">{creator.handle}</div>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-muted">
                              {creator.totalTips} tips
                            </span>
                            <span className="text-xs text-primary">
                              {creator.totalRevenue.toFixed(3)} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <TipWidget
                creator={selectedCreator}
                variant="expanded"
                onTip={handleTip}
                className="animate-slide-up"
              />
            </div>
          )}

          {activeTab === 'history' && (
            <TipHistory
              tips={userTips}
              creators={mockCreators}
              className="animate-fade-in"
            />
          )}

          {activeTab === 'dashboard' && (
            <CreatorDashboard
              creator={selectedCreator}
              tips={creatorTips}
              variant="detailed"
              className="animate-fade-in"
            />
          )}
        </main>

        {/* Footer */}
        <footer className="pt-6 text-center">
          <button
            onClick={() => openUrl("https://base.org/builders/minikit")}
            className="text-xs text-muted hover:text-text transition-colors"
          >
            Built on Base with MiniKit
          </button>
        </footer>
      </div>
    </AppShell>
  );
}
