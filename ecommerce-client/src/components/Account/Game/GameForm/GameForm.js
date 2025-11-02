import React, { useEffect, useState } from 'react';
import { Button, Form, Message, Image, Label, Input, Icon, Confirm, Grid } from 'semantic-ui-react';
import { useFormik } from "formik";
import { Game, Platform } from '@/api';

import LoaderComponent from '@/components/Shared/Loader';
import { initialValues, validationSchema } from "./GameForm.form";
import styles from './GameForm.module.scss';

const gameCtrl = new Game();
const platformCtrl = new Platform();

export function GameForm(props) {
  const { onClose, onReload, gameId, game } = props;
  const [platforms, setPlatforms] = useState(null);
  const [videoError, setVideoError] = useState('');
  const [initialFormValues, setInitialFormValues] = useState(initialValues(game));
  const [screenshotsList, setScreenshotsList] = useState(initialValues(game));
  const [open, setOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(game),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setIsSubmitting(true);
      formValue.platform = { id: formValue.platform };
      const changedValues = getChangedValues(initialFormValues, formValue);

      try {
        if (gameId) {
          if (Object.keys(changedValues).length > 0) {
            await gameCtrl.putGame(changedValues, gameId);
          } else {
            console.log('No changes detected.');
          }
        } else {
          await gameCtrl.postGame(formValue);
        }

        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error?.message ||
          'Failed to add game. Please try again later.';
        formik.setStatus({ gameError: errorMessage });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const getChangedValues = (initialValues, currentValues) => {
    const changedValues = {};
    for (const key in currentValues) {
      if (currentValues[key] !== initialValues[key]) {
        changedValues[key] = currentValues[key];
      }
    }
    return changedValues;
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;
    const slug = generateSlug(title);
    formik.setValues({
      ...formik.values,
      title: title,
      slug: slug,
    });
  };

  const generateSlug = (title) => {
    return title.trim().toLowerCase().replace(/\s+/g, '-');
  };

  const handleFileUpload = (event, fieldName) => {
    const file = event.target.files[0];
    formik.setFieldValue(fieldName, file);
  };

  const handleScreenShotsUpload = (event, fieldName) => {
    const files = Array.from(event.target.files);
    const currentScreenshots = Array.isArray(formik.values[fieldName]) ? formik.values[fieldName] : [];
    const updatedScreenshots = [...currentScreenshots, ...files];

    setScreenshotsList(updatedScreenshots);
    formik.setFieldValue(fieldName, updatedScreenshots);
  };

  const handleDeleteScreenshot = (screenshot) => {
    const updatedScreenshots = screenshots.filter((s) => s !== screenshot);
    setScreenshotsList(updatedScreenshots);
    formik.setFieldValue('screenshots', updatedScreenshots);
    setOpen(false);
    setSelectedScreenshot(null);
  };

  const handleConfirmDelete = (screenshot) => {
    setSelectedScreenshot(screenshot);
    setOpen(true);
  };

  const extractVideo = (url) => {
    const standardRegex = /^https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/;
    const shortRegex = /^https:\/\/youtu\.be\/([^?]+)/;
    const standardMatch = url.match(standardRegex);
    const shortMatch = url.match(shortRegex);

    if (standardMatch) return standardMatch[1];
    if (shortMatch) return shortMatch[1];
    return null;
  };

  const extractImage = (img) => {
    return {
      id: img?.id ?? '',
      name: img?.attributes?.name ?? 'Not Found',
      thumbnailUrl: img?.attributes?.formats?.thumbnail?.url ?? '/images/not-found.jpeg',
    };
  };

  const {
    title,
    slug,
    price,
    discount,
    platform,
    summary,
    releaseDate,
    video,
    cover,
    wallpaper,
    screenshots
  } = formik.values;

  const showVideo = extractVideo(video);

  useEffect(() => {
    (async () => {
      try {
        const response = await platformCtrl.getAll();
        const platformOptions = response.data.map(platform => ({
          id: platform.id,
          title: platform.attributes.title
        }));
        setPlatforms(platformOptions);

        if (game?.platform?.data?.id) {
          formik.setFieldValue('platform', game.platform.data.id);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [game]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {gameId ? 'Edit Game' : 'Add New Game'}
        </h2>
        <Icon
          name="close"
          onClick={onClose}
          className={styles.closeIcon}
        />
      </div>

      <Form className={styles.gameForm} onSubmit={formik.handleSubmit}>
        {formik.status?.gameError && (
          <Message negative className={styles.errorMessage}>
            <Message.Header>Submit Failed</Message.Header>
            <p>{formik.status.gameError}</p>
          </Message>
        )}

        <LoaderComponent
          active={isSubmitting}
          secondaryText={gameId ? "Updating game details..." : "Uploading your new game. Sit tight, it won't take long!"}
        />

        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Input
                label="Title"
                name="title"
                type="text"
                placeholder="Enter game title"
                value={title}
                onChange={handleTitleChange}
                error={formik.touched.title && formik.errors.title}
                className={styles.formInput}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Input
                label="Slug"
                name="slug"
                type="text"
                placeholder="Auto-generated slug"
                value={slug}
                readOnly
                className={styles.readOnlyInput}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Input
                label="Price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={formik.handleChange}
                error={formik.touched.price && formik.errors.price}
                className={styles.formInput}
                icon="dollar"
                iconPosition="left"
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Input
                label="Discount (%)"
                name="discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={discount}
                onChange={formik.handleChange}
                error={formik.touched.discount && formik.errors.discount}
                className={styles.formInput}
                icon="percent"
                iconPosition="left"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form.TextArea
                label="Summary"
                name="summary"
                placeholder="Describe the game..."
                value={summary}
                onChange={formik.handleChange}
                error={formik.touched.summary && formik.errors.summary}
                className={styles.textArea}
                rows={4}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Dropdown
                label="Platform"
                placeholder="Select a platform"
                fluid
                selection
                value={platform || ''}
                options={[
                  { key: 'select', text: 'Select a platform', value: '' },
                  ...(platforms ? platforms.map(p => ({ key: p.id, text: p.title, value: p.id })) : [])
                ]}
                onChange={(e, { value }) => formik.setFieldValue('platform', value)}
                error={formik.touched.platform && formik.errors.platform}
                className={styles.dropdown}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Input
                label="Release Date"
                name="releaseDate"
                type="date"
                value={releaseDate}
                onChange={formik.handleChange}
                error={formik.touched.releaseDate && formik.errors.releaseDate}
                className={styles.formInput}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Input
                label="YouTube Video/Trailer URL"
                name="video"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={video}
                onChange={formik.handleChange}
                error={formik.touched.video && formik.errors.video}
                className={styles.formInput}
                icon="youtube"
                iconPosition="left"
              />
            </Grid.Column>
          </Grid.Row>

          {showVideo && (
            <Grid.Row>
              <Grid.Column width={16}>
                <div className={styles.videoPreviewContainer}>
                  <Label ribbon color="red">Video Preview</Label>
                  <iframe
                    className={styles.videoPreview}
                    src={`https://www.youtube.com/embed/${showVideo}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field className={styles.fileUpload}>
                <label>Cover Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'cover')}
                  className={styles.fileInput}
                />
                {cover && (
                  <div className={styles.imagePreview}>
                    <Label pointing="above">Preview</Label>
                    <Image
                      src={cover instanceof File ? URL.createObjectURL(cover) : extractImage(cover).thumbnailUrl}
                      size="small"
                      rounded
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field className={styles.fileUpload}>
                <label>Wallpaper Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'wallpaper')}
                  className={styles.fileInput}
                />
                {wallpaper && (
                  <div className={styles.imagePreview}>
                    <Label pointing="above">Preview</Label>
                    <Image
                      src={wallpaper instanceof File ? URL.createObjectURL(wallpaper) : extractImage(wallpaper).thumbnailUrl}
                      size="small"
                      rounded
                      className={styles.previewImage}
                    />
                  </div>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Form.Field className={styles.fileUpload}>
                <label>Screenshots</label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleScreenShotsUpload(e, 'screenshots')}
                  className={styles.fileInput}
                />

                {Array.isArray(screenshots) && screenshots.length > 0 && (
                  <div className={styles.screenshotsGrid}>
                    {screenshots.map((screenshot, index) => (
                      <div key={index} className={styles.screenshotItem}>
                        <div className={styles.screenshotContent}>
                          <Image
                            src={screenshot instanceof File ? URL.createObjectURL(screenshot) : extractImage(screenshot).thumbnailUrl}
                            size="small"
                            rounded
                          />
                          <Icon
                            name="delete"
                            className={styles.deleteIcon}
                            onClick={() => handleConfirmDelete(screenshot)}
                          />
                        </div>
                        <Label basic className={styles.screenshotLabel}>
                          {screenshot instanceof File ? screenshot.name : extractImage(screenshot).name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div className={styles.formActions}>
          <Button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className={styles.submitButton}
            primary
          >
            {gameId ? 'Update Game' : 'Create Game'}
          </Button>
        </div>

        <Confirm
          open={open}
          onCancel={() => setOpen(false)}
          onConfirm={() => handleDeleteScreenshot(selectedScreenshot)}
          content="Are you sure you want to delete this screenshot?"
          className={styles.confirmModal}
        />
      </Form>
    </div>
  );
}