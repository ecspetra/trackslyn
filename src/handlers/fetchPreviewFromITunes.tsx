export const fetchPreviewFromITunes = async (trackName: string, artistName: string) => {
	const query = `${trackName} ${artistName}`;

	const res = await fetch(
		`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`
	);

	const data = await res.json();

	return data.results?.[0]?.previewUrl || null;
};