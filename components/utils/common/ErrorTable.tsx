export default function ErrorTable({
    errors,
}: {
    errors: { path: string; message: string }[];
}) {
    return (
        <div className="container mx-auto">
            {errors.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Path
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Message
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {errors.map((error, index) => (
                                <tr
                                    key={index}
                                    className="bg-white hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        {error.path}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-red-500">
                                        {error.message}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
