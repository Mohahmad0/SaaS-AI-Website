"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface MobileSidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const MobileSidebar = ({
    apiLimitCount = 0,
    isPro = false,
}: MobileSidebarProps) => {
    
    // below solves the hydration error when page is refreshed multiple times
    const[isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted){
        return null;
    }

    // implements sheet style from shadcn ui so you are able to open and close the sidebar
    // on mobile devices 
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            </SheetContent>
        </Sheet>
    );
}
 
export default MobileSidebar;