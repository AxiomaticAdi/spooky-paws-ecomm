import Link from "next/link";
import Image from "next/image";
import ShoppingCartButton from "./ShoppingCartButton";
import logo from "../assets/spooky-paws-2.png";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function NavBar() {
    const session = await getServerSession(authOptions);
    const currentCart = await getCart();

    return (
        <div className="h-28 bg-primary">
            <div className="navbar m-auto flex max-w-7xl flex-col gap-5 sm:flex-row">
                <div className="flex-1 justify-between">
                    <Link href={"/"} className="btn btn-ghost h-24">
                        <Image
                            src={logo}
                            alt={"Spooky Paws Logo"}
                            height={100}
                        />
                    </Link>
                    <UserMenuButton session={session} />
                    <ShoppingCartButton cart={currentCart} />
                </div>
            </div>
        </div>
    );
}
