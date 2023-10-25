import { motion } from "framer-motion";
import styles from "./App.module.scss";
import Blob from "./shared-components/Blob";
import Masonry from "react-masonry-css";
import Link from "./shared-components/Link";
import { useWindowView } from "./utils/use-window-view";
import classNames from "classnames";

const NUMBER_OF_IMAGES = 43;

const App = () => {
  const { isTablet } = useWindowView();

  const breakpointColumns = {
    default: 3,
    2000: 4,
    1700: 4,
    1350: 3,
    1050: 2,
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "linear", duration: 2 }}
        className={styles["header"]}
      >
        <div className={styles["logo"]}>RBB MANUFACTURING ©</div>
        <div className={styles["description"]}>
          5 years of experience in manufacturing collections for streetwear and
          lifestyle brands // free tech pack creation // low minimum order
          quantities (MOQs) // competitive pricing // long-lasting durability
        </div>
      </motion.div>
      <motion.div className={styles["container"]}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 2 }}
          className={classNames(styles["contact-container"], {
            [styles["contact-container--small"]]: isTablet,
          })}
        >
          <h3 className={styles["contact-title"]}> Contact me for a quote</h3>
          <div className={styles["contact-list"]}>
            <Link
              href="https://wa.me/15145830305"
              className={styles["contact-link"]}
            >
              ➫ whatsapp
            </Link>
            <Link
              href="mailto:rbbmanufacturing@gmail.com"
              className={styles["contact-link"]}
            >
              ➫ email
            </Link>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "linear", duration: 2 }}
          className={styles["title"]}
        >
          Past works
        </motion.h2>

        <Masonry
          breakpointCols={breakpointColumns}
          className={styles["masonry-grid"]}
          columnClassName={styles["masonry-grid_column"]}
        >
          {Array(NUMBER_OF_IMAGES)
            .fill(null)
            .map((_, i) => (
              <motion.img
                key={`product ${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ease: "linear", duration: 1 }}
                src={`/images/products/${i + 1}.jpg`}
                alt={`product ${i}`}
                className={styles["product-image"]}
              />
            ))}
        </Masonry>
      </motion.div>
      <div className={styles["blob-container"]}>
        <Blob className={styles["blob"]} />
      </div>
    </>
  );
};

export default App;
