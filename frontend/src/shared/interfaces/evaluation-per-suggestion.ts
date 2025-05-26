export interface EvaluationPerSuggestion {
    suggestion: {
        id: number;
        errorCode: string;
        text: string;
    };
    averageEvaluation: number;
    totalEvaluations: string;
    positiveEvaluations: number;
}