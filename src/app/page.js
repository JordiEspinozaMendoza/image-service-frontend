"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);

  const handleClickUploadImage = (e) => {
    e.preventDefault();

    document.getElementById("image").click();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Image app</h1>
      <span className="text-1xl mt-4">
        Please upload an image to see it in action
      </span>

      {image && (
        <div className="flex flex-col">
          <Image
            src={image}
            alt="image"
            width={600}
            height={600}
            quality={100}
            className="mt-8"
          />
          <button
            className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4"
            onClick={() => setImage(null)}
          >
            Remove
          </button>
        </div>
      )}

      <form className="flex flex-col items-center mt-8">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          className="mt-4 hidden"
        />
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={handleClickUploadImage}
        >
          Upload
        </button>
      </form>
    </main>
  );
}
