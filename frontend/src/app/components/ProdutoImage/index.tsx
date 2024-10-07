import React, { useState, ChangeEvent, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
import "./produtoImageStyle.css";

interface AvatarUploadProps {
  src: string;
  onChangeImage: (file: File) => void;
}

const ProdutoImage: React.FC<AvatarUploadProps> = ({ src, onChangeImage }) => {
  const [previewImage, setPreviewImage] = useState(src);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      onChangeImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    setPreviewImage(src);
  }, [src]);

  return (
    <div className="container">
      <div className="avatar-upload">
        <div className="avatar-edit">
          <input
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            name="avatar"
            onChange={handleImageChange}
          />
          <label htmlFor="imageUpload">
            <svg
              id="pencilBTN"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92-1.92l2.83 2.83L5 19h-2v-2l1.92-1.92zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.34 1.34 3.75 3.75 1.34-1.34z" />
            </svg>
          </label>
        </div>
        <div className="avatar-preview">
          <div className="imagePreview" style={{ backgroundImage: `url(${previewImage})` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoImage;