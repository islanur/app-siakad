import prisma from '.';

export async function getUsers() {
	try {
		const users = await prisma.user.findMany();
		return { users };
	} catch (error) {
		return { error };
	}
}

export async function createUser(user) {
	try {
		const userFromDB = await prisma.user.create({ data: user });
		return { user: userFromDB };
	} catch (error) {
		return { error };
	}
}

export async function getUserById(id) {
	try {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		return { user };
	} catch (error) {
		return { error };
	}
}

export async function getUserByEmail(email) {
	try {
		const emailUser = await prisma.user.findUnique({
			where: { email },
			select: { email: true },
		});
		return emailUser;
	} catch (error) {
		return { error };
	}
}
