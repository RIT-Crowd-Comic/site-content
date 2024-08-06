import {
    Dispatch, SetStateAction, useCallback, useEffect, useRef, useState
} from 'react';
import styles from '../styles/profileEditor.module.css';
import Image from 'next/image';
import Croppie from 'croppie';
import '../styles/croppie-extended.css';

interface Props {
    editorState: boolean;
    setEditorState: Dispatch<SetStateAction<boolean>>;
    pfp?: string;
    email?: string
}

const ProfileEditor = ({
    editorState = false,
    setEditorState,
    pfp, 
    email
}: Props) => {

    const previewRef = useRef<HTMLImageElement | null>(null);
    const profileEditorRef = useRef<HTMLDivElement | null>(null);
    const [croppie, setCroppie] = useState<Croppie>();
    const [edit, setEdit] = useState(false);
    const [reloadEditorFlag, reloadEditor] = useState(false);

    // const uploadInputRef = useRef<HTMLInputElement | null>(null);

    const initializeCropper = () => {
        if (profileEditorRef.current) {
            const options = {
                viewport:        { width: 200, height: 200, type: 'circle' },
                boundary:        { width: 200, height: 200 },
                enforceBoundary: true,
            };

            // create the editor and bind the profile picture
            const imgSrc = previewRef.current?.src;
            if (imgSrc) {
                croppie?.destroy();
                const newCroppie = new Croppie(profileEditorRef.current, options as any);
                newCroppie.bind({ url: imgSrc, orientation: 1 });
                setCroppie(newCroppie);
            }
        }
    };

    // Set up image uploader when component loads
    const uploadInputRef = useCallback((node: HTMLInputElement) => {
        node?.addEventListener('change', () => {
            if (!node.files) return;

            const url = URL.createObjectURL(node.files[0]);

            if (previewRef.current) {
                previewRef.current.src = url;
                previewRef.current.onload = () => {
                    setEdit(true);
                    reloadEditor(flag => !flag);
                    console.log('reloading editor', !reloadEditorFlag);
                };
            }

            // const fileReader = new FileReader();
            // fileReader.onload = (event) => {
            //     const uploadedImage = event.target?.result;
            //     if (uploadedImage) console.log(uploadedImage.)
            // }
            // fileReader.readAsArrayBuffer(node.files[0]);
        });
    }, []);

    // Open the croppie image editor 
    useEffect(() => {
        if (!edit) return;
        console.log('edit changed', edit, reloadEditorFlag);
        initializeCropper();
    }, [edit, reloadEditorFlag]);

    // bind the image to the croppie image editor
    // useEffect(() => {
    //     if (previewRef.current) {
    //         croppie?.bind({ url: previewRef.current.src, orientation: 1 });
    //     }

    // }, [croppie]);

    const close = () => {
        setEditorState(false);
        setEdit(false);
    };

    const save = async () => {
        const image = await croppie?.result();
        pfp = image
        console.log(image);
    }

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
                                src={pfp ? pfp : "/images/icons/Profile.svg"}
                                width={200}
                                height={200}
                                alt="Profile"
                                ref={previewRef}
                            />
                            {
                                edit ?
                                    <div
                                        id="profile-editor"
                                        ref={profileEditorRef}
                                        style={{ width: 200, height: 200 }}
                                    /> :
                                    ''
                            }

                            <button
                                className="btn-close btn-close-dark"
                                onClick={close}
                            />
                        </div>
                        <div className="p-2 text-dark border-top bg-white rounded-bottom">
                            <div className={`${styles.options} d-flex justify-content-center text-center py-1`}>
                                <button
                                    className="btn btn-outline-dark mx-2"
                                    onClick={() => setEdit(!edit)}
                                >Edit
                                </button>
                                <input
                                    type="file"
                                    id="image_input"
                                    accept="image/jpeg, image/png, image/jpg"
                                    ref={uploadInputRef}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="image_input">
                                    <span className="btn btn-outline-dark" >Change Photo</span>
                                    <div style={{}} />
                                </label>
                                <button
                                    className="btn btn-outline-dark mx-2"
                                    onClick={() => save()}
                                >Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { ProfileEditor };
