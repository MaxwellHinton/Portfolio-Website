import { notFound } from "next/navigation";

export default function ReviewDetail({
    params,
}: {
    params: {
        productID: string,
        reviewID: string;
    };
}) {
    if (parseInt(params.reviewID) > 1000) {
        notFound();
    }
    return (
        <h1>Review: {params.reviewID} for product: {params.productID}</h1>
    );
}