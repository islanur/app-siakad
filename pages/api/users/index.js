import { createUser, getUserByEmail, getUsers } from '@/lib/prisma/users';
import argon2 from 'argon2';
import prisma from '.';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const { users, error } = await getUsers();
			if (error) throw new Error(error);
			return res.status(200).json({ users });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	if (req.method === 'POST') {
		try {
			const { name, email, password, confPassword, role } = req.body;
			if (password !== confPassword)
				return res.status(400).json({ msg: 'Password not match' });

			const emailFromDB = await getUserByEmail(email);
			if (emailFromDB)
				return res.status(400).json({ msg: 'User already exist!' });

			const hashPassword = await argon2.hash(password);
			const data = { name, email, password: hashPassword, role };

			const { user, error } = await createUser(data);
			if (error) throw new Error(error);
			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	}

	res.setHeader('Allow', ['GET', 'POST']);
	res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
