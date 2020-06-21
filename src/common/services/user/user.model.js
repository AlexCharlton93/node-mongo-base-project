import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { regex } from '../../regex';

function lockdown(next) {
	const error = new Error('This action is locked down');

	return next(error);
}

const name = 'User';

const options = {
	strict: false,
};

const properties = {
	_id: {
		type: String,
		required: true,
		default: uuid,
		validate: regex.uuidv4,
	},
	firstName: {
		type: String,
		validate: regex.user.firstName,
	},
	surname: {
		type: String,
		validate: regex.user.surname,
	},
	emailAddress: {
		type: String,
		required: true,
		validate: regex.user.emailAddress,
	},
	contactNumber: {
		type: String,
		validate: regex.user.contactNumber,
	},
	password: {
		type: String,
		required: true,
		// TODO: // validate: regex.user.password,
	},
	deliveryAddress: {
		addressLine1: {
			type: String,
			validate: regex.user.addressLine1,
		},
		addressLine2: {
			type: String,
			validate: regex.user.addressLine2,
		},
		addressLine3: {
			type: String,
			validate: regex.user.addressLine3,
		},
		country: {
			type: String,
			validate: regex.user.country,
		},
		postcode: {
			type: String,
			validate: regex.user.postcode,
		},
	},
	billingAddress: {
		addressLine1: {
			type: String,
			validate: regex.user.addressLine1,
		},
		addressLine2: {
			type: String,
			validate: regex.user.addressLine2,
		},
		addressLine3: {
			type: String,
			validate: regex.user.addressLine3,
		},
		country: {
			type: String,
			validate: regex.user.country,
		},
		postcode: {
			type: String,
			validate: regex.user.postcode,
		},
	},
	role: {
		type: Number,
		required: true,
		validate: regex.user.role,
	},
	verificationCode: {
		type: String,
		validate: regex.user.verificationCode,
	},
	emailsEnabled: {
		type: Boolean,
		default: true,
	},
};

const schema = new mongoose.Schema(properties, options);

schema.pre('remove', lockdown);

const Model = mongoose.model(name, schema, name);

export {
	lockdown,
	Model,
	name,
	options,
	properties,
	schema,
};
