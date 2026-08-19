// Chakra color mappings for energy visualization
// Maps chakra numbers (1-7) to Tailwind CSS color classes

export interface ChakraInfo {
    number: number;
    name: string;
    color: string; // Tailwind bg color class
    textColor: string; // Tailwind text color class
    borderColor: string; // Tailwind border color class
    glowColor: string; // CSS color for box-shadow glow
}

export const chakraColors: Record<number, ChakraInfo> = {
    1: {
        number: 1,
        name: "Muladhara (Root)",
        color: "bg-red-500",
        textColor: "text-red-500",
        borderColor: "border-red-500",
        glowColor: "rgba(239, 68, 68, 0.5)" // red-500 with 50% opacity
    },
    2: {
        number: 2,
        name: "Svadhisthana (Sacral)",
        color: "bg-orange-500",
        textColor: "text-orange-500",
        borderColor: "border-orange-500",
        glowColor: "rgba(249, 115, 22, 0.5)" // orange-500 with 50% opacity
    },
    3: {
        number: 3,
        name: "Manipura (Solar Plexus)",
        color: "bg-yellow-400",
        textColor: "text-yellow-400",
        borderColor: "border-yellow-400",
        glowColor: "rgba(250, 204, 21, 0.5)" // yellow-400 with 50% opacity
    },
    4: {
        number: 4,
        name: "Anahata (Heart)",
        color: "bg-green-500",
        textColor: "text-green-500",
        borderColor: "border-green-500",
        glowColor: "rgba(34, 197, 94, 0.5)" // green-500 with 50% opacity
    },
    5: {
        number: 5,
        name: "Vishuddha (Throat)",
        color: "bg-cyan-400",
        textColor: "text-cyan-400",
        borderColor: "border-cyan-400",
        glowColor: "rgba(34, 211, 238, 0.5)" // cyan-400 with 50% opacity
    },
    6: {
        number: 6,
        name: "Ajna (Third Eye)",
        color: "bg-indigo-500",
        textColor: "text-indigo-500",
        borderColor: "border-indigo-500",
        glowColor: "rgba(99, 102, 241, 0.5)" // indigo-500 with 50% opacity
    },
    7: {
        number: 7,
        name: "Sahasrara (Crown)",
        color: "bg-purple-500",
        textColor: "text-purple-500",
        borderColor: "border-purple-500",
        glowColor: "rgba(168, 85, 247, 0.5)" // purple-500 with 50% opacity
    }
};

// Get chakra info by chakra number
export function getChakraInfo(chakraNumber?: number): ChakraInfo | null {
    if (!chakraNumber || chakraNumber < 1 || chakraNumber > 7) {
        return null;
    }
    return chakraColors[chakraNumber];
}

// Get chakra color classes for an energy number
export function getEnergyChakraColors(energyNumber: number, energies: any): ChakraInfo | null {
    const energy = energies[energyNumber];
    if (!energy || !energy.chakra) {
        return null;
    }
    return getChakraInfo(energy.chakra);
}
