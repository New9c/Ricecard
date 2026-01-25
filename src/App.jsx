import React, { useState } from 'react';
import RiceCard from './RiceCard';

function Pos({ element, setter }) {
    return (
        <div className='flex flex-row text-center items-center'>
            <label className="text-xs font-bold text-gray-500 uppercase block">
                X:
            </label>
            <input
                type="number"
                min="0"
                max="500"
                value={element.x}
                onChange={(e) => setter({ ...element, x: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
            <label className="ml-2 text-xs font-bold text-gray-500 uppercase block">
                Y:
            </label>
            <input
                type="number"
                min="0"
                max="250"
                value={element.y}
                onChange={(e) => setter({ ...element, y: parseInt(e.target.value) })}
                className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
            />
        </div>
    )
}
function Sep() {
    return <hr className="border-t border-[#24283b] my-6" />
}
function App() {
    const [fields, setFields] = useState([
        { id: 1, label: 'OS', value: 'Arch Linux', src: 'https://archlinux.org' },
        { id: 2, label: 'WM', value: 'Niri', src: 'https://github.com/YaLTeR/niri' },
        { id: 3, label: 'Shell', value: 'fish', src: 'https://fishshell.com' },
        { id: 4, label: 'App Launcher', value: 'Vicinae', src: 'https://www.vicinae.com' },
    ]);
    const themes = [
        {
            name: "Tokyo Night",
            bg: "#1a1b26",
            accent: "#7aa2f7",
            text: "#a9b1d6",
            border: "#24283b",
            font: "Fira Code"
        },
        {
            name: "Catppuccin",
            bg: "#1e1e2e",
            accent: "#cba6f7",
            text: "#cdd6f4",
            border: "#313244",
            font: "Fira Code"
        },
        {
            name: "Everforest",
            bg: "#2b3339",
            accent: "#a7c080",
            text: "#d3c6aa",
            border: "#3a4248",
            font: "Fira Code"
        }
    ];
    const ThemeButton = ({ theme, isActive, onClick }) => {
        return (
            <button
                onClick={onClick}
                style={{
                    "--text-color": theme.text,
                    "--accent-color": theme.accent,
                    backgroundColor: theme.bg,
                    borderColor: isActive ? '#3b82f6' : theme.border // Blue-500 if active
                }}
                className={`w-full group flex flex-col gap-2 p-3 rounded-xl border-2 transition-all active:scale-95 
    			${isActive ? "bg-[#24283b]" : "bg-transparent hover:bg-[#1f2335]"}`}
            >
                <span
                    style={{ color: 'var(--text-color)' }}
                    className="text-[10px] font-bold uppercase tracking-widest transition-colors group-hover:!text-[var(--accent-color)]"
                >
                    {theme.name}
                </span>
            </button>
        );
    };
    const [dotfiles, setDotfiles] = useState({
        title: "github.com/New9c/workflow", src: "https://github.com/New9c/workflow",
        x: 20, y: 200
    });
    const [theme, setTheme] = useState({
        name: "Tokyo Night", bg: "#1a1b26",
        accent: "#7aa2f7", text: "#a9b1d6",
        font: "Fira Code"
    });
    const [image, setImage] = useState({ url: null, width: 240, height: 135, x: 20, y: 20 });
    const [hint, setHint] = useState({ show: true, x: 20, y: 240 });
    const [credit, setCredit] = useState({ show: true, x: 320, y: 240 });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ ...image, url: reader.result }); // This is the Base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const exportSVG = () => {
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
    const exportPNG = async () => {
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

    const updateField = (id, key, newValue) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: newValue } : f));
    };

    const addField = () => {
        setFields([...fields, { id: Date.now(), label: 'Rice', value: 'Card' }]);
    };

    const removeField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };
    return (
        <div className="flex bg-[#0f0f14] text-gray-200">
            <aside id="sidebar" className="p-10 space-y-4 w-100 h-screen sticky top-0 bg-[#16161e] border-r border-[#24283b] overflow-y-auto overflow-x-hidden">
                <h2 id="ricecard-title" className="text-xl font-bold mb-6 text-white">Ricecard</h2>
                <section className="space-y-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                        Themes
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        {themes.map((t) => (
                            <ThemeButton
                                key={t.name}
                                theme={t}
                                isActive={theme.name === t.name}
                                onClick={() => setTheme({
                                    ...theme,
                                    name: t.name,
                                    accent: t.accent, // Automatically updates the SVG color
                                    bg: t.bg,
                                    text: t.text
                                })}
                            />
                        ))}
                    </div>
                </section>
                <Sep />
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                        Your Rice
                    </label>
                    <div className={`relative border-2 border-[#414868] rounded-lg p-4 hover:border-blue-500 transition-colors text-center ${image.url ?? "border-dashed"}  mb-4`}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <p className="text-sm text-gray-400">
                            {image.url ? "Change Image" : "Upload PNG/JPG"}
                        </p>
                    </div>
                    <div className='flex flex-row text-center items-center mb-2'>
                        <label className="text-xs font-bold text-gray-500 uppercase block">
                            Width:
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="500"
                            value={image.width}
                            onChange={(e) => setImage({ ...image, width: parseInt(e.target.value) })}
                            className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
                        />
                        <label className="ml-2 text-xs font-bold text-gray-500 uppercase block">
                            Height:
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="250"
                            value={image.height}
                            onChange={(e) => setImage({ ...image, height: parseInt(e.target.value) })}
                            className="text-center ml-2 w-full h-8 bg-[#1a1b26] rounded-lg appearance-none cursor-text accent-blue-500"
                        />
                    </div>
                    <Pos element={image} setter={setImage} />
                </div>
                <Sep />
                <div className="space-y-4">
                    {fields.map((field) => (
                        <div key={field.id} className="flex gap-2 items-end">
                            <div className="flex-1">
                                <input
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                    className="w-full bg-[#1a1b26] border border-[#414868] rounded p-1 text-xs text-gray-400"
                                />
                                <input
                                    value={field.value}
                                    onChange={(e) => updateField(field.id, 'value', e.target.value)}
                                    className="w-full bg-[#1a1b26] border border-[#414868] rounded p-2 mt-1 text-white"
                                />
                                <input
                                    value={field.src}
                                    onChange={(e) => updateField(field.id, 'src', e.target.value)}
                                    className="w-full bg-[#1a1b26] border border-[#414868] rounded p-2 mt-1 text-white"
                                />
                            </div>
                            <button
                                onClick={() => removeField(field.id)}
                                className="text-red-500 hover:bg-red-500/10 p-2 rounded"
                            >
                                ×
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addField}
                        className="w-full py-2 border border-dashed border-[#414868] text-white"
                    >
                        + Add Row
                    </button>
                </div>
                <Sep />
                <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                        Dotfiles
                    </label>
                    <input
                        name="title"
                        value={dotfiles.title}
                        onChange={(e) => setDotfiles({ ...dotfiles, title: e.target.value })}
                        placeholder="Title (Optional)"
                        className="w-full bg-[#1a1b26] border border-[#414868] rounded p-1 text-xs text-gray-400"
                    />
                    <input
                        name="src"
                        value={dotfiles.src}
                        onChange={(e) => setDotfiles({ ...dotfiles, src: e.target.value })}
                        placeholder="URL (Optional)"
                        className="w-full bg-[#1a1b26] border border-[#414868] rounded p-1 text-xs text-gray-400"
                    />
                </div>
                <Pos element={dotfiles} setter={setDotfiles} />
                <Sep />
                <div className="flex items-center gap-3 mb-6">
                    <input
                        id="show-hint"
                        type="checkbox"
                        checked={hint.show}
                        onChange={(e) => setHint({ ...hint, show: e.target.checked })}
                        className="w-4 h-4 rounded bg-[#1a1b26] border-[#414868] accent-blue-500 cursor-pointer"
                    />
                    <label htmlFor="show-hint" className="text-xs font-bold text-gray-500 uppercase cursor-pointer select-none">
                        Hint that hovers are links
                    </label>
                </div>
                <Pos element={hint} setter={setHint} />
                <Sep />
                <div className="flex items-center gap-3 mb-6">
                    <input
                        id="credit"
                        type="checkbox"
                        checked={credit.show}
                        onChange={(e) => setCredit({ ...credit, show: e.target.checked })}
                        // "accent-blue-500" styles the checkbox color easily
                        className="w-4 h-4 rounded bg-[#1a1b26] border-[#414868] accent-blue-500 cursor-pointer"
                    />
                    <label htmlFor="credit" className="text-xs font-bold text-gray-500 uppercase cursor-pointer select-none ">
                        pls don't uncheck me :c (MENTION RICECARD)
                    </label>
                </div>
                <Pos element={credit} setter={setCredit} />
                <Sep />
                <div className="pt-6 mt-6">
                    <button
                        onClick={exportSVG}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export SVG
                    </button>
                </div>
                <div className="pt-6 mt-6">
                    <button
                        onClick={exportPNG}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export PNG (bit funky rn)
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 h-screen flex items-center justify-center">
                <div className="w-full h-full max-w-6xl flex items-center justify-center">
                    <RiceCard hint={hint} dotfiles={dotfiles} fields={fields} theme={theme} image={image} credit={credit} />
                </div>
            </main>
        </div>
    );
}

export default App;
