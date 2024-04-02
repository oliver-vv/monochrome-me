import { error, type RequestHandler } from '@sveltejs/kit';

import JSZip from 'jszip';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { supabase } = locals;

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const data = await request.json();
	// const { selectedImages } = data;
	console.log('data:', data);
	// const data = JSON.parse((await request.body.read()).toString());
	// const zip = new JSZip();

	// const image = await (await fetch(data.img)).arrayBuffer();

	// return new Response(gen, {
	// 	status: 302,
	// 	headers: {
	// 		'Content-Type': 'application/zip',
	// 		'Content-Disposition': 'attachment; filename="dummy.zip"'
	// 	}
	// });

	const { data: signedUrlsData, error: signedUrlsError } = await supabase.storage
		.from('images')
		.createSignedUrls(data, 600); // 600 seconds -> 10 minutes then refresh

	if (signedUrlsError) {
		return new Response('Not found', { status: 401 });
	}

	return new Response(
		JSON.stringify({
			signedUrlsData
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};
