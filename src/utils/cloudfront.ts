const removeLeadingSlashes = (input: string) =>
  (input ?? "").trim().replace(/^\/+/, "");

export const getCloudfrontUrl = (filepath: string) => {
  const relativePathEncoded = removeLeadingSlashes(filepath);

  try {
    return new URL(relativePathEncoded, process.env.CDN_BASE_URL).href;
  } catch (error) {
    console.error("cloudfront.ts -> getCloudfrontUrl() ->", error);
    console.error(
      "cloudfront.ts -> getCloudfrontUrl() -> filePath ->",
      filepath
    );
    return `${import.meta.env.VITE_APP_CDN_BASE_URL}/${relativePathEncoded}`;
  }
};
