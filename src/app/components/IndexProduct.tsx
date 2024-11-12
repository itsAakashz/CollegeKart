"use client";
import { useState, useEffect } from "react";
import { storage, db } from "../auth/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { FaPlusCircle } from "react-icons/fa";

const IndexProduct = () => {
  const [userUID, setUserUID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Get the currently logged-in user's UID
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserUID(user.uid); // Set the UID from the logged-in user
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(""); // Clear previous success message

    const imageUrlsArray: string[] = [];

    if (images.length > 0) {
      // Upload images to Firebase Storage
      for (const image of images) {
        const storageRef = ref(storage, `products/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optionally track upload progress
          },
          (error) => {
            console.error("Image upload failed:", error);
            setLoading(false);
          },
          async () => {
            // Get the download URL after upload completes
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            imageUrlsArray.push(url);

            // If all images are uploaded, proceed to save product data
            if (imageUrlsArray.length === images.length) {
              await saveProductData(imageUrlsArray);
            }
          }
        );
      }
    } else {
      // Save product data without images if no images are uploaded
      await saveProductData(imageUrlsArray);
    }
  };

  const saveProductData = async (imageUrls: string[]) => {
    try {
      // Reference to the user's collection using the UID
      const userProductRef = doc(collection(db, `users/${userUID}/products`));
      await setDoc(userProductRef, {
        uid: userUID, // Include the UID in the product data
        productName,
        price,
        title,
        genre,
        imageUrls,
        createdAt: new Date(), // Optional timestamp
      });

      setLoading(false);
      setSuccessMessage("Product added successfully!");
      setProductName("");
      setPrice("");
      setTitle("");
      setGenre("");
      setImages([]);
    } catch (error) {
      console.error("Error saving product data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            className="w-full mt-2 p-2 border rounded-md"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full mt-2 p-2 border rounded-md"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full mt-2 p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            className="w-full mt-2 p-2 border rounded-md"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Upload Images (Optional)
          </label>
          <input
            type="file"
            id="images"
            className="mt-2"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
          <div className="mt-4">
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <span>{image.name}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeImage(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="flex items-center text-indigo-600"
            onClick={() => setImages([])}
          >
            <FaPlusCircle className="mr-2" />
            Add More Images
          </button>
        </div>
        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold">
            {successMessage}
          </div>
        )}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndexProduct;
