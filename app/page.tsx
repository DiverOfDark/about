import { Site } from "@/components/site";
import { getTeasers } from "@/lib/blog";

export default function Page() {
  return <Site posts={getTeasers(3)} />;
}
