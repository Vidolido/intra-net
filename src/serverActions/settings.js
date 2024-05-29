'use server';

// connection/moddels/database functions
import dbConnect from '@/db/conn';
import { revalidatePath } from 'next/cache';

export async function createSetting(formData) {
	console.log(formData, 'THE FORM DATA IN CREATE SETTING');
}
