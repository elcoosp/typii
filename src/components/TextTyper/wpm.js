export default function wpm(typedCharsCount, start, end) {
	const wordCharCount = 5
	const timestampDelta = end - start
	const minutes = timestampDelta / 60000
	return Math.round(typedCharsCount / wordCharCount / minutes)
}
