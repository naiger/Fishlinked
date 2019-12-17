// @flow
export function openImageViewer(bool: boolean, index: number) {
	return {
		type: "OPEN_IMAGE_VIEWER",
		isOpen: bool,
		index,
	};
}
