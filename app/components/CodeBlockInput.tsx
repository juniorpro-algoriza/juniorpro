import { Textarea } from "./Textarea";

interface CodeBlockInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  error?:string  
}

export const CodeBlockInput = ({
  label,
  value,
  onChange,
  placeholder,
  name,
  className,
  error
}: CodeBlockInputProps) => {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} <span className="text-gray-400 text-xs">Optional</span>
        </label>
      )}
      <div className="bg-white rounded-3xl border border-gray-100 mt-2 overflow-hidden">
        <div className="flex space-x-2 px-4 py-3 bg-gray-600 border-b border-[#3a3a3a]">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
        </div>
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-transparent text-sm px-4 py-3 border-0 focus:ring-0 whitespace-pre-wrap text-gray-600 ${className}`}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
