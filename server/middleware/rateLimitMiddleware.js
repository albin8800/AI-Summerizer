

const userRequest = new Map();

const RATE_LIMIT = 10;
const WINDOW_TIME = 300 * 1000; 

const rateLimit = (req, res, next) => {
    try {
        const userId = req.user.id;
        const currentTime = Date.now();

         if (!userRequest.has(userId)) {
      userRequest.set(userId, {
        count: 1,
        lastReset: currentTime
      });
      return next();
    }

    const userData = userRequest.get(userId);

    if (currentTime - userData.lastReset > WINDOW_TIME) {
        userRequest.set(userId, {
        count: 1,
        lastReset: currentTime});

        return next();

    }

     if (userData.count >= RATE_LIMIT) {
      return res.status(429).json({
        message: "Rate limit exceeded. Try again after 5 minute."
      });
    }

    userData.count++;
    userRequest.set(userId, userData);

    next();



        
    } catch (error) {
    console.error("Rate Limit Error:", error);
    res.status(500).json({ message: "Server Error" });
    }
}

export default rateLimit;