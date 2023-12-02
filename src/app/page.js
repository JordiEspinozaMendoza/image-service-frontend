/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
const socket = io.connect(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function Home() {
  const [image, setImage] = useState(null);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    error: false,
    data: null,
  });
  const [results, setResults] = useState(null);

  const handleClickUploadImage = (e) => {
    e.preventDefault();

    document.getElementById("image").click();
  };

  const handleSubmitImage = async (e) => {
    try {
      e.preventDefault();

      setUploadStatus({
        loading: true,
        error: false,
        data: null,
        success: false,
      });
      setResults(null);

      const formData = new FormData();

      formData.append("file", image.file);
      formData.append("socketId", socket.id);

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/image/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setUploadStatus({ loading: false, error: false, data, success: true });
    } catch (error) {
      toast.error("Failed to upload image to the server");

      setUploadStatus({
        loading: false,
        error: true,
        data: null,
        success: false,
      });
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketStatus("connected");
    });

    socket.on("disconnect", () => {
      setSocketStatus("disconnected");
    });

    socket.on("image_uploaded", (data) => {
      toast.success("Server says: " + data.message);

      setResults(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("image_uploaded");
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Image app | Car plate detector</h1>
      <span className="text-1xl mt-4">Socket status: {socketStatus}</span>
      <span className="text-1xl mt-4">
        Please upload an image to see it in action
      </span>

      {image && (
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Image
              src={image.url}
              alt="image"
              width={600}
              height={600}
              quality={100}
              className="mt-8"
            />
            <button
              className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4"
              onClick={() => {
                setResults(null);
                setUploadStatus({
                  loading: false,
                  error: false,
                  data: null,
                  success: false,
                });
                setImage(null);
              }}
            >
              Remove
            </button>
          </div>

          {results && (
            <img
              src={results.url}
              alt="image"
              width={600}
              height={600}
              className="mt-8"
            />
          )}
        </div>
      )}

      <form
        className="flex flex-col items-center mt-8"
        onSubmit={handleSubmitImage}
      >
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            setResults(null);
            setUploadStatus({
              loading: false,
              error: false,
              data: null,
              success: false,
            });
            setImage({
              url: URL.createObjectURL(e.target.files[0]),
              file: e.target.files[0],
            });
          }}
          className="mt-4 hidden"
        />

        {uploadStatus.success && !results && (
          <span className="text-green-500 mb-4">
            Image uploaded to the server, waiting for the response...
          </span>
        )}

        <div className="flex flex-row items-center gap-3">
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={handleClickUploadImage}
          >
            {image ? "Change image" : "Upload image"}
          </button>

          {image && (
            <input
              type="submit"
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 cursor-pointer"
              value={uploadStatus.loading ? "Uploading..." : "Upload"}
            />
          )}
        </div>
      </form>
    </main>
  );
}
