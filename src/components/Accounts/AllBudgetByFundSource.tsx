'use client'
import { TFundSource } from '@/types/dashboard/MP/Fund/FundTypes';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { FieldLabel } from '../ui/field';
import { useRouter } from 'next/navigation';
import RefreshButton from '../Shared/RefreshButton';

const AllBudgetByFundSource = ({ fundSource }: { fundSource: TFundSource[] }) => {
    const router = useRouter()
    const [selectedFundSource, setSelectFundSource] = useState<TFundSource | null>(null);
    const [openFundSource, setOpenFundSource] = useState(false);

    useEffect(() => {
        if (selectedFundSource) {
            router.push(`?fundSource=${selectedFundSource.id}`)
        }
        else {

        }
    }, [router, selectedFundSource])

    return (
        <div>
            <FieldLabel className="font-medium my-1">ফান্ড সোর্স খুজুন</FieldLabel>
            <div className='flex flex-wrap md:flex-nowrap gap-3 items-center'>
                <Popover open={openFundSource} onOpenChange={setOpenFundSource}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedFundSource?.name ?? "ফান্ড সোর্স চিহ্নিত করুন"}
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="ফান্ড সোর্স খুজুন..." />
                            <CommandEmpty>No Fund Source found</CommandEmpty>
                            <CommandGroup>
                                {fundSource.map((fundSource: TFundSource) => (
                                    <CommandItem
                                        key={fundSource.id}
                                        value={fundSource.name}
                                        onSelect={() => {
                                            setSelectFundSource(fundSource);
                                            setOpenFundSource(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedFundSource?.id === fundSource.id
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                        {fundSource.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <RefreshButton text='রিফ্রেশ' />
            </div>
        </div>
    );
};

export default AllBudgetByFundSource;