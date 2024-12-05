import styles from "./Gallery.module.scss";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { ENV } from "@/utils/constants";
import { useState } from "react";
import { FullModal } from "@/components/Shared";
import Slider from "react-slick";

export function Gallery(props) {
  const { screenshots } = props;
  const [show, setShow] = useState(false);
  // console.log(screenshots);

  // Vamos a sacar una imagen para convertiral en la principal de la galeria
  //const onOpenClose = () => setShow((prevState) => !prevState);
  const onOpenClose = () => setShow((prevState) => !prevState);

  const screenshotsClone = [...screenshots];
  const principalImage = screenshotsClone.shift();
  const screenshotsUrlStrapi = `${ENV.SERVER_HOST}${principalImage.url}`;

  const settings = {
    dots: true,
    dotsClass: styles.dots,
    infinite: true,
    slidersToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: function (index) {
      return <Image src={`${ENV.SERVER_HOST}${screenshots[index].url}`} />;
    },
  };
  console.log(screenshots.name);

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.principal}>
          <Image src={screenshotsUrlStrapi} onClick={onOpenClose} />
        </div>

        <div className={styles.grid}>
          {map(screenshotsClone, (screenshot) => (
            <div key={screenshot.id}>
              <Image
                src={`${ENV.SERVER_HOST}${screenshot.url}`}
                onClick={onOpenClose}
              />
            </div>
          ))}
        </div>
      </div>

      <FullModal show={show} onClose={onOpenClose}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {map(screenshots, (screenshot) => (
              <div key={screenshot.id}>
                <Image src={`${ENV.SERVER_HOST}${screenshot.url}`} />
              </div>
            ))}
          </Slider>
        </div>
      </FullModal>
    </>
  );
}
