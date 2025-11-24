// Creates array of dto objects
function toDtoArray(modelArr, map) {
	let dtos = [];
	for (let i = 0; i < modelArr.length; i++) {
		const model = modelArr[i];
		const dto = map(model);
		dtos.push(dto);
	}
	return dtos;
}

function toDtoPage(modelPage, map) {
	const dto = toDtoArray(modelPage.data, map);
	return {
		totalPages: modelPage.totalPages,
		totalElements: modelPage.totalElements,
		data: dto,
	};
}

module.exports = { toDtoArray, toDtoPage };
