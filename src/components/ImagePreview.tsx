'use client';
import Image from 'next/image'
import { useState } from 'react';
import { ChangeEvent } from 'react';

interface Props {
    panelNum: number;
}

const ImagePreview = ({panelNum} : Props) => {
    // Used to store the URL of the image being previewed.  Needs to be a state hook variable as the image used will change. Defaults to a placeholder image
    const [selectedImage, setSelectedImage] = useState<string>("/images/previewPlaceholder.png");

    function handleChange(event:ChangeEvent)
    {
        // Create the file object from the file uploaded by the user
        const file = (event.target as HTMLInputElement).files?.[0];

        // Make sure that the file exists
        // *TODO*: Come back and add some extra security here to make sure that the file is indeed an image
        // as well as seeing if I can restrict the image size to be 1200x800
        if(file)
        {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', () =>{
                const url = fileReader.result;

                // *TODO*: Modify the image data to be black and white
                

                // Save the image to local storage for the publishing page
                const setName = 'image-' + panelNum;
                if(url) {
                    localStorage.setItem(setName, String(url));
                }
            });

            // Set the preview to the image
            setSelectedImage(URL.createObjectURL(file));
        }
        else
        {
            // *TODO*: Throw an error to the user to notify them that their image submission did not go through and why
            setSelectedImage("/images/previewPlaceholder.png");
        }
    }

    return(
        <div>
            <Image id="image-preview" src={selectedImage} alt="image-preview" width={300} height={200} />
            <form>
                <label htmlFor="imageDropbox" className="form-label">Upload a Panel (1200x800p)</label>
                <input 
                    className="form-control" 
                    id="imageDropbox" 
                    type="file" 
                    accept="image/*" 
                    name="image"
                    // When the form takes an image inputted by the user, set the image link to the inputted image
                    // If the file does not exist, set the image link to the default image
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default ImagePreview