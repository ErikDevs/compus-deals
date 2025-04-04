"use client";

import { SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { listings } from "@/constants";

const AllListing = () => {
  const [page, setPage] = useState(1);
  const totalPages = 5; // Placeholder for total pages

  const handlePageChange = (newPage: SetStateAction<number>) => {
    if (typeof newPage === "number" && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div>
      <ul className="flex items-center gap-4">
        <li>
          <h1 className="text-2xl font-bold my-8">Latest Listings</h1>
        </li>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select campus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">UON</SelectItem>
            <SelectItem value="dark">MKU</SelectItem>
            <SelectItem value="system">KU</SelectItem>
          </SelectContent>
        </Select>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={listing.image}
                alt="product-image"
                width={1000}
                height={1000}
              />
              <p className="text-sm text-gray-500">{listing.location}</p>
              <p className="font-semibold">{listing.price}</p>
              <p>{listing.description}</p>
              <p>{listing.status[0]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={
                pageNumber === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }
            >
              {pageNumber}
            </Button>
          )
        )}
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default AllListing;
