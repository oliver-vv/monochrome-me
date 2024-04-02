// +page.server.ts or +page.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// try {
	// 	const response = await event.fetch(`/api/get-session-images`);
	// 	if (!response.ok) {
	// 		throw new Error('Failed to fetch images');
	// 	}
	// 	const data = await response.json();
	// 	const urls = data.urls;
	// 	return {
	// 		urls
	// 	};
	// } catch (error) {
	// 	console.error('Error fetching images:', error);
	// 	return {
	// 		urls: []
	// 	};
	// }
};
