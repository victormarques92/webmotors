import { webmotors, successCallback, failureCallback } from "../api";

export const loadBrands = async () => {
	return webmotors()
		.get(`OnlineChallenge/Make`)
		.then(successCallback)
		.catch(failureCallback);
};

export const loadModels = async (makeID) => {
	return webmotors()
		.get(`OnlineChallenge/Model?MakeID=${makeID}`)
		.then(successCallback)
		.catch(failureCallback);
};

export const loadVersions = async (modeID) => {
	return webmotors()
		.get(`OnlineChallenge/Version?ModelID=${modeID}`)
		.then(successCallback)
		.catch(failureCallback);
};

export const loadVehicles = async () => {
	return webmotors()
		.get(`OnlineChallenge/Vehicles?Page=1`)
		.then(successCallback)
		.catch(failureCallback);
};
