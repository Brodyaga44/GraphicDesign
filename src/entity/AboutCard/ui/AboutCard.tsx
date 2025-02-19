import { AboutProps } from "@/entity/AboutCard/model/AboutProps.ts";

const AboutCard = ({ item }: AboutProps) => {
  return (
    <div>
      <div>{item.img}</div>
      <div>{item.text}</div>
    </div>
  );
};

export default AboutCard;
