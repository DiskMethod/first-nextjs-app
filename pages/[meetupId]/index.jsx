import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const { image, title, address, description } = props.meetupData;
  return (
    <MeetupDetail
      image={image}
      title={title}
      address={address}
      description={description}
    />
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupsIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetupsIds.map((meetupsId) => ({
      params: {
        meetupId: meetupsId._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  console.log("HERE", meetupId);

  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
};

export default MeetupDetails;
