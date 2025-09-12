import { BrandDetail } from "@/components/brands/brand.detail";
import { EmptyUI } from "@/components/states/empty.ui";
import { ErrorUI } from "@/components/states/error.ui";
import { LoadingUI } from "@/components/states/loading.ui";
import { errorParser } from "@/lib/error-parser";
import { brandByIdQueryOptions } from "@/services/brands/queries";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router";

export default function BrandDetailPage() {
  const id = useParams().id;
  const { data, error, isLoading } = useQuery(
    brandByIdQueryOptions({
      id: Number(id),
    }),
  );

  if (isLoading) {
    return <LoadingUI />;
  }
  if (error) {
    const errMessage = errorParser(error, { log: true });
    return <ErrorUI message={errMessage} />;
  }
  if (!data) {
    return <EmptyUI />;
  }

  return (
    <section className="app-container flex flex-1 flex-col gap-4 py-8">
      <Link
        to="/brands"
        className="group flex items-center gap-2"
      >
        <ArrowLeftIcon className="transition-all group-hover:-translate-x-1" />{" "}
        <span className="transition-all group-hover:underline">
          Back to Brands
        </span>
      </Link>

      <BrandDetail brand={data} />
    </section>
  );
}
