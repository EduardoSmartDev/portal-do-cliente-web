'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { FetchApiInterface } from './utils/Types';

export async function fetchApi({ endpoint, options }: FetchApiInterface) {
	try {
		const session = await getSession();
		if (!session) return redirect('/login');

		const dados = await (
			await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL as string}/${endpoint}`, {
				...options,
				headers: {
					...options?.headers,
					'Authorization': `Bearer ${session.value}`
				}
			})
		).json();

		return dados;
	} catch (error) {
		console.error(error);
		return redirect('/home');
	}
}
