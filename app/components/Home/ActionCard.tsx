import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ActionCardProps {
    href: string;
    title: string;
    description: string;
    icon: ReactNode;
    variant: "orange" | "blue" | "green";
    fullWidth?: boolean;
}

export default function ActionCard({
    href,
    title,
    description,
    icon,
    variant,
    fullWidth = false,
}: ActionCardProps) {

    const variants = {
        orange: {
            background: "bg-orangeMain",
            icon: "text-orangeMain",
        },
        blue: {
            background: "bg-blueMain",
            icon: "text-blueMain",
        },
        green: {
            background: "bg-greenMain",
            icon: "text-greenMain",
        },
    };

    return (
        <Link
            href={href}
            className={`
                group
                ${fullWidth ? "col-span-2" : ""}
                ${variants[variant].background}
                flex
                min-h-28
                items-center
                justify-between
                rounded-2xl
                px-7
                py-5
                text-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            `}
        >
            <div className="flex items-center gap-5">

                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/90 ${variants[variant].icon}`}>
                    {icon}
                </div>

                <div>
                    <h3 className="text-xl font-bold">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm opacity-90">
                        {description}
                    </p>
                </div>

            </div>

            <ArrowRight
                size={28}
                className="transition-transform duration-300 group-hover:translate-x-1"
            />
        </Link>
    );
}