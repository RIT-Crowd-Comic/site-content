import Image from 'next/image';
import { User } from './interfaces';
import styles from '@/styles/read.module.css';
interface Props {
    author: User | null | undefined
}
export default function Signature( {author} : Props) {
    return <div id={styles.signature}>
        <Image
                id={styles.signature}
                width={50}
                height={50}
                src={author?.profile_picture ? author.profile_picture : '/images/icons/Profile.svg'}
                style = {{borderRadius: 100}}
                alt={`${author != null ? author?.display_name : "Test" }'s profile picture`}
                unoptimized={true}
            />
            <p id={styles.signature}>Alexander Hamilton</p>
            {/* <p>{author?.display_name}</p> */}
    </div>
}