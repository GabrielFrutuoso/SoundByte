import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  setPage,
}: PaginationProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          if (currentPage === 1) return;
          setPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        title="Voltar"
        variant={"outline"}
      >
        <ChevronLeft className="cursor-pointer" />
      </Button>
      <span>{currentPage}</span>
      <Separator orientation="vertical" />
      <span className="cursor-default text-muted-foreground">{totalPages}</span>
      <Button
        onClick={() => {
          if (currentPage === totalPages) return;
          setPage(currentPage + 1);
        }}
        title="Próximo"
        variant={"outline"}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="cursor-pointer" />
      </Button>
    </div>
  );
};
