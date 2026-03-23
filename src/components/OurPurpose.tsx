import { purposes } from "@/data/ourPurposes";

export default function OurPurpose() {
  return (
    <div className="flex flex-col items-center justify-center bg-highlight py-20">
      <h2 className="text-4xl xl:text-4xl 2xl:text-5xl font-extrabold leading-tight font-libre text-left text-bg mb-10">
        Our Purpose
      </h2>
      <div className="flex justify-center px-10">
        <ul className="list-disc text-bg text-md space-y-4 max-w-150 xl:max-w-200">
          {purposes.map((purpose, index) => (
            <li key={index}>{purpose}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
