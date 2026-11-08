// Grafiki do lekcji: pliki src/diagrams/<nazwa>.svg (mogą mieć animacje CSS w środku).
const files = import.meta.glob<string>("./diagrams/*.svg", { query: "?url", import: "default", eager: true });

export const diagramUrl = (name: string): string | undefined => files[`./diagrams/${name}.svg`];
