"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { addPersonelToProject } from "@/app/actions/project";
import { Row } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProjectSelect } from "@/lib/schema/project";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Loader2Icon } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/components/Providers";

const formSchema = z.object({
  projectId: z.string(),
  personelId: z.string(),
  personelPrice: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

const AddProject = ({ row }: { row: Row<any> }) => {
  const [state, formAction] = useFormState(addPersonelToProject, {
    message: "",
    status: "idle",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personelId: row.original.id,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    formAction(values);
    form.setValue("projectId", "");
    setProjectSearchValue("");
    form.setValue("personelPrice", "");
    form.setValue("startDate", new Date());
    form.setValue("endDate", new Date());
  }

  useEffect(() => {
    if (state.status === "success") {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["personelHistory"],
      });
    }
  }, [state]);

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axios.get("/api/project");
      return data as ProjectSelect[];
    },
    staleTime: 0,
  });

  const [projectSearchOpen, setProjectSearchOpen] = React.useState(false);
  const [projectSearchValue, setProjectSearchValue] = React.useState("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proje</FormLabel>
              <FormControl>
                <Command className="overflow-visible bg-transparent">
                  <div className="group flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <CommandPrimitive.Input
                      value={projectSearchValue}
                      onValueChange={setProjectSearchValue}
                      onFocus={() => setProjectSearchOpen(true)}
                      onBlur={() => setProjectSearchOpen(false)}
                      className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="relative">
                    <CommandList>
                      {isProjectsLoading ? (
                        <Loader2Icon className="animate-spin" />
                      ) : projectSearchOpen ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {projects &&
                              projects.map((project) => {
                                return (
                                  <CommandItem
                                    key={project.id}
                                    className={"cursor-pointer"}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onSelect={() => {
                                      form.setValue("projectId", project.id);
                                      setProjectSearchOpen(false);
                                      setProjectSearchValue(
                                        project.projectName,
                                      );
                                    }}
                                  >
                                    {project.projectName}
                                  </CommandItem>
                                );
                              })}
                          </CommandGroup>
                        </div>
                      ) : null}
                    </CommandList>
                  </div>
                </Command>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personelPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personel Fiyatı</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Başlangıç Tarihi</FormLabel>
              <FormControl>
                <DatePicker
                  setDate={(date) =>
                    form.setValue("startDate", date ?? new Date())
                  }
                  date={form.getValues("startDate")}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bitiş Tarihi</FormLabel>
              <FormControl>
                <DatePicker
                  setDate={(date) =>
                    form.setValue("endDate", date ?? new Date())
                  }
                  date={form.getValues("endDate")}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="my-2">
          {state.status === "loading" ? "Yükleniyor..." : "Proje Ekle"}
        </Button>
      </form>
    </Form>
  );
};

export default AddProject;
