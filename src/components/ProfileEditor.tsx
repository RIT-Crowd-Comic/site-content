import {
    Dispatch, SetStateAction, useEffect, useRef, useState
} from 'react';
import styles from '../styles/profileEditor.module.css';
import Image from 'next/image';
import Croppie from 'croppie';

interface Props {
    editorState: boolean;
    setEditorState: Dispatch<SetStateAction<boolean>>;
}

const ProfileEditor = ({
    editorState = false,
    setEditorState
}: Props) => {

    const profileEditorRef = useRef<HTMLDivElement | null>(null);
    const [croppie, setCroppie] = useState<Croppie>();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!edit) return;
        console.log('hi');
        if (profileEditorRef.current) {
            const options = {
                viewport:        { width: 200, height: 200, type: 'circle' },
                boundary:        { width: 200, height: 200 },
                enforceBoundary: true,
            };
            croppie?.destroy();
            setCroppie(new Croppie(profileEditorRef.current, options as any));
        }
    }, [edit]);

    useEffect(() => {
        croppie?.bind({ url: '/images/icons/Profile.svg', orientation: 1 });
    }, [croppie]);

    if (!editorState) return undefined;

    return (
        <div id={styles.profileEditorContainer}>
            <div
                className="row d-flex justify-content-center rounded"
                id={styles.profileEditor}
            >
                <div
                    className="p-0"
                >
                    <div className={`card ${styles.card}`}>
                        <div className="rounded-top d-flex flex-row p-4">
                            <Image
                                id={styles.profileIcon}
                                className="m-auto"
                                src="/images/icons/Profile.svg"
                                width={200}
                                height={200}
                                alt="Profile"
                            />
                            <div id="profile-editor" ref={profileEditorRef} style={{ width: 200, height: 200 }} />
                            <button
                                className="btn-close btn-close-dark"
                                onClick={() => setEditorState(false)}
                            />
                        </div>
                        <div className="p-2 text-dark border-top bg-white rounded-bottom">
                            <div className={`${styles.options} d-flex justify-content-center text-center py-1`}>
                                <button
                                    className="btn btn-outline-dark mx-2"
                                    onClick={() => setEdit(!edit)}
                                >Edit
                                </button>
                                <button className={`btn btn-outline-dark `}>Change Photo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ProfileEditor };
