"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Search } from "lucide-react";
import { debounce } from "@/app/lib/utils";

export default function SearchInput({ defaultQuery }: { defaultQuery: string }) {
    const [query, setQuery] = useState(defaultQuery);
    const router = useRouter();

    const debouncedGetAllowedAmts = debounce((query) => {
        router.push(`?query=${query}`, { scroll: false });
    }, 1000);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        debouncedGetAllowedAmts(newQuery);
       
    };

    return (
        <div className="flex-grow flex">
            <Input
                id="search"
                type="text"
                name="query"
                placeholder="Search by name, type, or service"
                value={query}
                onChange={handleSearch} 
                className="flex-grow bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <Button type="button" className="ml-2 bg-blue-700 hover:bg-blue-800 text-white">
                <Search className="h-4 w-4" />
            </Button>
        </div>
    );
}
