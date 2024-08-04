"use client";

import React, { useEffect } from "react";
import * as z from "zod";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { createPersonel, updatePersonel } from "@/app/actions/personel";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import defaultPp from "@/lib/data/default-pp.png";
import cities from "@/lib/data/cities";
import district from "@/lib/data/district";

export const personelFormSchema = z.object({
  name: z.string(),
  sector: z.string(),
  age: z.number().optional(),
  files: z.any(),
  gender: z.string(),
  phone: z.string(),
  photo: z.any(),
  city: z.string(),
  district: z.string(),
});

export type PersonelForm = z.infer<typeof personelFormSchema>;

type Props = Readonly<{
  defaultValues?: Partial<PersonelForm>;
  action?: "create" | "update";
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

const PersonelForm = ({ defaultValues, action = "create", setOpen }: Props) => {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(
    action === "create" ? createPersonel : updatePersonel,
    {
      message: "",
      status: "idle",
    },
  );

  const [profilePhoto, setProfilePhoto] = React.useState<File>();
  const ppInputRef = React.useRef<HTMLInputElement>(null);
  const [cityId, setCityId] = React.useState<string | undefined>();
  const filteredDistrict = React.useMemo(
    () => district.filter((d) => d.il_id === cityId),
    [cityId],
  );

  const form = useForm<PersonelForm>({
    mode: "onBlur",
    resolver: zodResolver(personelFormSchema),
    defaultValues: {
      ...defaultValues,
      files: undefined,
      photo: undefined,
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      form.reset();
      if (setOpen) {
        setOpen(false);
      }
    }
  }, [state]);

  return (
    <Form {...form}>
      <ScrollArea className="h-[85dvh]">
        <form
          action={(e) => {
            //@ts-ignore
            if (defaultValues && defaultValues.id) {
              //@ts-ignore
              e.append("id", defaultValues.id);
            }

            formAction(e);
          }}
          className="space-y-4 p-4"
        >
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Profile Fotoğrafı</FormLabel>
                <Image
                  src={
                    action === "update"
                      ? defaultValues?.photo
                      : profilePhoto
                        ? URL.createObjectURL(profilePhoto)
                        : defaultPp
                  }
                  alt={"Profile Photo"}
                  width={150}
                  height={150}
                  className="aspect-square cursor-pointer rounded-full object-cover"
                  onClick={() => {
                    ppInputRef.current?.click();
                  }}
                />
                <FormControl>
                  <Input
                    {...field}
                    ref={ppInputRef}
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setProfilePhoto(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Fotoğraf yüklemek için basınız.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İsim</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Personelin ismi.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cinsiyet</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Cinsiyet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Erkek">Erkek</SelectItem>
                      <SelectItem value="Kadın">Kadın</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Personelin cinsiyeti.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormDescription>
                  Enter a valid phone number with country
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yaş</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) =>
                      form.setValue(
                        "age",
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>Personelin yaşı.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şehir</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      form.setValue("city", value);
                      setCityId(cities.find((city) => city.name === value)?.id);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Şehir" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.name}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Personelin yaşadığı şehir.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İlçe</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="İlçe" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredDistrict.map((district) => (
                        <SelectItem key={district.id} value={district.name}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Personelin yaşadığı ilçe.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sektör</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Personelin çalıştığı sektör.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosya</FormLabel>
                <FormControl>
                  <Input {...field} type="file" />
                </FormControl>
                <FormDescription>Personelin dosyası.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2Icon className="animate-spin" />
            ) : action === "create" ? (
              "Oluştur"
            ) : (
              "Güncelle"
            )}
          </Button>
        </form>
      </ScrollArea>
    </Form>
  );
};

export default PersonelForm;
