'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Address } from 'viem';

interface TokenIconProps {
  tokenAddress: Address;
  name?: string;
  symbol?: string;
  size?: number;
  className?: string;
}

export default function TokenIcon({
  tokenAddress,
  name,
  symbol,
  size = 32,
  className = '',
}: TokenIconProps) {
  const [imageError, setImageError] = useState(false);
  
  // Base URL for token icons - using Zora's token API
  const iconUrl = `https://api.zora.co/token/${tokenAddress}/icon`;
  
  // Generate a fallback color based on the token address
  const generateColorFromAddress = (address: string): string => {
    const hash = address.slice(2, 8);
    return `#${hash}`;
  };
  
  const fallbackColor = generateColorFromAddress(tokenAddress);
  
  // Get the initials for the fallback
  const getInitials = (): string => {
    if (symbol) return symbol.slice(0, 2).toUpperCase();
    if (name) return name.slice(0, 2).toUpperCase();
    return tokenAddress.slice(2, 4).toUpperCase();
  };
  
  if (imageError) {
    // Display a colored circle with initials as fallback
    return (
      <div
        className={`flex items-center justify-center rounded-full text-white font-bold ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: fallbackColor,
          fontSize: size * 0.4,
        }}
      >
        {getInitials()}
      </div>
    );
  }
  
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconUrl}
        alt={name || symbol || 'Token Icon'}
        width={size}
        height={size}
        className="object-cover"
        onError={() => setImageError(true)}
        unoptimized={true}
      />
    </div>
  );
} 