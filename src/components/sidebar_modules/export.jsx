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
export const exportPNG = async (svg_width, svg_height) => {
    const svgElement = document.getElementById('rice-svg');
    svgElement.classList.add('exporting');
    svg_width += 30
    svg_height += 30
    const svg = document.querySelector("#rice-svg");
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const scale = 4;
    canvas.width = svg_width * scale;
    canvas.height = svg_height * scale;
    ctx.scale(scale, scale);

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        ctx.drawImage(img, 0, 0, svg_width, svg_height);

        const pngUrl = canvas.toDataURL("image/png", 1.0);
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "my-rice.png";
        downloadLink.click();

        URL.revokeObjectURL(url);
    };

    img.src = url;
    svgElement.classList.remove('exporting');
};
