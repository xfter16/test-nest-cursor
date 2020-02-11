export interface ICursorPage {
    [cursor: string]: {
        to: string;
        limit: number;
    };
}