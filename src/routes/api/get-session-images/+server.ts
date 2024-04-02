import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const {
		locals: { supabase }
	} = event;

	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const { data: listData, error: listError } = await supabase.storage.from('images').list(user.id, {
		limit: 100,
		offset: 0,
		sortBy: { column: 'created_at', order: 'asc' }
	});

	if (listError) {
		return new Response('Not found', { status: 401 });
	}

	const fileNames = listData.map((file) => file.name);
	const filePaths = fileNames.map((fileName) => `${user.id}/${fileName}`);

	const { data: signedUrlsData, error: signedUrlsError } = await supabase.storage
		.from('images')
		.createSignedUrls(filePaths, 600); // 600 seconds -> 10 minutes then refresh

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
