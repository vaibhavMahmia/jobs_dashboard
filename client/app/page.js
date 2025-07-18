import { fetchJobs } from "@/lib/api";
import { JobCard } from "@/components/JobCard";

const Home = async () => {
  const jobs = await fetchJobs();

  return <main className="p-6 space-y-4">
    <h1 className="text-2xl font-bold text-center text-teal-700 
      backdrop-blur-md bg-[#fff9f93a] rounded-md px-6 py-4 shadow-lg">
      Jobs Dashboard
    </h1>
    <div className="grid gap-4">
      {jobs.length === 0 ? (
        <div className="text-center text-gray-800 text-lg py-8">
          No jobs found.
        </div>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.guid} job={job} />
        ))
      )}
    </div>
  </main>;
}

export default Home;