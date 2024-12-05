import { BasicLayout } from "@/layouts";
import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { size } from "lodash";
import {
  GridGames,
  GridPosters,
  NoResult,
  Pagination,
  Separator,
} from "@/components/Shared";

export default function SearchPage(props) {
  const { posters, pagination, searchText } = props;
  const hasResult = size(posters) > 0;

  useEffect(() => {
    document.getElementById("search-poster").focus();
  }, []);

  return (
    <>
      <BasicLayout relative isOpenSearch>
        <Container>
          <Separator height={50} />

          <h2>Buscando: {searchText}</h2>
          {hasResult ? (
            <>
              <GridPosters posters={posters} />
              <Separator height={30} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pageCount}
              />
            </>
          ) : (
            <NoResult text="No se han encontrado resultados" />
          )}

          <Separator height={100} />
        </Container>
      </BasicLayout>
    </>
  );
}
