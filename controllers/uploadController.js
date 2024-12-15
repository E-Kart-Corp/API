const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { bucket, db, firebaseAdmin } = require("../config/firebaseConfig");

const createProduct = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const imageUrls = [];

    const filePromises = req.files.map(async (file) => {
      const filename = `${Date.now()}-${uuidv4()}${path.extname(
        file.originalname
      )}`;
      const fileUpload = bucket.file(`products/${filename}`);
      await new Promise((resolve, reject) => {
        const blobStream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobStream.on("error", (err) => {
          reject(new Error("Error uploading file to Firebase Storage."));
        });

        blobStream.on("finish", resolve);
        blobStream.end(file.buffer);
      });

      const [url] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });

      imageUrls.push(url);
    });

    await Promise.all(filePromises);

    const productData = {
      title,
      category,
      imageUrl: imageUrls,
    };

    const productRef = db.collection("products").doc('wait_list');
    const doc = await productRef.get();

    if (doc.exists) {
      await productRef.update({
        productList: firebaseAdmin.firestore.FieldValue.arrayUnion(productData),
      });
    } else {
      await productRef.set({
        productList: [productData],
      });
    }

    res.status(201).json({
      message: "Images uploaded successfully and product added to Firestore!",
      imageUrls: imageUrls,
      title: title,
      category: category,
    });
  } catch (error) {
    console.error("Error handling the request:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server error." });
    }
  }
};

const checkProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filename = `${Date.now()}-${uuidv4()}${path.extname(req.file.originalname)}`;
    const file = bucket.file(`check/${filename}`);
    const blobStream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (err) => {
      console.error("Error uploading file to Firebase Storage:", err);
      res.status(500).json({ message: "Failed to upload image." });
    });

    blobStream.on("finish", async () => {
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });

      const productData = {
        image_url: url,
        id_user: req.body.id_user, 
      };

      const productRef = db.collection("check").doc("wait_list");
      const doc = await productRef.get();

      if (doc.exists) {
        await productRef.update({
          product_to_check: firebaseAdmin.firestore.FieldValue.arrayUnion(productData),
        });
      } else {
        await productRef.set({
          product_to_check: [productData],
        });
      }

      res.status(201).json({
        message: "Image uploadée avec succès et produit ajouté dans Firestore !",
        imageUrl: url,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getProducts = async (req, res) => {
  try {
    const productRef = db
      .collection("products_extracted")
      .doc(req.params.category);
    const doc = await productRef.get();

    if (doc.exists) {
      const productList = doc.data().product_extracted || [];
      res.status(200).json({ products: productList });
    } else {
      res.status(404).json({ message: "No products found." });
    }
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const getCategory = async (req, res) => {
  try {
    const productsRef = db.collection("products_extracted");
    const snapshot = await productsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No products found." });
    }

    const category = snapshot.docs.map((doc) => doc.id);

    res.status(200).json({ category });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({ message: "Server error." });
  }
};

const checkAuthenticated = async (req, res) => {
  try {
    if (req.body.code === "1234") res.status(200).json({ success: true });
    else res.status(200).json({ success: false });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { checkAuthenticated, createProduct, checkProduct, getProducts, getCategory };
