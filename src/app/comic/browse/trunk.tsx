interface Props {
    name: string;
}
const Trunk = ({name} : Props) => {
    return (
        <>
            <a href={`/comic?id=${name}`}>{name ?  name : "No name"}</a>
        </>
    );
}

export default Trunk