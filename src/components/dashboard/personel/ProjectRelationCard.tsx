"use client";

import { ProjectInsert, ProjectSelect, projectTable } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSelectModel } from "drizzle-orm";
import React, { useEffect } from "react";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createProjectPersonel } from "@/app/actions/projectPersonel";
import { useFormState } from "react-dom";
import HistoryTable from "./HistoryTable";

type Props = Readonly<{
  personelId: string;
}>;

const ProjectRelationCard = ({ personelId }: Props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<ProjectSelect>();
  const [personelPrice, setPersonelPrice] = React.useState<number>(0);

  const [state, formAction] = useFormState(createProjectPersonel, {
    message: "",
    status: "idle",
  });
  useEffect(() => {
    if (state.status === "success") {
      setSelectedProject(undefined);
      setSearchValue("");
      setPersonelPrice(0);
    }
  }, [state.status]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get("/api/project");
      return response.data as InferSelectModel<typeof projectTable>[];
    },
  });

  return (
    <div className="p-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedProject) return;

          formAction({
            projectName: selectedProject.projectName,
            projectPrice: selectedProject.amount.toString(),
            personelPrice: personelPrice.toString(),
            personelId: personelId,
            projectId: selectedProject.id,
          });
        }}
      >
        <Label>Proje Ata</Label>
        <div className="grid grid-cols-2 gap-x-2">
          <Command className="overflow-visible bg-transparent">
            <div className="group flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <CommandPrimitive.Input
                name="project"
                value={searchValue}
                onValueChange={(value) => {
                  setSearchValue(value);
                  setIsValid(false);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="relative">
              <CommandList>
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : searchOpen ? (
                  <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                    <CommandGroup className="h-full overflow-auto">
                      {data &&
                        data.map((project) => {
                          return (
                            <CommandItem
                              key={project.id}
                              className={"cursor-pointer"}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onSelect={() => {
                                setSelectedProject(project);
                                setSearchValue(project.projectName);
                                setIsValid(true);
                                setSearchOpen(false);
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
          <Input
            onChange={(e) => {
              setPersonelPrice(parseInt(e.target.value));
            }}
            value={personelPrice}
            name="price"
            placeholder="Ücret"
            type="number"
          />
        </div>
        <Button type="submit">
          {state.status === "success" ? "Eklendi!" : "Ekle"}
        </Button>
      </form>
      <div className="mt-5">
        <HistoryTable personelId={personelId} />
      </div>
    </div>
  );
};

export default ProjectRelationCard;
