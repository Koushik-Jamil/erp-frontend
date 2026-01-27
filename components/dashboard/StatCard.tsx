import Image from "next/image";

type Props = {
  title: string;
  value: string;
  badge: string;
  sub: string;

  iconPath: string;
  iconBgClass?: string;
};

export default function StatCard({
  title,
  value,
  badge,
  sub,
  iconPath,
  
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        {/* Icon square */}
        <div
          className={[
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            
          ].join(" ")}
        >
          <Image
            src={iconPath}
            alt={title}
            width={35}
            height={35}
            className="object-contain"
          />
        </div>

        {/* Title + Value + Badge */}
        <div className="min-w-0 flex-1">
          <p className="text-sm text-[#676978] leading-tight h-10 pt-1">{title}</p>

          <div className="mt-1 flex items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
              {value}
            </h3>

            <span className="shrink-0 rounded-sm bg-[#E3F0E5] text-[#00891D] text-xs px-2 py-1 border border-[#00891D4A]">
              {badge}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">{sub}</p>
        </div>
      </div>

      
    </div>
  );
}
