import { ReactNode, type ElementType } from "react";
// ! This is a polymorphic Component with the generic I can't understand it .
type ContainerProps = {
  as: ElementType;
  children: ReactNode;
};
export default function Container({ as, children }: ContainerProps) {
  const Component = as;
  return (
    <div>
      <Component>{children}</Component>
    </div>
  );
}
