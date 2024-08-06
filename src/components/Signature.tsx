import Image from 'next/image';
import { User } from './interfaces';
import styles from '@/styles/read.module.css';
interface Props {
    author: User | null | undefined
    toggleAuthorCredit: any
}
export default function Signature( {author, toggleAuthorCredit} : Props) {
    return <div id={styles.signature}>
        <Image
                onClick={() => {toggleAuthorCredit()}}
                id={styles.signature}
                width={50}
                height={50}
                src={author?.profile_picture ? author.profile_picture : '/images/icons/Profile.svg'}
                style = {{borderRadius: 100}}
                alt={`${author != null ? author?.display_name : "Crowd Comic User" }'s profile picture`}
                unoptimized={true}
            />
            <p id={styles.signature}>{author?.display_name ? author.display_name : 'Crowd Comic User'}</p>
    </div>
}