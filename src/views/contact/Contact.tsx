import React from 'react';
import { Box } from '@material-ui/core';
import { Formik, FormikConfig } from 'formik';
import log from 'loglevel';
import * as Yup from 'yup';

import { Layout } from '@/components/Layout';
import { SectionTitle } from '@/components/SectionTitle';
import { useDeveloperProfile } from '@/hooks/useDeveloperProfile';

import { useContactQuery } from './Contact.query';
import { useContactStyles } from './Contact.styles';
import { ContactForm } from './ContactForm';

type FormValues = {
  fullName: string;
  email: string;
  title: string;
  messageContent: string;
};

type FormConfig = FormikConfig<FormValues>;

const initialValues: FormValues = {
  fullName: '',
  email: '',
  title: '',
  messageContent: '',
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required().label('Full name'),
  email: Yup.string().required().email().label('Email'),
  title: Yup.string().required().label('Title'),
  messageContent: Yup.string().required().label('Message'),
});

const encode = (record: Record<string, string>) => {
  return Object.keys(record)

    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(record[key])}`)
    .join('&');
};

const submitFormData = (values: FormValues) =>
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode({
      'form-name': 'contact',
      ...values,
    }),
  })
    .then(log.info)
    .catch(log.error);

export const Contact = () => {
  const data = useContactQuery();
  const classes = useContactStyles();
  const developerProfile = useDeveloperProfile();

  const handleSubmit: FormConfig['onSubmit'] = async (values, helpers) => {
    await submitFormData(values);
    helpers.setSubmitting(false);
  };

  return (
    <Layout
      developerProfile={developerProfile}
      meta={{
        title: data.contactPageTitle,
        description: data.contactPageDescription,
        imageUrl: data.contactPageImage?.publicURL,
      }}
      variant="withDetailsCard"
    >
      <Box className={classes.contactContainer}>
        <SectionTitle className={classes.title}>Contact</SectionTitle>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <ContactForm />
        </Formik>
      </Box>
    </Layout>
  );
};
