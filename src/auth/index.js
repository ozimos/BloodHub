import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (email, password, prisma) => {
  try {
    const { password: storedPassword, ...user } = await prisma.user({
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

export const register = async ({password, ...data}, prisma) => {
  try {
    const existingUser = await prisma.user({
      where: {
        email: data.email
      }
    });
    if (existingUser) {
      throw new Error("ERROR: email already used.");
    }
    const hash = bcrypt.hashSync(password, 10);

    const { password, ...register } = await prisma.createUser({
      ...data,
      password: hash
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
