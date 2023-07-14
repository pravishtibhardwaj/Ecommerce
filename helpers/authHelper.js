import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);
    return hashedPass;
  } catch (error) {
    console.log(`error ${error} occured`);
  }
};

export const comparePassword = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};
//With "salt round" they actually mean the cost factor. The cost factor controls how much time is
// needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done.
// Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
