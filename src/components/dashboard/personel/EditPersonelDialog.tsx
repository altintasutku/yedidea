"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import PersonelForm from "../Forms/PersonelForm";
import { Row } from "@tanstack/react-table";
import { Card } from "@/components/ui/card";
import ProjectRelationCard from "./ProjectRelationCard";

const EditPersonelDialog = ({ row }: { row: Row<any> }) => {
  return (
    <DialogContent className="max-w-[80dvw]">
      <DialogHeader>
        <DialogTitle>Personel Kartı</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-x-4 divide-x">
        <PersonelForm action="update" defaultValues={row.original} />

        <ProjectRelationCard />
      </div>
    </DialogContent>
  );
};

export default EditPersonelDialog;

// <div className="grid w-full grid-cols-2 gap-x-2">
// <FormField
//   control={form.control}
//   name="project"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Proje Ata</FormLabel>
//       <FormControl>
//         <Select {...field}>
//           <SelectTrigger>
//             <SelectValue placeholder="Proje" />
//           </SelectTrigger>
//           <SelectContent>
//             {projects.map((project) => (
//               <SelectItem key={project.id} value={project.id}>
//                 {project.projectName}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </FormControl>
//       <FormDescription>Personelin atandığı proje</FormDescription>
//     </FormItem>
//   )}
// />
// <FormField
//   control={form.control}
//   name="price"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Ücret</FormLabel>
//       <FormControl>
//         <Input {...field} type="number" />
//       </FormControl>
//       <FormDescription>Personelin ücreti.</FormDescription>
//       <FormMessage />
//     </FormItem>
//   )}
// />
// </div>
