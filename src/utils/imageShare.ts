import axios from "axios";

export default async function imageShare(image) {
  const data = new FormData();
  data.append("image", image);
  const response = await axios.post(
    `https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_IMGBB_KEY}`,
    data
  );

  return response;
}
