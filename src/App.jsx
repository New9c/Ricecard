import React, { useState } from 'react';
import RiceCard from './RiceCard';

function App() {
    const [fields, setFields] = useState([
        { id: 1, label: 'OS', value: 'Arch Linux' },
        { id: 2, label: 'WM', value: 'Hyprland' },
        { id: 3, label: 'Shell', value: 'zsh' },
    ]);
    const [config, setConfig] = useState({
        wm: 'Hyprland',
        distro: 'Arch Linux',
        color: '#7aa2f7'
    });

    // 2. This function runs every time a user types
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig({
            ...config, // Keep the old values
            [name]: value // Update only the one that changed
        });
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
        link.download = `${config.wm}-rice.svg`;
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    };
    const updateField = (id, key, newValue) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: newValue } : f));
    };

    const addField = () => {
        setFields([...fields, { id: Date.now(), label: 'New', value: 'Value' }]);
    };

    const removeField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };

    return (
        <div className="flex h-screen bg-[#0f0f14] text-gray-200">
            {/* Sidebar Form */}
            <aside className="w-80 bg-[#16161e] p-8 border-r border-[#24283b]">
                <h2 className="text-xl font-bold mb-6 text-white">Ricecard</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                            Window Manager
                        </label>
                        <input
                            type="text"
                            name="wm" // This matches the key in our state
                            value={config.wm}
                            onChange={handleInputChange}
                            placeholder="e.g. Sway, i3, KWin"
                            className="w-full bg-[#1a1b26] border border-[#414868] rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="pt-6 border-t border-[#24283b] mt-6">
                        <button
                            onClick={exportSVG}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                            Export SVG
                        </button>
                    </div>
                </div>
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
                        className="w-full py-2 border border-dashed border-[#414868] text-gray-500 hover:text-white transition-colors"
                    >
                        + Add Row
                    </button>
                </div>
            </aside>

            {/* Preview Area */}
            <main className="flex-1 p-8 h-screen flex items-center justify-center">
                <div className="w-full h-full max-w-6xl flex items-center justify-center">
                    <RiceCard fields={fields} themeColor="#ffffff" />
                </div>
            </main>
        </div>
    );
}

export default App;
