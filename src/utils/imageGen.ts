import axios from "axios";

export default async function imageGen(
  query: string,
  apiType: string = "default"
) {
  let apiUrl =
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
  const keys = {
    default: import.meta.env.VITE_HUGGINGFACE_ASSIGNMENT_KEY,
    "comic-diffusion": import.meta.env.VITE_HUGGINGFACE_KEY,
  };
  let apiToken = keys.default;

  if (apiType !== "default") {
    if (apiType === "comic-diffusion") {
      apiUrl =
        "https://api-inference.huggingface.co/models/ogkalu/Comic-Diffusion";
      apiToken = keys["comic-diffusion"];
    }
  }

  const data = {
    inputs: query,
  };

  console.log(apiUrl, data)
  const response = await fetch(
    apiUrl,
    {
      headers: {
        Accept: "image/png",
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const blob = await response.blob();
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        onSuccess(this.result);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      onError(e);
    }
  });
}
