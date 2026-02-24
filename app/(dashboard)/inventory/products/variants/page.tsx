import { getSessionUser } from "@/lib/session";
import VariantsClient from "./variantsClient";

export default async function Page({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  const user = await getSessionUser();
  const role = (user?.role ?? "STAFF") as "ADMIN" | "MANAGER" | "STAFF";
  const permissions = user?.permissions?.map((p) => String(p)) ?? ["ASSET_EXPORT"];

  const productId = searchParams.productId ?? "";

  return <VariantsClient role={role} permissions={permissions} productId={productId} />;
}