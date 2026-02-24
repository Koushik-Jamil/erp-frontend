"use client";

import DataTable from "@/components/ui/DataTable";
import { Plus } from "lucide-react";
import { assetColumns } from "../_config/columns";
import { DEMO_ASSET_ROWS } from "@/lib/demo-assets-table";
import { ToolbarItem } from "@/lib/toolbar/types";
import { useEffect, useState } from "react";
import AddAsset from "./AddAsset";
import { set } from "zod";

const AllAssets = () => {
  const [openAddAssetModal, setOpenAddAssetModal] = useState(false);

  const handleAddButton = () => {
    setOpenAddAssetModal(true);
  };

  //   api call
  useEffect(() => {
    // set the data 
  }, []);

  const buttons: ToolbarItem[] = [
    {
      id: "add",
      type: "button",
      label: "Add Asset",
      icon: <Plus className="w-4 h-4" />,
      variant: "default",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      rolesAllowed: ["ADMIN", "MANAGER"],
      permissionsAllowed: ["ASSET_ADD"], // example permission name
      function: () => handleAddButton(),
    },
    {
      id: "add",
      type: "button",
      label: "Add Asset",
      icon: <Plus className="w-4 h-4" />,
      variant: "default",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      rolesAllowed: ["ADMIN", "MANAGER"],
      permissionsAllowed: ["ASSET_ADD"], // example permission name
      function: () => handleAddButton(),
    },
  ];

  // return <AssetTableClient />;
  return (
    <>
      <DataTable
        columns={assetColumns}
        data={DEMO_ASSET_ROWS}
        toolbarItems={buttons}
      />
      <AddAsset open={openAddAssetModal} onClose={() => setOpenAddAssetModal(false)}/>

       
    </>
  );
};

export default AllAssets;
