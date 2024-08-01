export default function Button({
    text,
    handler,
}: {
    text: string;
    handler: () => void;
}) {
    return (
        <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={handler}
        >
            {text}
        </button>
    );
}
