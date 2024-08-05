import styles from '@/styles/profile.module.css';
import Image from 'next/image';
interface Props {
    pfp: string | undefined
}

export default function ProfilePicture( {pfp} : Props) {
    return <Image
        //id={styles.profileIcon}
        className="m-auto"
        src={`${pfp}`}
        width={200}
        height={200}
        style={{borderRadius:100}}
        alt="Profile"
    />
}