import Image from "next/dist/client/image";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = ({ image, title, address, description }) => {
  return (
    <section className={classes.detail}>
      <Image src={image} alt={title} layout="responsive" width={2} height={1} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;
