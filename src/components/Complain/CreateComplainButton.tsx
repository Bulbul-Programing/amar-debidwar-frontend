"use client"
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { TComplaintCategory } from '@/types/dashboard/MP/ComplainCategory/complainCategory';
import ComplainCreateDialog from './ComplainCreateDialog';

const CreateComplainButton = ({ complainCategory }: { complainCategory: TComplaintCategory[] }) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        setIsDialogOpen(false)
        startTransition(() => {
            router.refresh();
            router.push('/')
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div>
            <Button onClick={() => handleOpenDialog()} className="rounded-xl cursor-pointer gap-2 shadow-md">
                <Plus className="h-4 w-4" />
                নতুন অভিযোগ
            </Button>
            <ComplainCreateDialog
                complainCategory={complainCategory}
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default CreateComplainButton;