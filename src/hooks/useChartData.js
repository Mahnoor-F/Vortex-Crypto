import { useQuery } from '@tanstack/react-query';
import { getCoinChartData } from '../api/cryptoApi';

export const useChartData = (coinId) => {
    return useQuery({
        queryKey: ['coinChart', coinId],
        queryFn: () => getCoinChartData(coinId),
        staleTime: 60000 * 30, 
    });
};