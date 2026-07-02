/**
 * Preloads a list of image URLs into the browser cache
 * to prevent flickering during scroll-linked transitions.
 */
export function preloadImages(urls: string[]): Promise<void[]> {
  if (typeof window === "undefined") return Promise.resolve([]);

  const promises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => resolve(); // resolve anyway so we don't stall the app
    });
  });

  return Promise.all(promises);
}
export default preloadImages;
