import AddToCartButton from "@/components/AddToCartButton";
import prisma from "@/lib/db/prisma";
import { incrementProductQuantity } from "@/services/serverActions";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound(); // Redirect to not found page if product not found
    return product;
});

export async function generateMetadata({
    params: { id },
}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);

    return {
        title: product.name + "- Spooky Paws",
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl }],
        },
    };
}

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await getProduct(id);

    return (
        <div className="flex max-w-6xl flex-col gap-10 lg:flex-row">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="rounded"
                priority
            />

            <div className="flex flex-col">
                <h1 className="my-6 self-center text-5xl font-bold">
                    {product.name}
                </h1>
                <AddToCartButton
                    productId={product.id}
                    price={product.price}
                    isPrimaryColor={true}
                    incrementProductQuantity={incrementProductQuantity}
                />
                <p className="my-6">{product.description}</p>
            </div>
        </div>
    );
}
