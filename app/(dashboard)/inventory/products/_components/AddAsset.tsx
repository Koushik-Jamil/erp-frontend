"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ---------- Zod Schema ---------- */
const AssetSchema = z.object({
  assetCategory:        z.string().min(1, "Required"),
  assetSubCategory:     z.string().min(1, "Required"),
  assetType:            z.string().optional(),
  brand:                z.string().optional(),
  model:                z.string().optional(),
  unitType:             z.string().optional(),
  deviceType:           z.string().optional(),
  processor:            z.string().optional(),
  ram:                  z.string().optional(),
  storageSize:          z.string().optional(),
  macAddress:           z.string().optional(),
  ipAddress:            z.string().optional(),
  hostname:             z.string().optional(),
  osName:               z.string().optional(),
  licenseKey:           z.string().optional(),
  serialNumber:         z.string().optional(),
  domainName:           z.string().optional(),
  vlan:                 z.string().optional(),
  switchPort:           z.string().optional(),
  firewallZone:         z.string().optional(),
  complianceTag:        z.string().optional(),
  poNumber:             z.string().optional(),
  invoiceNumber:        z.string().optional(),
  purchaseDate:         z.string().optional(),
  purchaseCost:         z.string().optional(),
  currency:             z.string().optional(),
  vendorName:           z.string().optional(),
  warrantyStartDate:    z.string().optional(),
  warrantyEndDate:      z.string().optional(),
  amcStartDate:         z.string().optional(),
  amcEndDate:           z.string().optional(),
  depreciationMethod:   z.string().optional(),
  depreciationRate:     z.string().optional(),
  assetUsefulLife:      z.string().optional(),
  currentBookValue:     z.string().optional(),
  owningDepartment:     z.string().optional(),
  assignedBusinessUnit: z.string().optional(),
  assetLocation:        z.string().optional(),
  floorRoomRack:        z.string().optional(),
  custodian:            z.string().optional(),
  costCenter:           z.string().optional(),
  assetStatus:          z.string().optional(),
});

type AssetFormValues = z.infer<typeof AssetSchema>;
type Tab = "asset" | "procurement" | "ownership";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave?: (data: AssetFormValues) => void;
};

