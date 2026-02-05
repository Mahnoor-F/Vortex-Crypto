import { useQuery } from '@tanstack/react-query';
import { getCryptoData } from '../api/cryptoApi';

export const useCrypto = () => {
  return useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: getCryptoData,
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
    retry: 1, 
    refetchOnWindowFocus: false, 
  });
};