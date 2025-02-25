"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { quickSearchOptions } from "@/_constants/search";
import { Form, FormItem, FormField, FormControl } from "@/_components/ui/form";

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>;
}

const formSchema = z.object({
  search: z.string().trim().min(1),
});

const Search = ({ defaultValues }: SearchProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/barbershops?search=${values.search.toLowerCase()}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full items-center gap-2"
        >
          <FormField
            name="search"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busque por uma barbearia" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>

      <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button
            asChild
            className="gap-2"
            key={option.title}
            variant="secondary"
          >
            <Link href={`/barbershops?service=${option.title.toLowerCase()}`}>
              <Image
                width={16}
                height={16}
                alt={option.title}
                src={option.imageUrl}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Search;
