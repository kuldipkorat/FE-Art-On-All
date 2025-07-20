"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ImageBaseUrl } from "../Api";

// import CanvasImageComposer from "../HomeComponents/CanvasImageComposer";
import OfficeImage from "../../../public/Home/office_view.avif";
import LivingRoomImage from "../../../public/Home/living_room.avif";
import StudyRoomImage from "../../../public/Home/study_room.avif";
// import ThreeImageViewer from "../HomeComponents/ThreeImageViewer";

import { AiOutlineHeart } from "react-icons/ai";
import { FiZoomIn, FiPlus } from "react-icons/fi";
import { TbAugmentedReality } from "react-icons/tb";
import { FiMinus } from "react-icons/fi";

import Shopify from "../../../public/Product/shopify.png";
import Visa from "../../../public/Product/visa.png";
import Rupay from "../../../public/Product/rupay.png";
import PayPal from "../../../public/Product/paypal.png";
import Ipay from "../../../public/Product/ipay.png";
import Gpay from "../../../public/Product/gpay.png";

import Links from "../../../public/Product/link.png"
import Meta from "../../../public/Product/meta.png"
import Twitter from "../../../public/Product/twitter.png"
import Pintrest from "../../../public/Product/social.png"
import LinkedIn from "../../../public/Product/linkedin.png"

import dynamic from "next/dynamic";
const ThreeImageViewer = dynamic(() => import("../HomeComponents/ThreeImageViewer"), { ssr: false });
const CanvasImageComposer = dynamic(() => import("../HomeComponents/CanvasImageComposer"), { ssr: false });

