import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";

import { Record } from "PersonalKanban/types";
import { RecordColor } from "PersonalKanban/enums";
import Radio from "PersonalKanban/components/Radio";
import { useTranslation } from "PersonalKanban/providers/TranslationProvider";

type RecordFormProps = {
  record?: Record;
  onSubmit: any;
  onCancel?: any;
  disabled?: boolean;
  formTitle?: string;
};

const RecordForm: React.FC<RecordFormProps> = (props) => {
  const { t } = useTranslation();
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

  const {
    record,
    disabled,
    formTitle = t("addRecord"),
    onSubmit,
    onCancel,
    } = props;
  

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: 
     Object.assign(
      {
        title: "",
        description: "",
        color: "",
        endDate: new Date(),
      },
      record
    ),
    onSubmit: (values) => {
      onSubmit && onSubmit(values);
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = t("titleRequired");
      }

      return errors;
    },
  });


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h6">
            {formTitle}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="title"
            label={t("title")}
            value={values.title}
            error={Boolean(errors.title)}
            helperText={errors.title}
            disabled={disabled}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            minRows={3}
            name="description"
            label={t("description")}
            value={values.description}
            error={Boolean(errors.description)}
            helperText={errors.description}
            disabled={disabled}
            onChange={handleChange}
          />
        </Grid>        
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label={t("enddate")}
              format="dd.MM.yyyy"
              value={values.endDate}
              InputAdornmentProps={{ position: "start" }}
              name="enddate"
              error={Boolean(errors.endDate)}
              helperText={errors.endDate}
              disabled={disabled}       
              onChange={val => {
                setFieldValue("endDate", val)}}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{t("background")}</FormLabel>
            <RadioGroup
              row
              aria-label="background"
              name="color"
              value={values.color}
              onChange={handleChange}
            >
              {Object.keys(RecordColor).map((key) => {
                const colorKey = key as keyof typeof RecordColor;
                return (
                  <Radio
                    key={colorKey}
                    value={colorKey}
                    color={RecordColor[colorKey]}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" disabled={disabled} onClick={onCancel}>
            {t("cancel")}
          </Button>
          &nbsp;
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={disabled}
          >
            {t("submit")}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RecordForm;
