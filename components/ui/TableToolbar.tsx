"use client";
import { ToolbarItem } from "@/lib/toolbar/types";
import { Button } from "./button";

const TableToolbar = ({
  assetToolbarConfig,
}: {
  assetToolbarConfig: any[];
}) => {
  const getButton = (item: ToolbarItem, i: number) => {
    const handleClick = () => {
      // hasPermission(item.permissionsAllowed) && item.function?.(item);
      // everything else works as before
      item.function?.(item);
    };

    return (
      <Button
        className={item.className}
        variant="outline"
        onClick={handleClick}
        key={i}
      >
        {item.icon}
        <span className="ml-2">{item.label}</span>
      </Button>
    );
  };
  return (
    <>
      {" "}
      <div className="flex gap-2 mt-4">
        {assetToolbarConfig.map((item, i) => {
          const component = getButton(item, i);
          const hasPermission = true;
          return hasPermission && component;
        })}
      </div>
    </>
  );
};

export default TableToolbar;
