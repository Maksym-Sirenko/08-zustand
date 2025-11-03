'use client';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikHelpers,
} from 'formik';
import type { NoteTag } from '@/types/note';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useRouter } from 'next/navigation';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

interface NoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag | string;
}

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const fieldId = useId();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      onSuccess?.();
      if (onClose) onClose();
      else router.push('/notes/filter/all');
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
    title: draft?.title ?? '',
    content: draft?.content ?? '',
    tag: (draft?.tag as NoteTag) ?? 'Todo',
  };

  return (
    <Formik
      initialValues={initialDraftValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ isValid, dirty }) => (
        <Form className={css.form} noValidate>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-title`}>Title</label>
            <Field name="title">
              {({ field }: FieldProps) => (
                <input
                  {...field}
                  id={`${fieldId}-title`}
                  className={css.input}
                  onChange={(e) => {
                    field.onChange(e);
                    setDraft({ title: e.target.value });
                  }}
                />
              )}
            </Field>
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-content`}>Content</label>
            <Field name="content">
              {({ field }: FieldProps) => (
                <textarea
                  {...field}
                  id={`${fieldId}-content`}
                  className={css.textarea}
                  rows={8}
                  onChange={(e) => {
                    field.onChange(e);
                    setDraft({ content: e.target.value });
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field name="tag">
              {({ field }: FieldProps) => (
                <select
                  {...field}
                  id={`${fieldId}-tag`}
                  className={css.select}
                  onChange={(e) => {
                    field.onChange(e);
                    setDraft({ tag: e.target.value as NoteTag });
                  }}
                >
                  {TAGS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                if (onClose) onClose();
                else router.push('/notes/filter/all');
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending || !isValid}
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
