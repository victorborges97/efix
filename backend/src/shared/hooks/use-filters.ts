import { Prisma } from "@prisma/client";

type Params = { [key: string]: any }
export function useEvaluationFilter(params: Params) {
    const where: Prisma.EvaluationWhereInput = {};
    if (params.from || params.to) {
        where.createdAt = {};
        if (params.from) where.createdAt.gte = params.from;
        if (params.to) where.createdAt.lte = params.to;
    }
    if (params.errorCode) where.errorCode = params.errorCode;
    return where;
}

export function useSuggestionFilter(params: Params) {
    const where: Prisma.SuggestionWhereInput = {};
    if (params.errorCode) where.errorCode = params.errorCode;
    return where;
}