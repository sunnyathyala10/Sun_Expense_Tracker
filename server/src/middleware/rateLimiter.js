import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("expense-limit");

    if (!success) {
      return res.status(429).json({
        message: "Frequent requests detected.",
      });
    }

    next();
  } catch (e) {
    console.error("Error during rate limit check\n" + e);
    next(e);
  }
};

export default rateLimiter;
