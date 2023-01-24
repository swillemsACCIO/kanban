import React from "react";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

import { Board } from "Kanban/types";
// import { ColumnColor } from "Kanban/enums/index";
import Radio from "Kanban/components/Radio";
import { useTranslation } from "Kanban/providers/TranslationProvider";

type BoardFormProps = {
  board?: Partial<Board>;
  onSubmit: any;
  onCancel: any;
  disabled?: boolean;
  formTitle?: string;
};


const BoardForm: React.FC<BoardFormProps> = (props) => {
  const { t } = useTranslation();

  const {
    board,
    disabled,
    formTitle = t("addBoard"),
    onSubmit,
    onCancel,
  } = props;

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: Object.assign(
      {
        title: "",
        description: "",
      },
      board
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

export default BoardForm;
