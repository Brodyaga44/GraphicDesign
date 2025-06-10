import { IUseRegistration } from "@/pages/Registration/model/interfaces/IUseRegistration.ts";
import { $api } from "@/shared/config/api/api.ts";
export async function getSHA256Hash(str: string) {
  console.log(str);
  // Преобразуем пароль в Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // Хешируем пароль с помощью SHA-256 (можно выбрать другой алгоритм)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Преобразуем хеш в hex-строку
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log(hashHex);
  return hashHex;
}
const useRegistration = () => {
  const regReq = async (data: IUseRegistration): Promise<void> => {
    const hashServer = await getSHA256Hash(data.password);
    await $api.post("/users", {
      ...data,
      password: hashServer,
    });
  };

  return {
    regReq,
  };
};

export default useRegistration();
