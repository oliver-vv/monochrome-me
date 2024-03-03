// +page.server.ts or +page.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const response = await fetch('https://picsum.photos/v2/list?limit=60');
		if (!response.ok) {
			throw new Error('Failed to fetch images');
		}
		const images = await response.json();
		console.log('Success fetching images', images);
		return {
			images
		};
	} catch (error) {
		console.error('Error fetching images:', error);
		return {
			images: []
		};
	}
};
