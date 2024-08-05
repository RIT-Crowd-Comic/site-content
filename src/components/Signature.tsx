import Image from 'next/image';
import { User } from './interfaces';
interface Props {
    user: User | null | undefined
}
export default function Signature( {user} : Props) {
    return <div style={{display: 'flex', alignItems: 'center'}}>
        <Image
                width={50}
                height={50}
                src={user ? user.profile_picture : '/images/icons/Profile.svg'}
                style = {{borderRadius: 100}}
                alt={`${user?.display_name}'s profile picture`}
                unoptimized={true}
            />
        <p>{user?.display_name}</p>
    </div>
}