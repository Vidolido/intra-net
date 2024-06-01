'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import { revalidatePath } from 'next/cache';

export async function createSetting(formData) {
	const payload = formData.payload;
	console.log(payload, 'THE FORM DATA IN CREATE SETTING');
}
