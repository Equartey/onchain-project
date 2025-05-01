'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { Avatar, Name } from '@coinbase/onchainkit/identity';

export default function Navigation() {
  const pathname = usePathname();
  
  // Sample coin address - in a real app, you might use a default or popular coin
  const exampleCoinAddress = '0x0acd5006a4ee321be73bbe7a033cec236c9a62db';

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Coin Trading App</div>
        
        <div className="flex items-center space-x-8">
          <Link 
            href="/" 
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === '/' 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                : 'hover:bg-indigo-600'
            }`}
          >
            Home
          </Link>
          
          <Link 
            href={`/coin/${exampleCoinAddress}`}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname.startsWith('/coin/') 
                ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                : 'hover:bg-indigo-600'
            }`}
          >
            Trade Coins
          </Link>

          <div className="ml-4">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-8 w-8" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </div>
    </nav>
  );
}