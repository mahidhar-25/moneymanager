"use client";
import StickyHeadTable from "@/components/utils/common/stickyHeaderTable";
import InputField from "@/components/utils/form/input";
import { useState } from "react";
export default function lenderManager() {
    const [searchInput, setSearchInput] = useState("");
    return (
        <div>
            <div className="flex flex-row mb-2">
                <div className="w-1/4">
                    <InputField
                        className="ms-3 "
                        id="search_lender"
                        name="search"
                        type="search"
                        autoComplete="search"
                        placeholder="enter name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <StickyHeadTable />
            </div>
        </div>
    );
}
