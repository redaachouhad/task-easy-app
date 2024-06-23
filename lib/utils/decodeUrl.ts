export function decodeUrl(url: string) {
  let textSplited = decodeURIComponent(url).split("/");
  return textSplited[2];
}
