import { inBrowser } from '../env';

/** 下载某个 URL 对应的文件 */
export function downloadUrl(url: string, fileName: string = '临时五年级') {
  if (!inBrowser) {
    return;
  }

  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  a.textContent = 'Download screenshot';

  document.body.appendChild(a);
  a.click();
}

/** 将某个 Blob 变为文件对象 */
export function blobToFile(theBlob: Blob, fileName: string = 'fileName'): File {
  var b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return <File>theBlob;
}

/** 将某个文件对象转化为 ArrayBuffer */
export function readFileAsArrayBufferAsync(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      const data = fr.result as ArrayBuffer;
      resolve(data);
    };
    fr.onerror = e => {
      reject(e);
    };

    fr.readAsArrayBuffer(file);
  });
}
