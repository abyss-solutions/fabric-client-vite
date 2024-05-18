export const detectOs = () => {
  const os = ["Win", "Mac", "Linux"];
  return os.find((v) => global.window?.navigator.platform.indexOf(v) >= 0);
};

export const getScale = () => {
  switch (detectOs()) {
    case "Win":
      return 1;
      break;
    case "Mac":
      return 1;
      break;
    default:
      return 1;
  }
};
