import { ReactNode } from "react";
import Link from "next/link";;

interface ActionCardProps {
    href: string;
    title: string;
    description: string;
    icon: ReactNode;
    variant: "orange" | "blue" | "green";
    fullWidth?: boolean;
    onClick?: () => void;
}

export default function ActionCard({
    href,
    title,
    description,
    icon,
    variant,
    fullWidth = false,
    onClick
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
        <>
        {onClick ? (
            <button
            onClick={onClick}
            className={`
                group
                ${fullWidth ? "col-span-2" : ""}
                ${variants[variant].background}
                flex
                min-h-28
                flex-col
                items-center
                justify-center
                rounded-2xl
                px-7
                py-5
                text-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                md:flex-row
                md:items-center
                md:justify-between
                md:gap-2
            `}
            >
            {/* TEXTOS */}
            <div className="text-center md:text-left">
                <h3 className="text-xl font-bold">
                {title}
                </h3>

                <p className="mt-1 text-sm opacity-90">
                {description}
                </p>
            </div>

            {/* ÍCONE */}
            <div
                className={`
                mt-4
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/90
                md:mt-0
                ${variants[variant].icon}
                `}
            >
                {icon}
            </div>
            </button>
        ) : (
            <Link
            href={href}
            className={`
                group
                ${fullWidth ? "col-span-2" : ""}
                ${variants[variant].background}
                flex
                min-h-28
                flex-col
                items-center
                justify-center
                rounded-2xl
                px-7
                py-5
                text-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                md:flex-row
                md:items-center
                md:justify-between
            `}
            >
            {/* TEXTOS */}
            <div className="text-center md:text-left">
                <h3 className="text-xl font-bold">
                {title}
                </h3>

                <p className="mt-1 text-sm opacity-90">
                {description}
                </p>
            </div>

            {/* ÍCONE */}
            <div
                className={`
                mt-4
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/90
                md:mt-0
                ${variants[variant].icon}
                `}
            >
                {icon}
            </div>
            </Link>
        )}
        </>
    );
}