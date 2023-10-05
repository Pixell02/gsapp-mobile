import { getDownloadURL, getStorage, ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';
import { useState } from 'react';

const useStorage = () => {
  const [url, setUrl] = useState<string>("");

  const storage = getStorage();
  const metadata = {
    contentType: "image/png",
  };

  const handleAddImage = (image: Blob, link: string): Promise<string> => {
    const path = ref(storage, link);
    const uploadTask = uploadBytesResumable(path, image, metadata);

    return new Promise<string>(async (resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
              break;
          }
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrl(downloadURL); // Ustaw URL w stanie, jeśli jest to potrzebne
            resolve(downloadURL);
          } catch (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  };

  return { handleAddImage, url };
};

export default useStorage;
