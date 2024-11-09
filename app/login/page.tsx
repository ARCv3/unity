import { Button } from "@/components/ui/button"

export default function Login() {
  return (
    <div className="flex justify-center align-items-center w-full h-full">
      <div className="flex-col flex justify-center align-items-centerborder-gray-200 border-2 rounded-3xl p-20">
        <h1 className="text-2xl">ARC</h1>
        <Button>Login with Discord</Button>
      </div>
    </div>
  );
}
