"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [fetchServerStatus, setFetchServerStatus] = useState({
    loading: false,
    error: false,
    data: null,
  });

  const handleFetchServerStatus = async () => {
    try {
      setFetchServerStatus({ loading: true, error: false, data: null });

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/notify/v1/health"
      );

      const data = await response.json();

      if (data.status !== "UP") {
        throw new Error("Something went wrong");
      }

      setFetchServerStatus({ loading: false, error: false, data });
    } catch (error) {
      setFetchServerStatus({ loading: false, error: true, data: null });
    }
  };

  useEffect(() => {
    handleFetchServerStatus();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Image app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className={inter.className}>
        <ToastContainer />

        {fetchServerStatus.loading ? (
          <div className="flex flex-col items-center p-24">
            <Image
              src="https://media.tenor.com/XgaU95K_XiwAAAAC/kermit-typing.gif"
              alt="kermit typing"
              width={600}
              height={600}
            />
            <span className="text-1xl mt-4">Loading...</span>
          </div>
        ) : fetchServerStatus.error ? (
          <div className="flex flex-col items-center p-24">
            <Image
              src="https://media.tenor.com/wsbmWYxnJYQAAAAd/kermit-falling.gif"
              alt="kermit falling"
              width={600}
              height={600}
            />
            <span className="text-1xl mt-4">
              Something went wrong, please try again
            </span>

            <button
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
              onClick={handleFetchServerStatus}
            >
              Retry
            </button>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
