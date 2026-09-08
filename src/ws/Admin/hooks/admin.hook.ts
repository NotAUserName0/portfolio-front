import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPortfolioService, getPortfolioService, getPortfolioMainService, loginService } from "../services/admin.service";
import type { PortfolioDto } from "../../objects/portafolio.dto";

export const useCreatePortfolioHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPortfolioService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        }
    });
};

export const useGetPortfolioHook = () => {
    return useQuery<PortfolioDto | null>({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const response = await getPortfolioService();
            const data = response.data.data;
            if (!data) return null;
            return {
                ...data,
                image: data.image ?? data.file ?? null,
            };
        },
    });
};

/**
 * @description Hook to fetch the main portfolio data without token.
 * @returns The main portfolio data or null if not available.
 */
export const useGetPortfolioMainHook = () => {
    return useQuery<PortfolioDto | null>({
        queryKey: ['portfolio'],
        queryFn: async () => {
            const response = await getPortfolioMainService();
            const data = response.data.data;
            if (!data) return null;
            return {
                ...data,
                image: data.image ?? data.file ?? null,
            };
        },
    });
};

export const useLoginHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
        }
    });
};