export const Colors = {
  light: {
    text: "#111111",
    textSecondary: "#666666",
    background: "#ffffff",
  },
  dark: {
    text: "#ffffff",
    textSecondary: "#aaaaaa",
    background: "#000000",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;
export const Spacing = { three: 12, four: 16 } as const;
