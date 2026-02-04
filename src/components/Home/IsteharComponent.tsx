
import { istehar } from "@/service/istehar/istehar";
import { CheckCircle } from "lucide-react";

const IsteharComponent = () => {
    return (
        <section className="bg-background md:px-10 py-5">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                        আমাদের প্রতিশ্রুতি
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        দেশের উন্নয়ন ও জনগণের কল্যাণের জন্য আমাদের মূল উদ্দেশ্যসমূহ। প্রতিটি
                        প্রতিশ্রুতি বাস্তবায়নযোগ্য এবং জনগণের জীবনের মান উন্নয়নে নিবেদিত।
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {istehar.map((item, index) => (
                        <div
                            key={index}
                            className="bg-linear-to-br from-white/80 to-gray-100 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Icon and Title */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-primary/10 rounded-full flex items-center justify-center">
                                    <CheckCircle className="text-primary h-6 w-6 animate-pulse" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground mt-2 flex-1 text-sm sm:text-base leading-relaxed">
                                {item.description}
                            </p>

                            {/* Optional: Call-to-action or tag */}
                            <div className="mt-4">
                                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                    Featured
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default IsteharComponent;
