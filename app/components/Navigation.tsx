'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  // Sample coin address - in a real app, you might use a default or popular coin
  const exampleCoinAddress = '0x5f8a8211e57d030dfa5062e8c5b696765ab5b34e';

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Coin Trading App</div>
        
        <div className="flex space-x-6">
          <Link 
            href="/" 
            className={`hover:text-indigo-300 transition ${
              pathname === '/' ? 'text-indigo-400' : ''
            }`}
          >
            Home
          </Link>
          
          <Link 
            href={`/coin/${exampleCoinAddress}`}
            className={`hover:text-indigo-300 transition ${
              pathname.startsWith('/coin/') ? 'text-indigo-400' : ''
            }`}
          >
            Trade Coins
          </Link>
        </div>
      </div>
    </nav>
  );
} 