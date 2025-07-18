export const JobCard = ({ job }) => <div className="p-4 rounded-md shadow-xl bg-white/10 backdrop-blur-md">
    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
    <p className="text-gray-700">{job.description?.slice(0, 150)}...</p>
    <a href={job.link} target="_blank" className="text-blue-800 underline">
        Apply
    </a>
</div>;
