/** 解析 Cookie 字符串 */
export function parseCookieStr(cookieStr: string) {
  cookieStr.split(';').reduce((cookieObject: Record<string, any>, cookieString) => {
    const splitCookie = cookieString.split('=').map(cookiePart => cookiePart.trim());
    try {
      cookieObject[splitCookie[0]] = JSON.parse(splitCookie[1]);
    } catch (error) {
      cookieObject[splitCookie[0]] = splitCookie[1];
    }
    return cookieObject;
  }, {});
}
