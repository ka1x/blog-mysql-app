export const getText = (html, maxWords) => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const textContent = doc.body.textContent.trim(); // Remove leading/trailing whitespace
	const words = textContent.split(/\s+/); // Split into words

	// const maxWords = 100;
	let truncatedText = words.slice(0, maxWords).join(' ');

	if (words.length > maxWords) {
		truncatedText += '...';
	}
	return truncatedText;
};