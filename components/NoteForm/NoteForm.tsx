'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import type { NoteTag } from '@/types/note';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import { useNoteDraftStore } from '@/lib/store/noteStore';
// import { title } from 'process';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

interface NoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

// const initialValues: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// };

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title too short')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content is too long'),
  tag: Yup.mixed<NoteTag>()
    .oneOf(TAGS as readonly NoteTag[])
    .required('Tag is required'),
});

const NoteForm = ({ onClose, onSuccess }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const fieldId = useId();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onSuccess?.();
      onClose?.();
    },
  });

  const handleSubmit = async (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>,
  ) => {
    await mutateAsync(values);
    actions.resetForm();
  };

  const initialDraftValues: NoteFormValues = {
    title: draft.title ?? '',
    content: draft.content ?? '',
    tag: (draft.tag as NoteTag) ?? 'Todo',
  };

  return (
    <Formik
      initialValues={initialDraftValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isValid, dirty }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field name="title">
              {({ field }: any) => (
                <input
                  {...field}
                  id={`${fieldId}-title`}
                  className={css.input}
                  onChange={(e) => {
                    field.onChange(e);
                    const v = e.target.value;
                    setDraft({ title: v });
                    setFieldValue('title', v, false);
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className={css.select}
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending || !isValid || !dirty}
            >
              {isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
