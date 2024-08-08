import Image from 'next/image';
import { User } from './interfaces';
import styles from '@/styles/read.module.css';
interface Props {
    author: User | null | undefined
    toggleAuthorCredit: (b: boolean) => void
}

/**
 * Signature component for user credit on comic read pages
 * @param {Props} prop user object of the panel set's author and the state toggle for showing extra user info
 */
export default function Signature( {author, toggleAuthorCredit} : Props) {
    return <div id={styles.signature}>
        <Image
                onClick={() => {toggleAuthorCredit(true)}}
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