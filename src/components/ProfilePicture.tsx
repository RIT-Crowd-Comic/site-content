import styles from '@/styles/profile.module.css';
import Image from 'next/image';
interface Props {
    pfp: string,
    width: number,
    height: number
}

export default function ProfilePicture( {pfp, width, height} : Props) {
    return <Image
        //id={styles.profileIcon}
        className="m-auto"
        src={`${pfp}`}
        width={width}
        height={height}
        style={{borderRadius:100}}
        alt="Profile Picture"
    />
}