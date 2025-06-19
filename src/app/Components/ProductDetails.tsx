// pages/product/[slug].tsx
"use client";
import { useState } from "react";
import Image from "next/image";

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState("pink");
  const [quantity, setQuantity] = useState(1);

  const colors = ["#E5CFC6", "#E5E5E5", "#000000", "#FFFFFF", "#F3D7CA", "#FAF1E4"];

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-12 py-8">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Image + Thumbnails */}
        <div>
          <div className="border rounded-lg overflow-hidden">
            <Image
              src="/fried-eggs.jpg"
              alt="Fried Egg Wall Art"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 border rounded overflow-hidden shrink-0"
              >
                <Image
                  src="/fried-eggs.jpg"
                  alt="Thumbnail"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Fried Eggs Acrylic Wall Art | Vibrant Kitchen Décor
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <span className="text-xl font-semibold text-gray-800">£39.00 GBP</span>
            <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md text-center w-fit">
              Priority Protection - Ends in 03H:00M
            </div>
          </div>

          {/* Material & Size */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md">
                <option>Acrylic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <select className="w-full border border-gray-300 px-3 py-2 rounded-md">
                <option>36"x12"</option>
              </select>
            </div>
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Frame Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2 mb-6">
            <label className="text-sm font-medium">Quantity:</label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg border-r"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-12 text-center text-sm border-0 outline-none"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg border-l"
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

          {/* Payment Icons */}
          <div className="mt-6 text-sm text-gray-500 flex flex-wrap gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>

      {/* Description Tabs */}
      <div className="mt-12 border-t pt-6">
        <div className="flex gap-6 text-sm font-medium text-gray-700 mb-4 flex-wrap">
          <button>Description</button>
          <button>Care Instructions</button>
          <button>Shipping & Returns</button>
        </div>
        <p className="text-sm text-gray-600 max-w-3xl">
          Just a copy of text for preview or can include the real product description here. You can also use HTML or markdown rendering here if dynamic.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
