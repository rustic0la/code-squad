import { Sidebar } from "@/components/Sidebar";
import { Spinner } from "@/components/ui/Spinner";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full left-[176px] relative h-screen bg-gray-100">
        <Spinner />
      </div>
    </div>
  );
}
