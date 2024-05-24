import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

type SessionPayload = {
  userName: string;
  mood: string;
  session: string;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Encrypting the session
export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

// Decrypting the session
export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
};

// Creating the session
export const createSession = async (
  userName: string,
  mood: string,
  session: string
) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const sessionValues = await encrypt({ userName, mood, session, expiresAt });

  cookies().set("session", sessionValues, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

// Updating the session
export const updateSession = async () => {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
};

// Deleting the session
export const deleteSession = () => {
  cookies().delete("session");
};
