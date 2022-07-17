/* eslint-disable jsx-a11y/label-has-associated-control */
import { AttachFile } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FileInput } from '.';

export const FileUploadComponent = () => (
  <label htmlFor="icon-button-file">
    <FileInput accept="image/*" id="icon-button-file" type="file" />
    <IconButton color="primary" aria-label="upload picture" component="span">
      <AttachFile />
    </IconButton>
  </label>
);
