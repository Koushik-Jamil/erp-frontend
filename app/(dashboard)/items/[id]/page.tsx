type Props = {
  params: { id: string };
};

export default function ItemDetailsPage({ params }: Props) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Item Details</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}
