import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function getToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return `Bearer ${token}`;
}
export async function signIn(email, password, photon) {
  try {
    const {
      password: storedPassword,
      ...user
    } = await photon.users.findOne({
      where: {
        email,
      },
      include: { donor: true },
    });
    const validpass = await bcrypt.compareSync(
      password,
      storedPassword,
    );
    if (validpass) {
      const token = getToken(user);
      return {
        user,
        token,
      };
    }
    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return null;
  }
}

export const register = async ({ password, ...data }, photon) => {
  try {
    const existingUser = await photon.users.findOne({
      where: {
        email: data.email,
      },
      select: { id: true },
    });
    if (existingUser) {
      throw new Error('ERROR: email already used.');
    }
    const hash = bcrypt.hashSync(password, 10);

    const {
      password: savedPassword,
      ...user
    } = await photon.users.create({
      data: { ...data, password: hash },
      include: { donor: true },
    });
    const token = getToken(user);

    return {
      user,
      token,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return null;
  }
};
