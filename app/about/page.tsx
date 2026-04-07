import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col gap-8 md:gap-32 w-full mx-auto md:min-h-140 md:p-4 mb-20">
      <div className=" justify-center w-full flex flex-col items-center text-center gap-4 md:gap-12 min-h-100 bg-(--color-cream) divide-y divide-(--color-border) md:py-24">
        <h1 className="text-3xl font-medium font-serif text-(--color-darkbrown) leading-8 pb-6">
          About <br />{" "}
          <span className="tracking-[0.25em] text-5xl ">GEESIX</span>
        </h1>
        <p className="md:max-w-[60ch] leading-7 text-lg text-balance text-(--color-darkbrown)">
          At Geesix, we curate life’s finest indulgences - from handcrafted
          supercars and timeless designer eyewear to rare exotic leather bags
          and the world’s most premium raw chicken. <br />
          <span className="font-serif italic font-medium text-xl leading-9 bg-(--color-beige)">
            Because true luxury knows no categories.
          </span>
        </p>
      </div>

      <div className="w-full flex flex-col gap-18 md:gap-24 mx-auto container text-(--color-text-body)">
        <section className="flex flex-col md:flex-row gap-4 w-full items-center rounded-lg md:shadow-md/5 md:p-4  transition-all duration-100 hover:shadow-lg">
          <div className="flex flex-col gap-6 basis-1/2 p-4">
            <h2 className="font-serif text-3xl text-(--color-darkbrown) font-medium">
              Our Story
            </h2>
            <p className="md:max-w-[65ch] md:text-balance leading-6.5 md:leading-6">
              Born from a late-night conversation between a former Formula 1
              engineer, a fashion visionary, and a butcher who couldn’t find
              chicken worthy of his standards, Geesix was founded in 2026 with
              one absurdly simple idea:
              <br />
              <span className="font-serif italic text-lg font-medium bg-(--color-cream) lg:leading-12">
                "Why should excellence be limited to just one corner of life?"
              </span>{" "}
              <br />
              Today, we bring together the pinnacle of automotive engineering,
              Italian craftsmanship, and farm-to-table purity under one roof.
              <br /> We don’t follow trends -{" "}
              <em>we redefine what luxury can be.</em>
            </p>
          </div>
          <Image
            src="https://picsum.photos/id/24/600/400"
            alt=""
            width={300}
            height={200}
            className="basis-1/2 p-4 w-full"
          ></Image>
        </section>

        <section className="flex flex-col md:flex-row-reverse gap-4 w-full items-center rounded-lg md:shadow-md/5 md:p-4  transition-all duration-100 hover:shadow-lg">
          <div className="flex flex-col gap-6 basis-1/2 p-4">
            <h2 className="font-serif text-3xl text-(--color-darkbrown) font-medium">
              Sustanability
            </h2>
            <p className="md:max-w-[65ch] md:text-balance leading-6.5 md:leading-6">
              We believe true luxury must respect the future. Every supercar we
              offer is paired with carbon-offset programs, our sunglasses and
              bags are crafted from responsibly sourced materials and upcycled
              exotic leathers, and our raw chicken comes exclusively from small,
              regenerative farms where birds live stress-free lives in open
              pastures.
              <br /> <br />
              We don’t just sell products - we invest in a more beautiful and
              responsible world, <em>one flawless detail at a time.</em>
            </p>
          </div>
          <Image
            src="https://picsum.photos/id/18/600/400"
            alt=""
            width={300}
            height={200}
            className="basis-1/2 p-4 w-full"
          ></Image>
        </section>

        <section className="flex flex-col md:flex-row gap-4 w-full items-center rounded-lg md:shadow-md/5 md:p-4  transition-all duration-100 hover:shadow-lg">
          <div className="flex flex-col gap-6 basis-1/2 p-4">
            <h2 className="font-serif text-3xl text-(--color-darkbrown) font-medium">
              Careers
            </h2>
            <p className="md:max-w-[65ch] md:text-balance leading-6.5 md:leading-6">
              We’re always looking for exceptional people who understand that
              perfection is in the details - whether you’re obsessed with torque
              curves, leather stitching, or the perfect pH balance in poultry.
              <br /> <br />
              If you’re driven, slightly unconventional, and passionate about
              delivering unforgettable experiences, we want to hear from you.
              From supercar specialists and luxury retail experts to
              supply-chain virtuosos and content creators who can make raw
              chicken look glamorous - there’s a place for you at Geesix.
            </p>

            <div className="">
              <Link
                href="https://arbetsformedlingen.se/platsbanken/annonser"
                className="font-semibold text-(--color-darkbrown) flex gap-2"
                target="_blank"
              >
                View open positions
                <ExternalLink />
              </Link>
            </div>
          </div>
          <Image
            src="https://picsum.photos/id/5/600/400"
            alt=""
            width={300}
            height={200}
            className="basis-1/2 p-4 w-full"
          ></Image>
        </section>
      </div>
    </div>
  );
}
