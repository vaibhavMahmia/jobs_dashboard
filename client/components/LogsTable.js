export const LogsTable = ({ logs }) => <section>
    <h2 className="text-lg font-semibold mb-4">📊 Import Logs</h2>
    {logs.length === 0 ? (
        <p className="text-gray-500">No logs found.</p>
    ) : (
        <div className="overflow-auto">
            <table className="text-white border-collapse text-sm">
                <thead className="bg-teal">
                    <tr>
                        <th className="p-2">Created At</th>
                        <th className="p-2">Started At</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">New</th>
                        <th className="p-2">Updated</th>
                        <th className="p-2">Failed</th>
                        <th className="p-2">Sources</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, i) => (
                        <tr key={i} className="bg-[#1a1a1a] border-b border-primary">
                            <td className="p-2">
                                {new Date(log.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2">
                                {new Date(log.startedAt).toLocaleString()}
                            </td>
                            <td className="p-2 bg-primary">{log.totalFetched}</td>
                            <td className="p-2 bg-primary">{log.newJobs}</td>
                            <td className="p-2 bg-primary">{log.updatedJobs}</td>
                            <td className="p-2 bg-primary">{log.failedJobs}</td>
                            <td className="p-2">
                                {(log.sourceUrls || []).join(", ")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )}
</section>;