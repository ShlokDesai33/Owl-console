export default function ProgressBar({ fields }: { fields: any }) {
  const arr = Object.entries(fields);
  let count = 1;

  for (const [_, value] of arr) {
    // @ts-ignore
    if (value > 0) {
      count += 1;
    }
  }

  const percentage = Math.ceil(count / ++arr.length * 100);
  const css = `flex items-center bg-primary w-[${percentage}%] h-1 rounded-full justify-end`;

  return (
    <div className="flex items-center my-12 bg-gray-btn rounded-full h-1">
      <div className={css}>
        <div className="w-4 h-4 rounded-full shrink-0 bg-primary"></div>
      </div>
    </div>
  );
}