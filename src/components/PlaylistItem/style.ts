import { tv, type VariantProps } from "tailwind-variants";

export const baseStyle = tv({
  base: "flex items-center gap-2 hover:bg-zinc-800 cursor-pointer",
  variants: {
    variant: {
      default: "border-none",
      menu: "border border-zinc-800 rounded-lg bg-zinc-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type baseStyleProps = VariantProps<typeof baseStyle>;

