export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-200 bg-white text-green-600 shadow-sm focus:ring-green-400 focus:ring-offset-0 " +
                className
            }
        />
    );
}
