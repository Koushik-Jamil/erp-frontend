export default function Separator({ vertical }: { vertical?: boolean }) {
  return (
    <div className={vertical ? "w-px bg-gray-200 self-stretch" : "h-px bg-gray-200"} />
  );
}
