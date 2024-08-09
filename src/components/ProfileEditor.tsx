import {
    Dispatch, SetStateAction, useCallback, useEffect, useRef, useState
} from 'react';
import styles from '../styles/profileEditor.module.css';
import Image from 'next/image';
import Croppie from 'croppie';
import '../styles/croppie-extended.css';
import { changePfp } from '@/api/apiCalls';
import { MutableRefObject } from 'react';

interface Props {
    editorState: boolean;
    setEditorState: Dispatch<SetStateAction<boolean>>;
    pfpRef?: MutableRefObject<string | undefined>;
    email?: string
}

/**
 * Profile Editor component to change the user's profile picture on the suer dashboard
 * @param {Props} Props An editorState boolean and an action to toggle that state. Optional parameters for a user email and
 * a reference to a profile picture url value that can be read and written to
 */
const ProfileEditor = ({
    editorState = false,
    setEditorState,
    pfpRef,
    email
}: Props) => {

    const previewRef = useRef<HTMLImageElement | null>(null);
    const profileEditorRef = useRef<HTMLDivElement | null>(null);
    const [croppie, setCroppie] = useState<Croppie>();
    const [edit, setEdit] = useState(false);
    const [reloadEditorFlag, reloadEditor] = useState(false);


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
        });
    }, []);

    // Open the croppie image editor 
    useEffect(() => {
        if (!edit) return;
        console.log('edit changed', edit, reloadEditorFlag);
        initializeCropper();
    }, [edit, reloadEditorFlag]);

    const close = () => {
        setEditorState(false);
        setEdit(false);
    };

    // Save the image in the croppie window to the database and update pfp use on the page
    const save = async () => {
        if (!croppie || !email) return;
        croppie.result({ type: 'base64' }).then(async (resp) => {
            const arr = resp.split(',') as string[];
            let bstr = atob(arr[1]), n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const file = new File([u8arr], 'image.png', { type: 'image/png' });
            const url = await changePfp(email, file);
            if (!pfpRef) return;
            pfpRef.current = url;
            close();
        });
    };

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
                                src={pfpRef?.current ? pfpRef.current : '/images/icons/Profile.svg'}
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
