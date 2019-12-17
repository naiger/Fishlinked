// @flow
export function openPhotoViewer(bool: boolean, index: number) {
	return {
		type: "OPEN_PHOTO_VIEWER",
		isOpen: bool,
		index,
	};
}
