"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ImageBaseUrl } from "../Api";
import { AiOutlineHeart } from "react-icons/ai";
import { FiZoomIn } from "react-icons/fi";
import { TbAugmentedReality } from "react-icons/tb";

interface Product {
  _id: number | string;
  product_name: string;
  product_price: number | string;
  product_image_1: string;
  product_image_2: string;
  product_image_3: string;
  product_image_4: string;
}

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("#E5CFC6");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [imageSize, setImageSize] = useState("medium");
  const [imageShape, setImageShape] = useState("square");
  const [selectedMaterial, setSelectedMaterial] = useState("Acrylic");
  const imageRef = useRef<HTMLImageElement>(null);

  const frameColors = ["#E5CFC6", "#E5E5E5", "#000000", "#FFFFFF", "#F3D7CA", "#FAF1E4"];
  const materials = ["Acrylic", "Mirror", "Wood", "Metal", "Canvas"];

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(productParam));
        setProduct(parsedProduct);
        setSelectedImage(parsedProduct.product_image_1);
      } catch (err) {
        console.error("Invalid product data:", err);
      }
    }
  }, [searchParams]);

  const handleZoomClick = () => {
    if (imageRef.current) {
      if (imageRef.current.requestFullscreen) imageRef.current.requestFullscreen();
      else if ((imageRef.current as any).webkitRequestFullscreen)
        (imageRef.current as any).webkitRequestFullscreen();
      else if ((imageRef.current as any).mozRequestFullScreen)
        (imageRef.current as any).mozRequestFullScreen();
      else if ((imageRef.current as any).msRequestFullscreen)
        (imageRef.current as any).msRequestFullscreen();
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  const productImages = [
    product.product_image_1,
    product.product_image_2,
    product.product_image_3,
    product.product_image_4,
  ].filter(Boolean);

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-3/4 flex flex-col sm:flex-row gap-4 bg-[#E1E2E6] p-4 sm:p-6 rounded-md relative">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible">
            {productImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img!)}
                className={`w-16 h-16 border-3 rounded-xl overflow-hidden cursor-pointer p-1 ${
                  selectedImage === img ? "border-3 border-blue-600" : ""
                }`}
              >
                <img
                  src={`${ImageBaseUrl}${img}`}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 flex xl:items-center justify-center">
            <img
              ref={imageRef}
              src={`${ImageBaseUrl}${selectedImage}`}
              alt={product.product_name}
              className={`object-cover rounded-md ${
                imageSize === "small"
                  ? "max-w-[200px] max-h-[300px]"
                  : imageSize === "medium"
                  ? "max-w-[400px] max-h-[600px]"
                  : imageSize === "large"
                  ? "max-w-[600px] max-h-[900px]"
                  : "max-w-[800px] max-h-[1200px]"
              } ${
                imageShape === "square"
                  ? "aspect-square"
                  : imageShape === "rectangle"
                  ? "aspect-[4/3]"
                  : imageShape === "panorama"
                  ? "aspect-[16/9]"
                  : ""
              }`}
            />

            {/* Floating Buttons Desktop */}
            <div className="hidden md:flex absolute top-4 right-4 flex-col gap-3 z-10">
              <button className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center">
                <AiOutlineHeart className="text-xl" />
              </button>
              <button
                onClick={handleZoomClick}
                className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center"
              >
                <FiZoomIn className="text-xl" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center">
                <TbAugmentedReality className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{product.product_name}</h1>

          <div className="text-2xl font-bold text-gray-800 mb-5">£{product.product_price}</div>

          {/* Material Selection */}
          <div className="mb-5">
            <p className="font-medium mb-2">Material:</p>
            <div className="flex gap-2 flex-wrap">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-4 py-1 rounded border ${
                    selectedMaterial === mat
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-5">
            <p className="font-medium mb-2">Size:</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Small 200 × 300mm", value: "small" },
                { label: "Medium 400 × 600mm", value: "medium" },
                { label: "Large 600 × 900mm", value: "large" },
                { label: "XLarge 800 × 1200mm", value: "xlarge" },
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => setImageSize(size.value)}
                  className={`px-4 py-1 rounded border ${
                    imageSize === size.value
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div className="mb-5">
            <p className="font-medium mb-2">Image Shape:</p>
            <div className="flex gap-4 flex-wrap">
              {["square", "rectangle", "panorama"].map((shape) => (
                <label key={shape} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="shape"
                    value={shape}
                    checked={imageShape === shape}
                    onChange={() => setImageShape(shape)}
                  />
                  {shape.charAt(0).toUpperCase() + shape.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Frame Colors */}
          <div className="mb-5">
            <p className="font-medium mb-2">Frame Border:</p>
            <div className="flex flex-wrap gap-2">
              {frameColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-xl border-r"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-12 text-center outline-none"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-xl border-l"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <button className="w-full bg-black text-white py-3 rounded-md mb-3 hover:bg-gray-800 transition">
            Add to Cart
          </button>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
            Buy with ShopPay
          </button>

          {/* Payment Options */}
          <div className="mt-6 text-sm text-gray-600 flex gap-4 flex-wrap">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Amex</span>
            <span>GPay</span>
            <span>ApplePay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
