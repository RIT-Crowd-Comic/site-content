import { User } from './interfaces';
interface Props {
    user: User
}
export default function Signature( {user} : Props) {
    return <div>
        <Image
                width={300}
                height={300}
                src={user.profile_picture}
                alt={`${user.display_name}'s profile picture`}
                unoptimized={true}
            />
        <p>{user.display_name}</p>
    </div>
}