const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const cloudinary = require("cloudinary").v2;

initializeApp();

const CLOUDINARY_API_SECRET = defineSecret("CLOUDINARY_API_SECRET");
const CLOUDINARY_API_KEY = defineSecret("CLOUDINARY_API_KEY");
const CLOUDINARY_CLOUD_NAME = "iwza5did";
const ALLOWED_ORIGIN = "https://blackhunterbd756-del.github.io";

exports.createMediaUploadSignature = onRequest(
  { region: "us-central1", secrets: [CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY], cors: [ALLOWED_ORIGIN] },
  async (req, res) => {
    res.set("Cache-Control", "no-store");
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    try {
      const header = req.get("Authorization") || "";
      const match = header.match(/^Bearer (.+)$/);
      if (!match) return res.status(401).json({ error: "Authentication required" });

      const decoded = await getAuth().verifyIdToken(match[1], true);
      const db = getFirestore();
      const member = await db.collection("members").doc(decoded.uid).get();
      if (!member.exists || member.data().status !== "approved") {
        return res.status(403).json({ error: "Approved membership required" });
      }

      const body = req.body || {};
      if (body.resourceType !== "image" && body.resourceType !== "video") {
        return res.status(400).json({ error: "Invalid media type" });
      }
      const resourceType = body.resourceType;
      const timestamp = Math.floor(Date.now() / 1000);
      const folder = "7starboys";
      const publicId = `${decoded.uid}_${require("crypto").randomUUID()}`;
      const paramsToSign = { folder, public_id: publicId, timestamp };

      cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY.value(),
        api_secret: CLOUDINARY_API_SECRET.value()
      });
      const signature = cloudinary.utils.api_sign_request(paramsToSign, CLOUDINARY_API_SECRET.value());

      return res.status(200).json({
        cloudName: CLOUDINARY_CLOUD_NAME,
        apiKey: CLOUDINARY_API_KEY.value(),
        signature,
        timestamp,
        folder,
        public_id: publicId,
        resourceType
      });
    } catch (error) {
      console.error("Media signing failed:", error.message);
      return res.status(401).json({ error: "Unable to authorize upload" });
    }
  }
);
