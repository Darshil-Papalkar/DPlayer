import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex w-screen h-screen flex-col flex-nowrap justify-center items-center gap-2">
            <h2 className="text-5xl mb-4">Not Found</h2>
            <p className="text-3xl">Could not find requested resource</p>
            <Link className="underline text-2xl" href="/dashboard">Return Home</Link>
        </div>
    );
};

export default NotFound;