import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (email, password, photon) => {
  try {
    const { password: storedPassword, ...user } = await photon.users.findOne({
      where: {
        email
      }
    });
    const validpass = await bcrypt.compareSync(password, storedPassword);
    if (validpass) {
      const token = jwt.sign(user, process.env.JWT_SECRET);
      return {
        user: user,
        token
      };
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const register = async ({ password, ...data }, photon) => {
  try {
    const existingUser = await photon.users.findOne({
      where: {
        email: data.email
      },
      select: { id: true }
    });
    if (existingUser) {
      throw new Error("ERROR: email already used.");
    }
    const hash = bcrypt.hashSync(password, 10);

    const { password: savedPassword, ...register } = await photon.users.create({
      data: { ...data, password: hash },
      include: { donor: true }
    });
    const token = jwt.sign(register, process.env.JWT_SECRET);
    return {
      user: register,
      token: token
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
