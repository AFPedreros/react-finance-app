import { getHello } from "../api/get-hello";

export async function ServerHello() {
  const data = await getHello("Server");

  return <code>{data?.message ?? "No hubo respuesta"}</code>;
}
