import Image from "next/image";

export default function () {
  return (
    <section className="w-full flex justify-center items-center bg-(--color-cream)">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 md:min-h-[500px]">
        <div className="relative overflow-hidden h-[400px] md:h-auto">
          <Image
            className="object-cover object-center"
            src="https://picsum.photos/seed/studio07/1000/1200"
            fill
            alt=""
          ></Image>
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="flex flex-col gap-6 max-w-md">
            <h2 className="text-3xl font-serif text-(--color-darkbrown)">
              Built around drape, pace, and presence.
            </h2>
            <p className="text-(--color-charcoal)/70 text-md">
              Every piece in the MAISON collection begins with fabric. We source
              exceptional textiles from heritage mills across Italy, Japan, and
              Portugal &mdash; then shape them into garments designed to move
              with you, age with grace, and feel unmistakably yours.
            </p>
            <a
              href="/"
              className="bg-(--color-darkbrown) px-8 py-3 border w-full text-center md:w-fit uppercase font-medium text-(--color-text-inverted) hover:cursor-pointer hover:bg-(--color-charcoal) tracking-wide"
            >
              Explore Wardrobe Edits
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
