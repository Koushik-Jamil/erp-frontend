import { getSessionUser } from "@/lib/session";
import ItemsClient from "./itemsClient";

export default async function Page({
  searchParams,
}: {
  searchParams: { variantId?: string };
}) {
  const user = await getSessionUser();
  const role = (user?.role ?? "STAFF") as "ADMIN" | "MANAGER" | "STAFF";
  const permissions = user?.permissions?.map((p) => String(p)) ?? ["ASSET_EXPORT"];

  const variantId = searchParams.variantId ?? "";
  return <ItemsClient role={role} permissions={permissions} variantId={variantId} />;
}