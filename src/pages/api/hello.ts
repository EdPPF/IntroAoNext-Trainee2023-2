// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// api/users.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {method} = req;
	if (method === "GET") {
		const users = await prisma.user.findMany();
		return res.status(200).json({
			data: users,
		})
	}
}
