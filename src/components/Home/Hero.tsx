import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section className="relative w-full h-full md:h-100 lg:h-[80vh] overflow-hidden bg-black">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source
                    src="https://res.cloudinary.com/depy0i4bl/video/upload/v1769784813/311772_small_cxflco.mp4"
                    type="video/mp4"
                />
            </video>

            <div className="relative z-10 w-full h-full flex items-center">
                <div className="w-full max-w-7xl mx-auto py-5 md:px-10 lg:px-20">
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">

                        {/* TEXT */}
                        <div className="text-white space-y-3 text-center md:text-left max-w-xl">

                            <div className=" bg-red-600 border border-background/50 px-3 py-1 rounded text-xs lg:text-sm font-semibold">
                                🗳️ জাতীয় সংসদ নির্বাচন ২০২৬ • কুমিল্লা-৪ (দেবিদ্বার)
                            </div>

                            <p className="text-sm md:text-sm lg:text-base text-gray-200 leading-snug">
                                একটি উন্নত, সমৃদ্ধ ও ন্যায়বিচারপূর্ণ বাংলাদেশ গড়ার প্রত্যয়ে
                            </p>

                            <h1 className="text-3xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                                হাসানাত আবদুল্লাহকে
                            </h1>

                            <div className="bg-[#043d2e] rounded-lg inline-block px-4 py-2 border border-white/10">
                                <h2 className="text-xl md:text-2xl font-bold text-red-500">
                                    শাপলা কলি মার্কায় ভোট দিন
                                </h2>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="/about"
                                    className="inline-block  rounded-md bg-white text-green-900 px-6 py-2.5 font-bold text-sm hover:bg-gray-100 transition"
                                >
                                    বিস্তারিত
                                </Link>
                            </div>
                        </div>

                        {/* IMAGE */}
                        <div className="relative shrink-0">
                            <div className="w-60 h-60 md:w-72 md:h-72 lg:w-100 lg:h-100 overflow-hidden rounded-full border-4 border-background/50 shadow-2xl">
                                <Image
                                    src="https://res.cloudinary.com/depy0i4bl/image/upload/v1769799688/New_Project_17_ri8wzb.png"
                                    alt="Hasnat Abdullah"
                                    className=" object-cover"
                                    width={600}
                                    height={600}
                                />
                            </div>

                            {/* BADGE */}
                            <div className=" absolute left-1/2 -translate-x-1/2 -bottom-5 bg-[#043d2e] p-2 rounded-full border border-white/20 shadow-xl">
                                <div className='flex items-center'>
                                    <div className="bg-white p-2 rounded-full w-12 md:w-14 lg:w-16">
                                        <Image
                                            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1769801595/New_Project_19_ter52s.png"
                                            alt="Symbol"
                                            className='w-full h-full'
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className="bg-red-600 text-white px-5 py-2 rounded-full font-bold ml-2 text-sm whitespace-nowrap">
                                        শাপলা কলি প্রতীক
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </section>
    );
};

export default Hero;

{/* <div className="relative z-10 h-full flex items-center">
    <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">

            <div className="w-full md:w-2/3 border-2 text-white space-y-3">
                <div className="inline-flex items-center bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                    🗳️ জাতীয় সংসদ নির্বাচন ২০২৬ • কুমিল্লা-৪ (দেবিদ্বার)
                </div>

                <p className="text-sm md:text-base text-gray-200 max-w-xl leading-snug">
                    একটি উন্নত, সমৃদ্ধ ও ন্যায়বিচারপূর্ণ বাংলাদেশ গড়ার প্রত্যয়ে
                </p>

                <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
                    হাসানাত আবদুল্লাহকে
                </h1>

                <div className="bg-[#043d2e] inline-block px-4 py-2 border border-white/10">
                    <h2 className="text-xl md:text-2xl font-bold text-red-500">
                        শাপলা কলি মার্কায় ভোট দিন
                    </h2>
                </div>

                <div className="pt-2">
                    <Link href="/about" className="bg-white text-green-900 px-6 py-2.5 font-bold text-sm hover:bg-gray-100 transition">
                        বিস্তারিত
                    </Link>
                </div>
            </div>

            <div className='w-full md:w-1/3 border-2'>
                <div className='relative '>
                    <div className=" md:w-70 lg:w-100 md:h-70 lg:h-100 mx-auto overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                        <Image
                            src="https://res.cloudinary.com/depy0i4bl/image/upload/v1769799688/New_Project_17_ri8wzb.png" // Replace with your actual image path
                            alt="Hasnat Abdullah"
                            className="w-full object-cover"
                            height={500}
                            width={600}
                        />
                    </div>
                    <div className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 -bottom-10 flex items-center bg-[#043d2e] p-2 rounded-full border border-white/20 shadow-xl">
                        <div className="bg-white p-2 rounded-full w-20 h-16 flex items-center justify-center">
                            <Image className='w-60 h-full' width={500} height={500} src="https://res.cloudinary.com/depy0i4bl/image/upload/v1769801595/New_Project_19_ter52s.png" alt="Symbol" />
                        </div>
                        <div className="bg-red-600 w-48 text-white px-6 py-2 rounded-full font-bold ml-2">
                            শাপলা কলি প্রতীক
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}