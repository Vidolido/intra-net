'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import Vehicle from '@/db/models/Vehicle';
import VehicleTransaction from '@/db/models/VehicleTransaction';
import { revalidatePath } from 'next/cache';

export async function addNewVehicle(formData) {
	const payload = {
		user: formData.get('user'),
		plates: formData.get('plates'),
		color: formData.get('color'),
		equipment: formData.get('equipment'),
		insurance: formData.get('insurance'),
		vehicleType: formData.get('vehicleType'),
		inUse: formData.get('inUse') === 'on' ? true : false,
		registration: {
			last: formData.get('registrationLast'),
			next: formData.get('registrationNext'),
		},
		service: {
			small: {
				km: formData.get('smallServiceKM'),
				date: formData.get('smallServiceDate'),
			},
			big: {
				km: formData.get('bigServiceKM'),
				date: formData.get('bigServiceDate'),
			},
			km: formData.get('serviceKM'),
		},
		tireChange: {
			summer: formData.get('tireChangeSummer'),
			winter: formData.get('tireChangeWinter'),
		},
	};
	try {
		await dbConnect();
		await Vehicle.create(payload);
	} catch (error) {
		console.log('addNewVehicle error:', error);
		throw Error('Could not add vehicle to database: ' + error);
	}
}

export async function rentVehicle(formData) {
	const payload = {
		user: formData.get('userId'),
		vehicle: formData.get('vehicleId'),
		location: formData.get('location'),
		date: new Date(),
		rentTime: new Date(),
		status: 'pending',
	};

	try {
		await dbConnect();
		if (payload.user === 'none') {
			return;
		} else {
			await Vehicle.updateOne(
				{ _id: payload.vehicle },
				{ user: payload.user, inUse: true }
			);
			await VehicleTransaction.create(payload);
			revalidatePath('/', 'page');
		}
	} catch (error) {
		console.log('rentVehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
}

export const returnVehicle = async ({ transaction, vehicle }) => {
	try {
		await dbConnect();
		await Vehicle.updateOne({ _id: vehicle }, { user: 'none', inUse: false });
		await VehicleTransaction.updateOne(
			{ _id: transaction },
			{ status: 'complete', returnTime: new Date() }
		);
		revalidatePath('/', 'page');
		return {
			error: {
				returnVehicle: '',
			},
		};
	} catch (error) {
		console.log('returnVehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};

export const makeReservation = async (formData) => {
	// Ова ќе треба да се усогласи со серверот.
	let setTimeDate = new Date();
	setTimeDate.setHours(
		Number(formData.get('hour')),
		Number(formData.get('minutes'))
	);

	const payload = {
		user: formData.get('userId'),
		vehicle: formData.get('vehicleId'),
		location: formData.get('location'),
		date: setTimeDate,
		status: 'reserved',
	};
	if (payload.user === 'none') {
		return;
	}
	try {
		await VehicleTransaction.create(payload);
		revalidatePath('/', 'page');
	} catch (error) {
		console.log('makeReservation error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};

export const confirmReservation = async (data) => {
	const { transaction, vehicle } = data;
	try {
		await dbConnect();
		const alreadyInUse = await VehicleTransaction.findOne({
			vehicle,
			status: 'pending',
		});
		if (!alreadyInUse) {
			await VehicleTransaction.updateOne(
				{ _id: transaction },
				{ rentTime: new Date(), status: 'pending' }
			);
			revalidatePath('/', 'page');
			return {
				error: {
					confirmReservation: '',
				},
			};
			return {
				status: 200,
				customMessage: '',
				data: null,
			};
		} else {
			return {
				error: {
					confirmReservation: 'Vehicle already in use.',
				},
			};
			return {
				status: 200,
				error: {
					error: error.message,
					displayError: 'Display Error',
					errorForm: 'confirmReservation',
					confirmReservation: 'Vehicle already in use.',
				},
				customMessage: '',
			};
		}
	} catch (error) {
		console.log('confirmReservation error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};

export const cancelReservation = async (data) => {
	try {
		await dbConnect();
		await VehicleTransaction.updateOne({ _id: data }, { status: 'canceled' });
		revalidatePath('/', 'page');
		return {
			error: {
				cancelReservation: '',
			},
		};
	} catch (error) {
		console.log('cancelReservation error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};

export const checkIfUserRented = async (userId) => {
	try {
		await dbConnect();
		const user = await VehicleTransaction.find({
			user: userId,
			status: 'pending',
		});
		// return JSON.stringify(user);
		revalidatePath('/', 'page');

		return !user.length ? false : true;
	} catch (error) {
		console.log('Check if user has rented a vehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};

// Vehicle Profile
export const getTransactionsByDate = async (from, to) => {
	const fromDate = new Date(from).toISOString().split('T')[0];
	const tomorow = new Date(from);
	tomorow.setDate(new Date(from).getDate() + 1);
	const toDate = !to
		? tomorow
		: new Date(new Date(to).setDate(new Date(to).getDate() + 1));

	const payload = {
		date: { $gte: fromDate, $lt: toDate },
		status: 'complete',
	};

	try {
		await dbConnect();
		const transactions = await VehicleTransaction.find(payload)
			.populate('vehicle')
			.exec();
		return JSON.stringify(transactions);
	} catch (error) {
		console.log('returnVehicle error:', error);
		throw Error('Could not insert transaction to database: ' + error);
	}
};
