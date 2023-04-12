export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export async function getCroppedImg(
  imageSrc,
  pixelCrop,
  backgroundColor,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // set canvas size to match the image
  canvas.width = image.width;
  canvas.height = image.height;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(0, 0, image.width, image.height);
  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // create background rectangle over all pixelCrop range
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, pixelCrop.width, pixelCrop.height);
  // paste generated rotate image at the top left corner
  console.log(pixelCrop.x, pixelCrop.y);
  ctx.putImageData(
    data,
    -pixelCrop.x,
    -pixelCrop.y,
    0,
    0,
    image.width,
    image.height
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}

export async function createPortraitCanvas(imageSrc, name) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 330;
  canvas.height = 430;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  addName(canvas, name);
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}

function addName(portraitCanvas, name) {
  const ctx = portraitCanvas.getContext('2d');
  ctx.font = 'Comic Sans';
  ctx.textAlign = 'center';
  ctx.font = 'bold 32px serif';
  ctx.fillStyle = 'white';
  ctx.fillText(name, portraitCanvas.width / 2, portraitCanvas.height * 0.9);
  ctx.strokeText(name, portraitCanvas.width / 2, portraitCanvas.height * 0.9);
  return portraitCanvas;
}
