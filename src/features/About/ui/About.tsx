import styles from "./about.module.scss";

import { aboutDataMock } from "@/features/About/model/aboutDataMock.ts";
const About = () => {
  return (
    <div className={styles.about}>
      {aboutDataMock.map((item) => {
        return (
          <div key={item.text} className={styles.about__card}>
            <img
              src={item.img}
              alt={""}
              className={styles.about__imgContainer}
            ></img>
            <div>{item.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default About;
