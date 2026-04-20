import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-160 overflow-hidden relative">
      <Image
        src="https://picsum.photos/seed/fashion1/1600/1000"
        alt=""
        fill
        className="object-cover"
      ></Image>

      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/50 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 lg:p-20">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-(--color-text-inverted) text-7xl md:text-8xl mb-4">
            GEESIX
          </h1>
          <p className="font-serif italic text-(--color-text-inverted)/80 text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-lg">
            Sharp silhouettes for a quieter kind of statement.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href="/customer/collection"
              className="bg-(--color-bg) px-8 py-3 border text-center w-fit uppercase font-medium text-(--color-darkbrown) hover:cursor-pointer hover:bg-(--color-cream) tracking-wider text-sm hover:scale-102 duration-100"
            >
              Shop new season
            </a>
            <a
              href="/about"
              className="bg-none px-8 py-3 border w-fit text-center  uppercase font-medium text-(--color-text-inverted) hover:cursor-pointer hover:bg-(--color-cream)/10 tracking-wider text-sm hover:scale-102 duration-100"
            >
              about our mission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
