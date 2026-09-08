import './Profile.css';
import { formatImageUrl } from '../../../../helpers/imageFormatter';

interface ProfileProps {
    name: string;
    jobTitle: string;
    description: string;
    image: string;
}

const defaultProfileImage = "default-profile.jpeg";

const Profile = ({ name, jobTitle, description, image }: ProfileProps) => {
    const resolvedImage = formatImageUrl(image) || defaultProfileImage;

    return (
        <section id="profile">
            <img className="profile-image" src={resolvedImage} alt="Profile" />
            <div className="profile-details">
                <h1>{name}</h1>
                <h4 id="profile-title">{jobTitle}</h4>
                <p>{description}</p>
            </div>
        </section>
    );
};

export default Profile;