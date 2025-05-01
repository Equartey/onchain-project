"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { Avatar, Name } from "@coinbase/onchainkit/identity";

// Sample coin address - in a real app, you might use a default or popular coin
const exampleCoinAddress = "0x5f8a8211e57d030dfa5062e8c5b696765ab5b34e";

const navigationItems = [
  { href: "/", label: "Home", isActive: (path: string) => path === "/" }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#0a0a0a] text-[#ededed] p-4 border-b border-[#333333]">
      <div className="flex justify-between items-center w-full pl-1">
        <div className="text-xl font-bold text-[#ff8c00]">COIN TRADING APP</div>
        <div className="flex items-center space-x-8 gap-2">
          {navigationItems.map(({ href, label, isActive }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(pathname)
                  ? "bg-[#ff8c00] text-[#0a0a0a] hover:bg-[#ff9c20] font-bold"
                  : "hover:bg-[#333333]"
              }`}
            >
              {label}
            </Link>
          ))}
          <div>
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
