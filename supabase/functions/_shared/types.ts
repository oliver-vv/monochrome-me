export interface SetmoreWebhookPayload {
	'customer.email': string;
	'customer.name': string;
	'booking.id': string;
	[key: string]: string;
}

export interface SignedUrlResponse {
	signedUrl: string;
	path: string;
	error: null | string;
}

export interface DownloadResponse {
	images: SignedUrlResponse[];
	appointmentId: string;
	clientName: string;
}
