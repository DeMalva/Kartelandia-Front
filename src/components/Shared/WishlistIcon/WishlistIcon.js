import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import styles from "./WishlistIcon.module.scss";
// import { useRouter } from "next/router";

const wishlistCtrl = new Wishlist();

// Este componente nos pinta y da funcion al icono de lista de deseados
// Traemos al usuario para saber su lista de deseados
export function WishlistIcon(props) {
  const [hasWishlist, setHasWishlist] = useState(null);
  const { posterId, className, removeCallback } = props;
  const { user } = useAuth();
  // const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.check(user.id, posterId);
        setHasWishlist(response);
        // console.log(response);
      } catch (error) {
        setHasWishlist(false);
        console.error(error);
      }
    })();
  }, [posterId]);

  const addWishlist = async () => {
    const response = await wishlistCtrl.add(user.id, posterId);
    setHasWishlist(response);
    // console.log(response);
  };

  const deleteWishlist = async () => {
    try {
      await wishlistCtrl.delete(hasWishlist.documentId);
      setHasWishlist(false);

      if (removeCallback) {
        removeCallback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (hasWishlist === null) return null;

  // const goToLogin = () => router.push("/join/sign-in");
  // const goToWish = () => (hasWishlist ? deleteWishlist : addWishlist);
  // const goToCart = () => {
  //   if (!user) goToLogin();
  //   else goToWish();
  // };

  return (
    <Icon
      name={hasWishlist ? "heart" : "heart outline"}
      // onClick={goToCart}
      // onClick={!user ? router.push("/") }
      onClick={hasWishlist ? deleteWishlist : addWishlist}
      className={classNames(styles.wishlistIcon, {
        [className]: className,
      })}
    />
  );
}
