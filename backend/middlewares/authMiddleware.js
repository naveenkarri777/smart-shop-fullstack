import jwt from 'jsonwebtoken'

 const adminAuth = async (req, res, next) => {
  try {
    // 1️⃣ Extract token from request headers
    const { token } = req.headers
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    // 2️⃣ Verify token with secret
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

    // 3️⃣ Check if decoded token matches admin credentials
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not Authorized Login Again" })
    }

    // 4️⃣ If all checks pass, allow request to continue
    next()
  } catch (error) {
    console.log("error in auth middleware");
    res.json({ success: false, message: error.message })
  }
}


export default adminAuth