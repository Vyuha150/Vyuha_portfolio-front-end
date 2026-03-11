export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-orange-500 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
