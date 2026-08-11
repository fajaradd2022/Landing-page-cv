import { person } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-charcoal px-6 py-10 lg:px-12 xl:px-20 2xl:px-28">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-sans text-lg font-semibold text-cream">{person.fullName.toUpperCase()}</p>
          <p className="font-mono text-xs tracking-wide text-gray">{person.headline}</p>
        </div>
        <div className="flex flex-col gap-1 font-mono text-xs tracking-wide text-gray lg:items-end">
          <span>{person.location}</span>
          <a href={person.website} target="_blank" rel="noreferrer" className="hover:text-champagne">
            {person.website.replace("https://", "")}
          </a>
          <span>&copy; 2026 {person.fullName}</span>
        </div>
      </div>
    </footer>
  );
}
