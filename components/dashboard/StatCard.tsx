// import Image from "next/image";

// type Props = {
//   title: string;
//   value: string;
//   badge: string;
//   sub: string;

//   iconPath: string;
//   iconBgClass?: string;
// };

// export default function StatCard({
//   title,
//   value,
//   badge,
//   sub,
//   iconPath,
// }: Props) {
//   return (
//     <div>
//       <div className="flex px-1 py-2 items-start gap-4">
//         {/* Icon square */}
//         {/* <div
//           className={[
//             "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
            
//           ].join(" ")}
//         > */}
//         <Image
//           src={iconPath}
//           alt={title}
//           width={35}
//           height={35}
//           className="object-contain"
//         />
//         {/* </div> */}

//         {/* Title + Value + Badge */}
//         <div className="min-w-0 flex-1 space-y-1">
//           <p className="text-sm text-[#676978] leading-tight">
//             {title}
//           </p>

//           <div className="mt-1 flex items-center gap-3 mt-2">
//             <h3 className=" font-semibold text-gray-900 leading-tight">
//               {value}
//             </h3>
//             {/* className="shrink-0 rounded-sm bg-[#E3F0E5] text-[#00891D] text-xs px-2 py-1 border border-[#00891D4A]" */}
//             <span className="text-black text-[10px]">{badge}</span>
//           </div>
//           <p className="text-xs text-gray-500">{sub}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";

type Props = {
  title: string;
  value: string;
  badge: string;
  sub: string;
  iconPath: string;
  showDivider?: boolean;
};

export default function StatCard({
  title,
  value,
  badge,
  sub,
  iconPath,
  showDivider = false,
}: Props) {
  return (
    <div className="relative h-full">
      <div className="flex px-3 py-3 items-start gap-4">
        {/* Icon */}
        <Image
          src={iconPath}
          alt={title}
          width={36}
          height={36}
          className="object-contain shrink-0"
        />

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-sm text-[#676978] leading-tight">
            {title}
          </p>

          <div className="flex items-center gap-3 mt-1">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {value}
            </h3>

            <span className="text-[10px] text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
              {badge}
            </span>
          </div>

          <p className="text-xs text-gray-500 leading-tight">
            {sub}
          </p>
        </div>
      </div>

      {/* Gradient Vertical Divider */}
      {showDivider && (
        <div
          className="
            hidden xl:block
            absolute right-0 top-5 bottom-5
            w-[2.5px] 
          "
          style={{
            background:
              "linear-gradient(to bottom, #FFFFFF 0%, #000000 50%, #FFFFFF 100%)",
            opacity: 0.15, // subtle, premium look
          }}
        />
      )}
    </div>
  );
}

