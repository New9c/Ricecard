import React, { useState, useEffect } from 'react';
import RiceCard from './components/RiceCard';
import FontPicker from './components/sidebar_modules/FontPicker'
import Pos from './components/sidebar_modules/Pos';
import Sep from './components/sidebar_modules/Sep';
import Size from './components/sidebar_modules/Size';
import WidthHeight from './components/sidebar_modules/WidthHeight';
import Gap from './components/sidebar_modules/Gap';
import BorderRadius from './components/sidebar_modules/BorderRadius';
import ThemeButton from './components/sidebar_modules/ThemeButton';
import { exportSVG, exportPNG } from './components/sidebar_modules/export';

import themes from './data/themes';

function App() {
    const [fields, setFields] = useState({
        values: [
            { id: 1, label: 'OS:', value: 'Arch Linux', src: 'https://archlinux.org' },
            { id: 2, label: 'WM:', value: 'Niri', src: 'https://github.com/YaLTeR/niri' },
            { id: 3, label: 'Shell:', value: 'fish', src: 'https://fishshell.com' },
            { id: 4, label: 'App Launcher:', value: 'Vicinae', src: 'https://www.vicinae.com' },
        ],
        x: 280, y: 70, size: 14, gap: 35
    });
    const [dotfiles, setDotfiles] = useState({
        title: "github.com/New9c/workflow", src: "https://github.com/New9c/workflow",
        x: 50, y: 200, size: 12
    });
    const [theme, setTheme] = useState({
        name: "Tokyo Night", bg: "#1a1b26",
        accent: "#7aa2f7", text: "#a9b1d6",
        radius: 15, width: 500, height: 250,
        haveAnimation: true, haveBacklight: true
    });
    const [selectedFont, setSelectedFont] = useState("Fira Code");
    const [activeFont, setActiveFont] = useState({ name: null, base64: null });
    const [image, setImage] = useState({ url: null, width: 240, height: 135, x: 20, y: 30, radius: 10 });
    const [hint, setHint] = useState({ show: true, x: 20, y: 240, size: 8 });
    const [credit, setCredit] = useState({ show: true, x: 320, y: 240, size: 8 });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ ...image, url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    const updateField = (id, key, newValue) => {
        setFields(prev => ({
            ...prev,
            values: prev.values.map(f =>
                f.id === id ? { ...f, [key]: newValue } : f
            )
        }));
    };

    const addField = () => {
        setFields(prev => ({
            ...prev,
            values: [
                ...prev.values,
                { id: Date.now() }
            ]
        }));
    };

    const removeField = (id) => {
        setFields(prev => ({
            ...prev,
            values: prev.values.filter(f => f.id !== id)
        }));
    };
    useEffect(() => {
        const loadAndInject = async () => {
            const formattedName = selectedFont.replace(/\s+/g, '_');
            const fontModule = await import(`./assets/fonts/${formattedName}`);
            const fontData = fontModule.default;

            const id = `font-style-${formattedName}`;
            if (!document.getElementById(id)) {
                const style = document.createElement('style');
                style.id = id;
                style.innerHTML = `
    				      @font-face {
    				        font-family: "${fontData.name}";
    				        src: url("${fontData.base64}") format("woff2");
    				      }
    				    `;
                document.head.appendChild(style);
            }

            setActiveFont(fontData);
        };

        loadAndInject();
    }, [selectedFont]);

    return (
        <div className="flex bg-[#0f0f14] text-gray-200">
            <aside id="sidebar" className="p-10 space-y-4 w-100 h-screen sticky top-0 bg-[#1e1e2e] border-r border-[#24283b] overflow-y-auto overflow-x-hidden">
                <a href="https://github.com/new9c/ricecard">
                    <h2 id="ricecard-title" className="text-xl font-bold mb-6 text-white">Ricecard</h2>
                </a>
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
                                    accent: t.accent,
                                    bg: t.bg,
                                    text: t.text
                                })}
                            />
                        ))}
                    </div>
                    <FontPicker element={selectedFont} setter={setSelectedFont} />
                    <div className="flex items-center gap-3 mb-6">
                        <input
                            id="animation"
                            type="checkbox"
                            checked={theme.haveAnimation}
                            onChange={(e) => setTheme({ ...theme, haveAnimation: e.target.checked })}
                            className="w-4 h-4 rounded bg-[#1a1b26] border-[#414868] accent-blue-500 cursor-pointer"
                        />
                        <label htmlFor="animation" className="text-xs font-bold text-gray-500 uppercase cursor-pointer select-none ">
                            Have Start Animation
                        </label>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <input
                            id="backlight"
                            type="checkbox"
                            checked={theme.haveBacklight}
                            onChange={(e) => setTheme({ ...theme, haveBacklight: e.target.checked })}
                            className="w-4 h-4 rounded bg-[#1a1b26] border-[#414868] accent-blue-500 cursor-pointer"
                        />
                        <label htmlFor="backlight" className="text-xs font-bold text-gray-500 uppercase cursor-pointer select-none ">
                            Have Backlight / Blur
                        </label>
                    </div>
                    <WidthHeight element={theme} setter={setTheme} />
                    <BorderRadius element={theme} setter={setTheme} />
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
                    <WidthHeight element={image} setter={setImage} max_height={theme.height} max_width={theme.width} />
                    <Pos max_width={theme.width} max_height={theme.height} element={image} setter={setImage} />
                    <BorderRadius element={image} setter={setImage} />
                </div>
                <Sep />
                <div className="space-y-4">
                    {fields.values.map((field) => (
                        <div key={field.id} className="flex gap-2 items-end">
                            <div className="flex-1">
                                <input
                                    placeholder="Category"
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                    className="w-full bg-[#1a1b26] border border-[#414868] rounded p-1 text-xs text-gray-400"
                                />
                                <input
                                    placeholder="Name"
                                    value={field.value}
                                    onChange={(e) => updateField(field.id, 'value', e.target.value)}
                                    className="w-full bg-[#1a1b26] border border-[#414868] rounded p-2 mt-1 text-white"
                                />
                                <input
                                    placeholder="Link (Optional)"
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
                <Pos max_width={theme.width} max_height={theme.height} element={fields} setter={setFields} />
                <Size element={fields} setter={setFields} />
                <Gap element={fields} setter={setFields} />
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
                        className="w-full bg-[#1a1b26] border border-[#414868] rounded p-2 mt-1 text-white"
                    />
                    <input
                        name="src"
                        value={dotfiles.src}
                        onChange={(e) => setDotfiles({ ...dotfiles, src: e.target.value })}
                        placeholder="URL (Optional)"
                        className="w-full bg-[#1a1b26] border border-[#414868] rounded p-2 mt-1 text-white"
                    />
                </div>
                <Pos max_width={theme.width} max_height={theme.height} element={dotfiles} setter={setDotfiles} />
                <Size element={dotfiles} setter={setDotfiles} />
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
                <Pos max_width={theme.width} max_height={theme.height} element={hint} setter={setHint} />
                <Size element={hint} setter={setHint} />
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
                <Pos max_width={theme.width} max_height={theme.height} element={credit} setter={setCredit} />
                <Size element={credit} setter={setCredit} />
                <Sep />
                <div className="pt-2">
                    <button
                        onClick={exportSVG}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export SVG
                    </button>
                </div>
                <div className="pt-2">
                    <button
                        onClick={() => exportPNG(theme.width, theme.height)}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        Export PNG
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 h-screen flex items-center justify-center">
                <div className="w-full h-full max-w-6xl flex items-center justify-center">
                    <RiceCard activeFont={activeFont} hint={hint} dotfiles={dotfiles} fields={fields} theme={theme} image={image} credit={credit} />
                </div>
            </main>
        </div>
    );
}

export default App;
