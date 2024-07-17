interface Props {
    name: string;
}
import { useRouter } from 'next/navigation'
const Trunk = ({name} : Props) => {
    const router = useRouter()
    return (
        <button onClick={() => router.push(`/comic?id=${name}`)}>{name ?  name : "No name"}</button>
    );
}

export default Trunk