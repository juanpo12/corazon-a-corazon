"use client";
interface Presenter {
  id: number;
  name: string;
  description: string;
  image: string;
}

const presenters: Presenter[] = [
  {
    id: 2,
    name: "Felipe Bunster",
    description:
      "Pastor de la iglesia centro cristiano internacional, en Santiago de Chile",
    image: "/eddie.png",
  },
  {
    id: 1,
    name: "Jael Ojuel",
    description:
      "Pastora en el ministerio Centro Cristiano amor y vida.",
    image: "/jael.png",
  },
  {
    id: 4,
    name: "Juan crudo",
    description:
      "Apóstol de nuestro ministerio y pastor de la iglesia Cristo la solución, en Flores, Argentina.",
    image: "/apostol.png",
  },
  {
    id: 3,
    name: "Sergio Belart",
    description:
      "Pastor de la iglesia Cita con la vida, en la ciudad de Córdoba, Argentina. ",
    image: "/p sergio.png",
  },
  {
    id: 5,
    name: "Eddie Nunes",
    description: "Pastor de la iglesia Zion, en Lisboa, Portugal.",
    image: "/bunster.png",
  },
];

export default function Presenters() {
  return (
    <section className="w-full bg-black bg-veins px-4 py-16 sm:py-20 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-center mb-4 text-rose-500">
          Nuestros Presentadores
        </h2>
        <p className="text-center text-gray-400 mb-12 sm:mb-16 text-sm sm:text-base">
          Conoce a los creadores y pensadores que harán este evento especial
        </p>

        {/* Presenters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {presenters.map((presenter) => (
            <div
              key={presenter.id}
              className="flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={presenter.image || "/placeholder.svg"}
                  alt={presenter.name}
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Name */}
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                {presenter.name}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {presenter.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
