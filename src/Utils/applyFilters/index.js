export default async function applyFilters(canvases) {
    const newImages = [];

    if (canvases.length === 0) {
        return [];
    }

    canvases.forEach((canv) => {
        const convertedImageURI = canv.toDataURL();
        const imgEl = document.createElement('img');
        imgEl.src = convertedImageURI;

        const newImg = new Promise((resolve) => {
            imgEl.onload = () => {
                const newCanvas = document.createElement('canvas');
                newCanvas.width = imgEl.width;
                newCanvas.height = imgEl.height;

                const ctx = newCanvas.getContext('2d');
                // ctx.filter = "contrast(25)";

                /* ctx.filter = "blur(2px)";
                    * preview the filters in OVERLAY and NOT GENERATEDCONTAINER
                    * do not use another canvas
                    * most values are in %
                    * refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
                    * this is a default html slider - <input type="range" min="1" max="100" />
                    * styling has to be done manually
                    */
                ctx.drawImage(imgEl, 0, 0);

                const newImage = newCanvas.toDataURL();
                resolve(newImage);
            };
        });

        newImages.push(newImg);
    });
    const resolvedImages = await Promise.all(newImages);
    return resolvedImages;
}