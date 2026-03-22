import { sponsors } from "@/assets/logos";

export default function Sponsors() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-10 text-md sm:text-base text-text/60 tracking-widest text-center">
        A SPECIAL THANK YOU TO <br className="flex sm:hidden" /> OUR SPONSORS
      </p>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 place-items-center">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.name}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={sponsor.src}
              alt={sponsor.name}
              className=" h-10 md:h-15 xl:h-20 object-contain"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
