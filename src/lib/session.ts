import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { UserSession } from "./Types";

export async function getSession() {
	const cookieStore = await cookies();
	const session = cookieStore.get('session');
	if (!session) return undefined;

	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		await jwtVerify(session.value, secret);
		return session;
	} catch (error) {
		cookieStore.delete('session');
		return undefined;
	}
}

export async function getSessionUser() {
	const session = await getSession();
	if (!session) return undefined;
	else return decodeJwt(session.value) as UserSession;
}


