export const JobList = ({ jobs }) => <section>
    <h2 className="text-lg font-semibold mb-4">🧾 Jobs</h2>
    {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
    ) : (
        <div className="space-y-4">
            {jobs.map((job) => (
                    <div key={job.guid} className="bg-[#1a1a1a] text-white p-4 mb-4 rounded shadow-box">
                        <h2 className="text-primary text-lg bold mb-1 border-l-4">{job.title}</h2>
                        <p className="mb-2">{job.description}</p>
                        <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent underline bold"
                        >
                            View Job
                        </a>
                    </div>
            ))}
        </div>
    )}
</section>;