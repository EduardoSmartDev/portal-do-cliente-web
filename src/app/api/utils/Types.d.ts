export interface FetchApiInterface {
	endpoint: string;
	options: RequestInit;
}

export type FetchApiError = {
	statusCode: number;
	message: string;
};
