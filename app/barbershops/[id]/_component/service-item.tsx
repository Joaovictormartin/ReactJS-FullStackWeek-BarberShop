"use client";

import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { Barbershop, Service } from "@prisma/client";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/app/_components/ui/sheet";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { generateDayTimeList } from "@/app/barbershops/[id]/_helpes/hours";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated?: boolean;
}

const ServiceItem = ({
  service,
  barbershop,
  isAuthenticated,
}: ServiceItemProps) => {
  const [hours, setHours] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    } else {
    }
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHours(undefined);
  };
  const handleHoursClick = (time: string) => setHours(time);

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  return (
    <Card>
      <CardContent className="w-full p-3">
        <div className="flex items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              fill
              alt={service.name}
              src={service.imageUrl}
              className="rounded-lg object-contain"
            />
          </div>

          <div className="flex w-full flex-col">
            <div className="font-bold">{service.name}</div>
            <div className="text-sm text-gray-400">{service.description}</div>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet>
                <SheetTrigger>
                  <Button variant={"secondary"} onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-start">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="py-6">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date}
                      fromDate={new Date()}
                      onSelect={handleDateClick}
                      styles={{
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        caption: { textTransform: "capitalize" },
                        nav_button_next: { width: "32px", height: "32px" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex w-full gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-6 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          className="rounded-full"
                          onClick={() => handleHoursClick(time)}
                          variant={time === hours ? "default" : "outline"}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="bot border-t border-solid border-secondary px-5 py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="text-sm font-bold">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm text-gray-400">Data</h3>
                            <h4 className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}

                        {hours && (
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <h4 className="text-sm">{hours}</h4>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <h4 className="text-sm">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button disabled={!date || !hours}>
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
