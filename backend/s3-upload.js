const multer = require("multer");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("./s3");

const router = require("express").Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please select a file." });
    }

    const bucket = process.env.S3_BUCKET_NAME;
    if (!bucket) {
      return res.status(500).json({ error: "S3 bucket is not configured." });
    }

    const key = `${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }));

    const downloadUrl = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: bucket, Key: key }),
      { expiresIn: 300 }
    );

    res.status(201).json({
      message: "File uploaded successfully!",
      fileName: key,
      downloadUrl,
    });
  } catch (error) {
    console.error("S3 upload error:", error.name);
    res.status(500).json({ error: "Upload failed. Check AWS configuration and permissions." });
  }
});

module.exports = router;