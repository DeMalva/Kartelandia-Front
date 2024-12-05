import { Poster } from "@/api";
import { useState, useEffect } from "react";
import { GridPosters } from "@/components/Shared";

const posterCtrl = new Poster();
// const limit = 9;
// const categoryId = null;

export function LatestPosters(props) {
  const [posters, setPosters] = useState(null);
  const { title, limit = 9, categoryId = null } = props;
  //console.log(posters);

  useEffect(() => {
    (async () => {
      try {
        const response = await posterCtrl.getLatestPublished({
          limit,
          categoryId,
        });

        setPosters(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!posters) return null;
  return (
    <div>
      <h2>{title}</h2>
      <GridPosters posters={posters} />
    </div>
  );
}
