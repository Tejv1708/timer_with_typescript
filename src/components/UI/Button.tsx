import { type ComponentPropsWithoutRef } from "react";

// type ButtonProps = {
//   el: "button";
// } & ComponentPropsWithoutRef<"button">;

// type AnchorProps = {
//   el: "anchor";
// } & ComponentPropsWithoutRef<"a">;

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  href?: string;
};
type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
};

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return "href" in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  // Why not i destructor it and use it
  //   const { el, ...otherProps } = props;
  if (isAnchorProps(props)) {
    return <a {...props}></a>;
  }
  return <button {...props}></button>;
}
