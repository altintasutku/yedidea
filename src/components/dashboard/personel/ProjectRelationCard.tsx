"use client";
import { projectTable } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSelectModel } from "drizzle-orm";
import React from "react";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Loader2Icon } from "lucide-react";

const ProjectRelationCard = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["personels"],
    queryFn: async () => {
      const response = await axios.get("/api/project");
      return response.data as InferSelectModel<typeof projectTable>[];
    },
  });
  return (
    <div className="flex items-center justify-center">
      <Command className="overflow-visible bg-transparent">
        <div className="group flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <CommandPrimitive.Input
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
              <div className="absolute top-0 z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
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
                            setSearchValue(project.projectName);
                            console.log("onselects");
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
    </div>
  );
};

export default ProjectRelationCard;
