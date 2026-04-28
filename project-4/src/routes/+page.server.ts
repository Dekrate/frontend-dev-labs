import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const tasks = await db.task.findMany({
		orderBy: { createdAt: 'desc' }
	});
	return { tasks };
};
