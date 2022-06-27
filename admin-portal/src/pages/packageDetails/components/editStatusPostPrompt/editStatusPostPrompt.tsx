import React, {useEffect, useState} from "react";
import './editStatusPostPrompt.css';
import {DonorAidPackageStatusPost} from "../../../../types/DonorAidPackageStatusPost";

interface EditStatusPostPromptProps {
  post: DonorAidPackageStatusPost;
  onSave: (post: DonorAidPackageStatusPost) => Promise<void>;
}

export default function EditStatusPostPrompt({post, onSave}: EditStatusPostPromptProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    if(post){
      setStatusText(post.text)
    }
    setErrorText('');
  }, [post])

  const handleSaveButtonClick = async () => {
    setIsSaving(true);
    setErrorText('');
    try {
      const editedPost: DonorAidPackageStatusPost = {
        ...post,
        text: statusText
      }
      await onSave(editedPost);
    } catch (e) {
      setErrorText('Something went wrong. Couldn\' edit the post.')
    }
    setIsSaving(false);
  }

  return (
    <div className="editStatusPostPrompt">
      <h4>Edit status</h4>
      <textarea
        value={statusText}
        rows={4}
        onChange={(event) => {
          setStatusText(event.currentTarget.value)
        }}
      />
      {errorText && (
        <div className="errorText">{errorText}</div>
      )}
      <div>
        <button
          disabled={isSaving}
          onClick={handleSaveButtonClick}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}
