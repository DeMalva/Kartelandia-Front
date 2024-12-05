import { Container } from "semantic-ui-react";
import { size } from "lodash";
import { BasicLayout } from "@/layouts";
import {
  GridPosters,
  Separator,
  NoResult,
  Pagination,
  Seo,
} from "@/components/Shared";

export default function CategoryPage(props) {
  const { posters, category, pagination } = props;
  const hasProducts = size(posters) > 0;

  // console.log(pagination);

  return (
    <>
      <Seo title={`Posters de ${category.name}`} />

      <BasicLayout relative>
        <Container>
          <Separator height={50} />

          <h2>{category.name}</h2>

          {hasProducts ? (
            <>
              <GridPosters posters={posters} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult
              text={`La categoria ${category.name} aun no tiene productos`}
            />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
