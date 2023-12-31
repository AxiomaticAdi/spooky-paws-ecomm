import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import Image from "next/image";
// import logo from "@/assets/spooky_paws.png";

export default async function NavBar() {
    const session = await getServerSession(authOptions);
    const currentCart = await getCart();

    return (
        <div className="navbar box-border flex max-w-7xl justify-between gap-5 bg-primary sm:flex-row">
            <Link href={"/"} className="btn btn-ghost">
                <span className="primary-text text-white">TEMP LOGO</span>
                {/* <Image
                            src={logo}
                            alt={"Spooky Paws Logo"}
                            height={100}
                            className="object-scale-down"
                        /> */}
            </Link>

            <div className="flex">
                <UserMenuButton session={session} />
                <ShoppingCartButton cart={currentCart} />
            </div>
        </div>
    );
}
