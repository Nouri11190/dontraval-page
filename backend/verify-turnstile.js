import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post("/api/verify", async (req, res) => {
  const { token } = req.body;
  try {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const response = await axios.post(verifyUrl, new URLSearchParams({
      secret,
      response: token,
    }));

    res.json({ success: response.data.success });
  } catch (error) {
    console.error("Error verifying Turnstile:", error);
    res.status(500).json({ success: false });
  }
});

app.listen(8080, () => console.log("✅ Turnstile API running on http://localhost:8080"));
