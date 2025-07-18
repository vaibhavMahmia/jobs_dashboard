import { JobList } from "@/components/JobList";
import { LogsTable } from "@/components/LogsTable";

const getData = async (endpoint) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });
  return res.json();
}

const Home = async () => {
  const [jobs, logs] = await Promise.all([
    getData("/api/jobs/fetch"),
    getData("/api/logs/fetch"),
  ]);

  return <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 h-[calc(100vh-4rem)]">
    <div className="overflow-y-auto pr-2 custom-scroll">
      <JobList jobs={jobs} />
    </div>
    <div className="overflow-y-auto pl-2 custom-scroll">
      <LogsTable logs={logs} />
    </div>
  </main>;
}

export default Home;