interface Product {
  _id: number | string;
  product_name: string;
  product_price: number | string;
  product_image_1: string;
}

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState("#E5CFC6");
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState("Acrylic");
  const [selectedSize, setSelectedSize] = useState("Small 200 x 300mm");
  const [imageShape, setImageShape] = useState("Square");
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  const frameColors = [
    "#E5CFC6",
    "#E5E5E5",
    "#000000",
    "#FFFFFF",
    "#F3D7CA",
    "#FAF1E4",
  ];

  const materials = ["Acrylic", "Wood", "Metal", "Canvas", "Mirror"];

  const imagesize = ["Small 200 x 300mm", "Medium 400 x 600mm", "Large 600 x 900mm", "XLarge 800 x 1200mm"];

  const imageShapes = [
    { label: "Square", value: "Square" },
    { label: "Column", value: "Column" },
    { label: "Landscape", value: "Landscape" },
    { label: "Panoramic", value: "Panoramic" },
    { label: "Portrait", value: "Portrait" },
  ];

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(productParam));
        setProduct(parsedProduct);
      } catch (err) {
        console.error("Invalid product data:", err);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const calculatedHeight = (width * 3) / 4;
        setCanvasSize({ width, height: calculatedHeight });
      }
    });
    observer.observe(canvasContainerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleZoomClick = () => {
    if (imageRef.current) {
      if (imageRef.current.requestFullscreen)
        imageRef.current.requestFullscreen();
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  const backgroundImages = [
    { label: "Living Room", src: LivingRoomImage.src },
    { label: "Office", src: OfficeImage.src },
    { label: "Study Room", src: StudyRoomImage.src },
  ];

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div
          ref={imageRef}
          className="w-full h-full lg:min-w-4xl flex-1 flex xl:justify-center xl:items-start flex-col-reverse xl:flex-row relative bg-[#10111a] rounded-md p-4 gap-6"
        >
          <div className="flex xl:flex-col gap-2 overflow-x-auto sm:overflow-visible">
            <div
              onClick={() => {
                setShowCanvas(false);
                setSelectedBackground("");
              }}
              className={`w-16 h-16 border-2 rounded-xl overflow-hidden cursor-pointer p-1 ${
                !showCanvas ? "border-blue-600" : "border-transparent"
              }`}
            >
              <img
                src={`${ImageBaseUrl}${product.product_image_1}`}
                alt="Product"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {backgroundImages.map((bg, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setShowCanvas(true);
                  setSelectedBackground(bg.src);
                }}
                className={`w-16 h-16 border-2 rounded-xl overflow-hidden cursor-pointer p-1 ${
                  selectedBackground === bg.src
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={bg.src}
                  alt={bg.label}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          <div
            ref={canvasContainerRef}
            className="w-full md:max-w-[800px] flex justify-center items-center"
          >
            {showCanvas ? (
              <CanvasImageComposer
                key={`${selectedBackground}-${product.product_image_1}`}
                backgroundUrl={selectedBackground}
                overlayUrl={`${ImageBaseUrl}${product.product_image_1}`}
                overlayX={canvasSize.width * 0.4}
                overlayY={canvasSize.height * 0.08}
                overlayWidth={canvasSize.width * 0.1825}
                overlayHeight={canvasSize.height * 0.35}
                backgroundWidth={canvasSize.width}
                backgroundHeight={canvasSize.height}
              />
            ) : (
              <div className="w-full h-[200px] md:h-[500px] rounded-md overflow-hidden">
                <ThreeImageViewer
                  imageUrl={`${ImageBaseUrl}${product.product_image_1}`}
                  selectedMaterial={selectedMaterial}
                  imageShape={imageShape}
                  frameColor={selectedColor}
                />
              </div>
            )}
          </div>

          {/* Floating Buttons */}
          <div className="hidden md:flex absolute top-4 right-4 flex-col gap-3 z-10">
            <button className="w-10 h-10 cursor-pointer rounded-full bg-white shadow flex items-center justify-center">
              <AiOutlineHeart className="text-xl" />
            </button>
            <button
              onClick={handleZoomClick}
              className="w-10 h-10 cursor-pointer rounded-full bg-white shadow flex items-center justify-center"
            >
              <FiZoomIn className="text-xl" />
            </button>
            <button className="w-10 h-10 cursor-pointer rounded-full bg-white shadow flex items-center justify-center">
              <TbAugmentedReality className="text-xl" />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            {product.product_name}
          </h1>

          <div className="bg-[#0502F1] text-white p-5 rounded-md mb-5">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Priority Production</h1>
                <button className="mt-2 cursor-pointer bg-white text-black px-6 py-2 rounded-full font-semibold">
                  BUY NOW
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm">Be Smart Skip the Wait</p>
                <h1 className="text-3xl font-bold my-1">03H : 00M</h1>
                <p className="text-sm">Priority Production Ends in...</p>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-800 mb-5">
            £{product.product_price}
          </div>

          <div className="mb-5">
            <h1 className="text-lg font-bold mb-2">Material : <span className="font-medium text-[#828388]" > {selectedMaterial}</span></h1>
            <div className="flex gap-2 flex-wrap">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-4 cursor-pointer py-1 rounded border ${
                    selectedMaterial === mat
                      ? "bg-[#403C3C] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-lg font-bold mb-2">Size : <span className="font-medium text-[#828388]" > {selectedSize}</span></h1>
            <div className="flex gap-2 flex-wrap">
              {imagesize.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 cursor-pointer py-1 rounded border ${
                    selectedSize === size
                      ? "bg-[#403C3C] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-lg font-bold mb-2">Image Shape : <span className="font-medium text-[#828388] " > {imageShape}</span></h1>
            <div className="flex gap-2 flex-wrap">
              {imageShapes.map((shape) => (
                <button
                  key={shape.value}
                  onClick={() => setImageShape(shape.value)}
                  className={`px-4 py-1 rounded cursor-pointer border ${
                    imageShape === shape.value
                      ? "bg-[#403C3C] text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {shape.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-lg font-bold mb-2">Frame Border:</h1>
            <div className="flex flex-wrap gap-2">
              {frameColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-10 h-10 cursor-pointer rounded border-2 ${
                    selectedColor === color ? "border-black" : "border-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-lg font-bold mb-2">Quantity:</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-[#828388] rounded p-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 cursor-pointer py-1 text-md"
                >
                  <FiMinus className="text-[#828388]" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 input-no-spinner text-center outline-none"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 cursor-pointer py-1 text-md"
                >
                  <FiPlus className="text-[#828388]" />
                </button>
              </div>
            </div>
          </div>

          <button className="w-full cursor-pointer border-2 border-[#5C37E7] bg-white text-[#5C37E7] font-bold py-3 rounded-md mb-3 hover:bg-[#5C37E7] hover:text-white transition">
            Add to Cart
          </button>
          <button className="w-full font-semibold cursor-pointer bg-[#5C37E7] text-white py-3 rounded-md hover:bg-indigo-700 transition">
            Buy with Shop
            <span className="bg-white text-[#5C37E7] mx-1 px-1 text-center rounded">
              Pay
            </span>
          </button>

          <div className="mt-6">
            <h1 className="text-lg font-bold mb-2">Payment and security:</h1>
            <img
              src={Shopify.src}
              alt="Shopify"
              className="w-24 object-cover"
            />

            <div className="mt-2 text-sm text-gray-600 flex gap-2">
              <span>
                <img src={Visa.src} alt="Visa" className="w-16 object-cover" />
              </span>
              <span>
                <img
                  src={Rupay.src}
                  alt="Rupay"
                  className="w-16 object-cover"
                />
              </span>
              <span>
                <img
                  src={PayPal.src}
                  alt="PayPal"
                  className="w-16 object-cover"
                />
              </span>
              <span>
                <img src={Ipay.src} alt="Ipay" className="w-16 object-cover" />
              </span>
              <span>
                <img src={Gpay.src} alt="Gpay" className="w-16 object-cover" />
              </span>
            </div>

            <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
              <span>
                <img src={Links.src} alt="Links" className="w-12 object-cover" />
              </span>
              <span>
                <img
                  src={Meta.src}
                  alt="Meta"
                  className="w-10 object-cover"
                />
              </span>
              <span>
                <img
                  src={Twitter.src}
                  alt="Twitter"
                  className="w-10 object-cover"
                />
              </span>
              <span>
                <img src={Pintrest.src} alt="Pintrest" className="w-10 object-cover" />
              </span>
              <span>
                <img src={LinkedIn.src} alt="LinkedIn" className="w-10 object-cover" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
