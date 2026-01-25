import { ReactNode } from "react";

type Props = {
  title: string;
  rightSlot?: ReactNode;
  children: ReactNode;
};

export default function SectionCard({ title, rightSlot, children }: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {rightSlot && <div>{rightSlot}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
