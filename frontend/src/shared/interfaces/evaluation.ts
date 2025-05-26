export interface Evaluation {
    id: string;
    suggestionId: string;
    errorCode: string;
    createdAt: Date;
    clientCode: string;
    evaluation: boolean;
    comment: string;
}