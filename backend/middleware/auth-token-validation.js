// Turnstile token validation
const secret = process.env.TURNSTILE_SECRET_KEY;

const authTokenValidation = async (token) => {
    if (!token) {
        return res
            .status(400)
            .json({ success: false, message: "No token provided" });
    }

    const tokenValidated = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${secret}&response=${token}`,
        }
    );

    const data = await tokenValidated.json();

    return data;
};
export default authTokenValidation;
