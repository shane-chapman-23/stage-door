export default function Home() {
  return (
    <section className="h-screen pt-20 px-10">
      <div className="grid lg:grid-cols-2">
        <header className="flex flex-col justify-center items-center">
          <h1 className="text-5xl sm:text-6xl font-semibold leading-tight font-poppins">
            <span className="block">Stage Door</span>
            <span className="block">Productions</span>
          </h1>

          <p className="mt-4 text-md sm:text-base tracking-widest text-gray-500">
            CHARITABLE TRUST
          </p>
        </header>

        <section
          aria-labelledby="contact-heading"
          className="flex flex-col justify-center items-center"
        >
          <h2 id="contact-heading">Contact Us</h2>
          {/* form */}
        </section>
      </div>
    </section>
  );
}
