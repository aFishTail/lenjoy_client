export const getFullStaticSrc = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return process.env.NODE_ENV === 'development' ? `http://localhost:3000${path}` :`http://81.69.252.155${path}`
//   return `${window.location.origin}${path}`;
};
