"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Save, Loader2, Camera } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { TUser } from "@/types/User/TUserInfo";
import { updateMyProfile } from "@/service/Auth/updateUser";
import { Label } from "recharts";

interface MyProfileProps {
    userInfo: TUser;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const profilePhoto = userInfo?.profilePhoto || null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await updateMyProfile(formData);

            if (result.success) {
                toast.success(result.message)
                setSuccess(result.message);
                setPreviewImage(null);
                router.refresh();
            } else {
                setError(result.message);
            }
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your personal information
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">

                    {/* ============= PROFILE PICTURE CARD ============= */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                        </CardHeader>

                        <CardContent className="flex flex-col items-center">
                            <div className="relative">
                                <div>
                                    {/* If preview or existing photo */}
                                    {previewImage || profilePhoto ? (
                                        <Image
                                            className="border w-20 h-20 rounded-full"
                                            src={previewImage || profilePhoto!}
                                            width={80}
                                            height={80}
                                            alt="Profile pic"
                                        />
                                    ) : (
                                    <Avatar>
                                        <AvatarFallback className="text-3xl p-6">
                                            {getInitials(userInfo?.name || 'B')}
                                        </AvatarFallback>
                                    </Avatar>

                                    )}
                                </div>

                                <label
                                    htmlFor="file"
                                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition"
                                >
                                    <Camera className="h-4 w-4" />
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        disabled={isPending}
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>

                            <div className="text-center">
                                <p className="font-semibold text-lg">{userInfo?.name}</p>
                                <p className="text-sm text-muted-foreground">{userInfo?.email}</p>
                                <p className="text-xs mt-1 capitalize text-muted-foreground">
                                    {userInfo?.role}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ============= PROFILE INFO CARD ============= */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {error && (
                                <div className="bg-red-100 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md text-sm">
                                    {success}
                                </div>
                            )}

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        name="name"
                                        defaultValue={userInfo?.name}
                                        disabled={isPending}
                                        required
                                    />
                                </div>

                                {/* Email (readonly) */}
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        value={userInfo?.email}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label>Phone</Label>
                                    <Input
                                        name="phone"
                                        defaultValue={userInfo?.phone}
                                        disabled={isPending}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4 mt-4">
                                <Button type="submit" className="text-white" disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
