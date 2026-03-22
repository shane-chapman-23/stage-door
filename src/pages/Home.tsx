import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <section className="pt-10 lg:pt-20 px-6 h-[80vh]">
      <div className="grid lg:grid-cols-2 items-center justify-center">
        {/* Header */}
        <header className="flex flex-col gap-2 sm:items-start mx-auto">
          <h1 className="text-4xl xl:text-4xl 2xl:text-5xl font-extrabold leading-tight font-libre text-left">
            <span>Stage Door Productions</span> <br />
            <span className="">Charitable Trust</span>
          </h1>
          <p className="text-text/60 text-sm 2xl:text-lg text-left">
            Performing arts workshops, seminars, training programmes, and
            events.
          </p>
        </header>
        {/* Contact form */}
        <section
          aria-labelledby="contact-heading"
          className="flex mx-auto justify-center lg:items-start lg:mt-0"
        >
          <div className="flex flex-col text-center">
            <h2
              className="mb-5 text-md sm:text-base text-text/60 tracking-widest mt-10 lg:mt-0"
              id="contact-heading"
            >
              GET IN TOUCH
            </h2>
            <ContactForm />
          </div>
        </section>
      </div>
    </section>
  );
}
