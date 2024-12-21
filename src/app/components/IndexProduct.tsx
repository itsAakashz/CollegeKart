"use client";
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { auth, storage, firestore } from "../auth/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const IndexProduct = () => {
  const [userUID, setUserUID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Get the logged-in user's UID
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
      } else {
        setErrorMessage("No user is logged in");
      }
    });
    return () => unsubscribe();
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
    setSuccessMessage("");
    setErrorMessage("");

    const imageUrlsArray: string[] = [];

    if (images.length > 0) {
      for (const image of images) {
        const filePath = `products/${userUID}/${image.name}`;
        const imageRef = ref(storage, filePath);

        try {
          // Upload image to Firebase storage
          await uploadBytes(imageRef, image);
          const publicURL = await getDownloadURL(imageRef);
          imageUrlsArray.push(publicURL);
        } catch (error) {
          setErrorMessage("Image upload failed: " + (error as any).message);
          setLoading(false);
          return;
        }
      }
    }

    await saveProductData(imageUrlsArray);
  };

  const saveProductData = async (imageUrls: string[]) => {
    try {
      // Insert product data into Firestore
      await addDoc(collection(firestore, "products"), {
        uid: userUID,
        product_name: productName,
        price,
        title,
        genre,
        image_urls: imageUrls,
        created_at: new Date(),
      });

      setLoading(false);
      setSuccessMessage("Product added successfully!");
      setProductName("");
      setPrice("");
      setTitle("");
      setGenre("");
      setImages([]);
    } catch (error) {
      setErrorMessage("Error saving product data: " + (error as any).message);
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
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold">
            {errorMessage}
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
