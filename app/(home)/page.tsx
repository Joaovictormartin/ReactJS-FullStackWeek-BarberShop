import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Search from "./_components/search";
import Header from "../_components/header";
import BookingItem from "../_components/booking-item";
import BarberShopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";

export default async function Home() {
  const barbershops = await db.barbershop.findMany();

  return (
    <div className="">
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Miguel</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <BookingItem />
      </div>

      <div className=" mt-6">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

        <div className=" px-5 flex  gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className=" mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>

        <div className=" px-5 flex  gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
