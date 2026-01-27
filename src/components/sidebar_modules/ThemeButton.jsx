const ThemeButton = ({ theme, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                "--text-color": theme.text,
                "--accent-color": theme.accent,
                backgroundColor: theme.bg,
                borderColor: theme.accent // Blue-500 if active
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
export default ThemeButton;
