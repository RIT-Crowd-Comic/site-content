interface Props {
    name: string;
}
const Trunk = ({name} : any) => {

    return (
        <>
            <a href="">{name ?  name : "No name"}</a>
        </>
    );
}

export default Trunk