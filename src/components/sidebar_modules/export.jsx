export const exportSVG = () => {
    // 1. Get the SVG element by an ID we'll set
    const svgElement = document.getElementById("rice-svg");

    // 2. Serialize the SVG to a XML string
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);

    // 3. Add namespaces if they are missing (crucial for some viewers)
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    // 4. Create a Blob and a dummy link to trigger download
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `my-rice.svg`;
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
};
export const exportPNG = async () => {
    const svg = document.querySelector("#rice-svg");
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scale = 4;
    canvas.width = 500 * scale;
    canvas.height = 250 * scale;
    ctx.scale(scale, scale);

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        // 1. Instead of drawing immediately, we wait 1 second
        setTimeout(() => {
            ctx.drawImage(img, 0, 0, 500, 250);

            const pngUrl = canvas.toDataURL("image/png", 1.0);
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "my-rice.png";
            downloadLink.click();

            URL.revokeObjectURL(url);
        }, 1000); // 1000ms = 1 second "Force Wait"
    };

    img.src = url;
};
