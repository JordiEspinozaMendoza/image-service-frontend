async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/image/", {
    next: {
      revalidate: 1,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export default async function Images() {
  const data = await getData();

  const { images } = data;

  return (
    <div className="flex flex-col items-center p-24">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="border-b bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Filename</th>
            <th className="px-4 py-2">Socket id</th>
            <th className="px-4 py-2">URL</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image.id}>
              <td className="border px-4 py-2">{image.id}</td>
              <td className="border px-4 py-2">{image.filename}</td>
              <td className="border px-4 py-2">{image.socketId}</td>
              <td className="border px-4 py-2 text-blue-500">
                <a href={image.url} target="_blank">
                  {image.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
