import URI from 'URI';

// See http://medialize.github.io/URI.js/docs.html
export const UrlUtils = URI;

/** 从 Url 中获取到最后的文件名 */
export function getFileNameFromUrl(href: string) {
  return URI(href).filename;
}
