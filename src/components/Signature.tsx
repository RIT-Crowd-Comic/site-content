import Image from 'next/image';
import { User } from './interfaces';
interface Props {
    author: User | null | undefined
}
export default function Signature( {author} : Props) {
    return <div style={{display: 'flex', alignItems: 'center'}}>
        <Image
                width={50}
                height={50}
                src={author?.profile_picture ? author.profile_picture : '/images/icons/Profile.svg'}
                style = {{borderRadius: 100}}
                alt={`${author?.display_name}'s profile picture`}
                unoptimized={true}
            />
        <p>{author?.display_name}</p>
    </div>
}