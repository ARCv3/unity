

export default async function Page({
  params
}: {
  params: Promise<{id: string}>
}) {
  const id = (await params).id;
  return (
    <main>
      <h1>Hello World {id}</h1>
    </main>
  )
}
