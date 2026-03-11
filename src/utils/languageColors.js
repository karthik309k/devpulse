const COLORS = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    Java: "#b07219", "C++": "#f34b7d", C: "#555555", "C#": "#178600",
    Go: "#00ADD8", Rust: "#dea584", Ruby: "#701516", PHP: "#4F5D95",
    Swift: "#F05138", Kotlin: "#A97BFF", Dart: "#00B4AB",
    HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
    Vue: "#41b883", Svelte: "#ff3e00", Scala: "#c22d40",
};

export const getLanguageColor = (lang) => COLORS[lang] || "#8b949e";

export const CHART_COLORS = [
    "#58a6ff", "#3fb950", "#f78166", "#d2a8ff", "#ffa657",
    "#76e3ea", "#e3b341", "#ff7b72",
];