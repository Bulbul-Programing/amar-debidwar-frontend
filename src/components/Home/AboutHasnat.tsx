import { CheckCircle } from "lucide-react";
import Image from "next/image";

const AboutHasnat = () => {
    return (
        <section className="bg-background py-5 lg:py-10">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-5 p-5 md:px-10">
                    {/* Left: Image */}
                    <div className="relative flex justify-center">
                        <div className="relative w-full max-w-90 sm:max-w-105 rounded-3xl bg-linear-to-br from-primary/10 to-destructive/10 p-5 sm:p-8 shadow-xl">
                            <Image
                                src="https://res.cloudinary.com/depy0i4bl/image/upload/v1769799688/New_Project_17_ri8wzb.png"
                                alt="Leader Portrait"
                                width={420}
                                height={520}
                                className="h-auto w-full rounded-2xl object-cover border border-border shadow-2xl"
                                priority
                            />

                            {/* Date Badge */}
                            <div className="absolute -bottom-5 right-4 sm:right-6 rounded-xl bg-destructive px-5 py-3 text-center shadow-lg">
                                <p className="text-lg font-bold text-white sm:text-xl">
                                    জুলাই ২৪
                                </p>
                                <p className="text-xs text-white sm:text-sm">
                                    বিপ্লবের সৈনিক
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="text-center lg:text-left">
                        {/* Tag */}
                        <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                            প্রার্থী পরিচিতি
                        </span>

                        {/* Title */}
                        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                            দায়িত্বশীল নেতৃত্ব
                        </h1>

                        {/* Description */}
                        <p className="mt-4 max-w-xl mx-auto text-muted-foreground lg:mx-0">
                            তিনি এমন একজন জনপ্রতিনিধি, যিনি নেতৃত্বকে দেখেন দায়িত্ব হিসেবে—ক্ষমতা
                            হিসেবে নয়। স্বচ্ছতা, জবাবদিহিতা ও বাস্তবভিত্তিক উন্নয়নই তার কাজের মূল
                            ভিত্তি। জনগণের অর্থ ও সুযোগ যেন জনগণের কল্যাণেই ব্যবহৃত হয়—এই বিশ্বাস
                            থেকেই তার পথচলা।
                        </p>

                        {/* Bullet Points */}
                        <ul className="my-6 space-y-3 text-left max-w-xl mx-auto lg:mx-0">
                            {[
                                "ঢাকা বিশ্ববিদ্যালয় থেকে রাষ্ট্রবিজ্ঞানে স্নাতকোত্তর",
                                "জুলাই ২০২৪ গণঅভ্যুত্থানের অন্যতম নায়ক",
                                "জাতীয় নাগরিক পার্টি প্রতিষ্ঠাতা সদস্য",
                                "দুর্নীতি বিরোধী আন্দোলনের অগ্রদূত",
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="mt-1 h-5 w-5 text-primary shrink-0" />
                                    <span className="text-foreground">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHasnat;