/* ── Reusable Stepper Select ── */
function StepperSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const currentIndex = options.indexOf(value);

  const goUp = () => {
    if (currentIndex === -1) onChange(options[0]);
    else onChange(options[(currentIndex - 1 + options.length) % options.length]);
  };

  const goDown = () => {
    if (currentIndex === -1) onChange(options[0]);
    else onChange(options[(currentIndex + 1) % options.length]);
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-10 bg-white">
      <span className="flex-1 px-3 text-sm truncate">
        {value ? (
          <span className="text-gray-700">{value}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </span>
      <div className="flex flex-col border-l border-gray-300 shrink-0">
        <button
          type="button"
          onClick={goUp}
          className="px-2 py-0.5 hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800 border-b border-gray-300"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goDown}
          className="px-2 py-0.5 hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function AddAsset({ open, onClose, onSave }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("asset");

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(AssetSchema),
    defaultValues: { assetCategory: "IT", assetSubCategory: "PC" },
  });

  function handleSubmit(data: AssetFormValues) {
    onSave?.(data);
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

        {/* ── Fixed Header ── */}
        <div className="px-6 pt-6 pb-0 shrink-0">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-gray-900">Add New Asset</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <Form {...form}>
            {/* Top 6 fields — always visible */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">

              <FormField control={form.control} name="assetCategory" render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Category</FormLabel>
                  <FormControl>
                    <StepperSelect
                      options={["IT", "Non-IT", "Furniture", "Vehicle", "Infrastructure"]}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Select category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="assetSubCategory" render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Sub-Category</FormLabel>
                  <FormControl>
                    <StepperSelect
                      options={["PC", "Laptop", "Server", "Printer", "Switch", "Router"]}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Select sub-category"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="assetType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Asset Type</FormLabel>
                  <FormControl>
                    <StepperSelect
                      options={["Hardware", "Software", "Peripheral", "Network"]}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Select asset type"
                    />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="brand" render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand/Manufacturer</FormLabel>
                  <FormControl>
                    <StepperSelect
                      options={["Dell", "HP", "Lenovo", "Apple", "Asus", "Samsung", "Cisco"]}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Select brand/manufacturer"
                    />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="model" render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl><Input placeholder="Enter model" className="border-gray-300" {...field} /></FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="unitType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Type</FormLabel>
                  <FormControl>
                    <StepperSelect
                      options={["Piece", "Set", "Box", "Unit"]}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Select unit type"
                    />
                  </FormControl>
                </FormItem>
              )} />

            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-gray-200">
              {(["asset", "procurement", "ownership"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors",
                    activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900 hover:text-gray-900",
                  ].join(" ")}
                >
                  {tab === "asset" && "Asset Details"}
                  {tab === "procurement" && "Procurement & Financial"}
                  {tab === "ownership" && "Ownership & Location"}
                </button>
              ))}
            </div>
          </Form>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>

              {/* ── Tab: Asset Details ── */}
              {activeTab === "asset" && (
                <div className="space-y-6">

                  {/* Hardware Details */}
                  <section>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Hardware Details</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                      <FormField control={form.control} name="deviceType" render={({ field }) => (
                        <FormItem><FormLabel>Device Type</FormLabel>
                          <FormControl><Input placeholder="Enter device type" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="processor" render={({ field }) => (
                        <FormItem><FormLabel>Processor</FormLabel>
                          <FormControl><Input placeholder="Enter processor" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="ram" render={({ field }) => (
                        <FormItem><FormLabel>RAM</FormLabel>
                          <FormControl>
                            <StepperSelect
                              options={["2GB", "4GB", "8GB", "16GB", "32GB", "64GB", "128GB"]}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              placeholder="Enter ram"
                            />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="storageSize" render={({ field }) => (
                        <FormItem><FormLabel>Storage Size (GB)</FormLabel>
                          <FormControl><Input placeholder="Enter Storage Size" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="macAddress" render={({ field }) => (
                        <FormItem><FormLabel>MAC Address</FormLabel>
                          <FormControl><Input placeholder="Enter mac address" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="ipAddress" render={({ field }) => (
                        <FormItem><FormLabel>IP Address</FormLabel>
                          <FormControl>
                            <StepperSelect
                              options={["Static", "Dynamic (DHCP)"]}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              placeholder="Enter IP Address"
                            />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="hostname" render={({ field }) => (
                        <FormItem><FormLabel>Hostname</FormLabel>
                          <FormControl><Input placeholder="Enter hostname" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="osName" render={({ field }) => (
                        <FormItem><FormLabel>OS Name &amp; Version</FormLabel>
                          <FormControl><Input placeholder="Enter os name & version" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="licenseKey" render={({ field }) => (
                        <FormItem><FormLabel>License Key (if applicable)</FormLabel>
                          <FormControl>
                            <StepperSelect
                              options={["OEM", "Retail", "Volume", "None"]}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              placeholder="Enter license key"
                            />
                          </FormControl>
                        </FormItem>
                      )} />

                    </div>
                    <div className="mt-4">
                      <FormField control={form.control} name="serialNumber" render={({ field }) => (
                        <FormItem><FormLabel>Serial Number</FormLabel>
                          <FormControl><Input placeholder="Enter Serial Number" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />
                    </div>
                  </section>

                  {/* Network & Security */}
                  <section>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Network &amp; Security</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                      <FormField control={form.control} name="domainName" render={({ field }) => (
                        <FormItem><FormLabel>Domain Name</FormLabel>
                          <FormControl><Input placeholder="Enter domain name" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="vlan" render={({ field }) => (
                        <FormItem><FormLabel>VLAN</FormLabel>
                          <FormControl><Input placeholder="Enter vlan" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="switchPort" render={({ field }) => (
                        <FormItem><FormLabel>Switch Port</FormLabel>
                          <FormControl>
                            <StepperSelect
                              options={["Port 1", "Port 2", "Port 3", "Port 4", "Port 5"]}
                              value={field.value ?? ""}
                              onChange={field.onChange}
                              placeholder="Enter Hostname"
                            />
                          </FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="firewallZone" render={({ field }) => (
                        <FormItem><FormLabel>Firewall Zone</FormLabel>
                          <FormControl><Input placeholder="Enter firewall zone" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="complianceTag" render={({ field }) => (
                        <FormItem><FormLabel>Compliance Tag (ISO / SOC / Internal)</FormLabel>
                          <FormControl><Input placeholder="Enter compliance tag" className="border-gray-300" {...field} /></FormControl>
                        </FormItem>
                      )} />

                    </div>
                  </section>
                </div>
              )}

              {/* ── Tab: Procurement & Financial ── */}
              {activeTab === "procurement" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800">Procurement &amp; Financial Details</h3>

                  {/* Row 1 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <FormField control={form.control} name="poNumber" render={({ field }) => (
                      <FormItem><FormLabel>Purchase Order (PO) Number</FormLabel>
                        <FormControl><Input placeholder="Enter PO Number" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="invoiceNumber" render={({ field }) => (
                      <FormItem><FormLabel>Invoice Number</FormLabel>
                        <FormControl><Input placeholder="Enter Invoice Number" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="purchaseDate" render={({ field }) => (
                      <FormItem><FormLabel>Purchase Date</FormLabel>
                        <FormControl><Input type="date" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="purchaseCost" render={({ field }) => (
                      <FormItem><FormLabel>Purchase Cost</FormLabel>
                        <FormControl><Input placeholder="Enter Purchase Cost" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <FormField control={form.control} name="currency" render={({ field }) => (
                      <FormItem><FormLabel>Currency</FormLabel>
                        <FormControl><Input placeholder="Enter Currency" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="vendorName" render={({ field }) => (
                      <FormItem><FormLabel>Vendor / Supplier Name</FormLabel>
                        <FormControl>
                          <StepperSelect
                            options={["Vendor 1", "Vendor 2", "Vendor 3", "Vendor 4"]}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Select Vendor / Supplier Name"
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="warrantyStartDate" render={({ field }) => (
                      <FormItem><FormLabel>Warranty Start Date</FormLabel>
                        <FormControl><Input type="date" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="warrantyEndDate" render={({ field }) => (
                      <FormItem><FormLabel>Warranty End Date</FormLabel>
                        <FormControl><Input type="date" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <FormField control={form.control} name="amcStartDate" render={({ field }) => (
                      <FormItem><FormLabel>AMC Start Date (if applicable)</FormLabel>
                        <FormControl><Input type="date" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="amcEndDate" render={({ field }) => (
                      <FormItem><FormLabel>AMC End Date</FormLabel>
                        <FormControl><Input type="date" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="depreciationMethod" render={({ field }) => (
                      <FormItem><FormLabel>Depreciation Method (SLM / WDV / None)</FormLabel>
                        <FormControl>
                          <StepperSelect
                            options={["SLM", "WDV", "None"]}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Select Depreciation Method"
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="depreciationRate" render={({ field }) => (
                      <FormItem><FormLabel>Depreciation Rate (%)</FormLabel>
                        <FormControl><Input placeholder="Enter Depreciation Rate" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  {/* Row 4 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <FormField control={form.control} name="assetUsefulLife" render={({ field }) => (
                      <FormItem><FormLabel>Asset Useful Life (Years)</FormLabel>
                        <FormControl>
                          <StepperSelect
                            options={["1 Year", "2 Years", "3 Years", "5 Years", "7 Years", "10 Years", "15 Years"]}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Select Asset Useful Life"
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="currentBookValue" render={({ field }) => (
                      <FormItem><FormLabel>Current Book Value (Auto-calculated)</FormLabel>
                        <FormControl><Input placeholder="Current Book Value" className="border-gray-300 bg-gray-50" disabled {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>
                </div>
              )}

              {/* ── Tab: Ownership & Location ── */}
              {activeTab === "ownership" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-800">Ownership &amp; Location</h3>

                  {/* Row 1 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <FormField control={form.control} name="owningDepartment" render={({ field }) => (
                      <FormItem><FormLabel>Owning Department</FormLabel>
                        <FormControl>
                          <StepperSelect
                            options={["IT", "HR", "Accounts", "Store", "Operations", "Finance"]}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Select Owning Department"
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="assignedBusinessUnit" render={({ field }) => (
                      <FormItem><FormLabel>Assigned Business Unit</FormLabel>
                        <FormControl><Input placeholder="Enter Assigned Business Unit" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="assetLocation" render={({ field }) => (
                      <FormItem><FormLabel>Asset Location</FormLabel>
                        <FormControl>
                          <StepperSelect
                            options={["Head Office", "Branch 1", "Branch 2", "Warehouse", "Remote"]}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Select Asset Location"
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="floorRoomRack" render={({ field }) => (
                      <FormItem><FormLabel>Floor / Room / Rack (Optional)</FormLabel>
                        <FormControl><Input placeholder="Enter Floor / Room / Rack" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <FormField control={form.control} name="custodian" render={({ field }) => (
                      <FormItem><FormLabel>Custodian / Assigned User</FormLabel>
                        <FormControl><Input placeholder="Enter Custodian / Assigned User" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="costCenter" render={({ field }) => (
                      <FormItem><FormLabel>Cost Center</FormLabel>
                        <FormControl><Input placeholder="Enter Cost Center" className="border-gray-300" {...field} /></FormControl>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="assetStatus" render={({ field }) => (
                      <FormItem><FormLabel>Asset Status</FormLabel>
                        <FormControl>
                          <StepperSelect
                            options={["Active", "Inactive", "Under Maintenance", "Disposed", "Lost / Stolen"]}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Select Asset Status"
                          />
                        </FormControl>
                      </FormItem>
                    )} />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

