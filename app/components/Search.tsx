"use client";

import { ChangeEvent, FC } from "react";
import { searchTask } from "@/app/actions";

const Search: FC = () => {
  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="max-w-xl mx-auto w-full">
        <form action={searchTask} className="my-4">
          <input
            name="searchText"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              event.target.form?.requestSubmit();
            }}
            placeholder="Type something..."
            className="w-full mx-auto p-2 rounded-md bg-gray-800 border border-gray-700 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Search;