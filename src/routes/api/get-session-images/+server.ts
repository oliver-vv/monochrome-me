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
	console.log('User: ', user.id);
	const { data: listData, error: listError } = await supabase.storage.from('images').list(user.id, {
		limit: 100,
		offset: 0,
		sortBy: { column: 'created_at', order: 'asc' }
	});

	console.log('ListData: ', listData);
	console.log('ListError: ', listError);

	if (listError) {
		return new Response('Not found', { status: 401 });
	}

	const fileNames = listData.map((file) => file.name);
	console.log('FileNames: ', fileNames);
	const filePaths = fileNames.map((fileName) => `${user.id}/${fileName}`);
	console.log('FilePaths: ', filePaths);
	const { data: signedUrlsData, error: signedUrlsError } = await supabase.storage
		.from('images')
		.createSignedUrls(filePaths, 600); // 600 seconds -> 10 minutes then refresh

	console.log('SignedUrlsData: ', signedUrlsData);

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
