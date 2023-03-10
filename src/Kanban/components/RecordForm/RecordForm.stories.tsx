import React from "react";

import RecordForm from "Kanban/components/RecordForm";

const stories = {
  title: "Kanban/RecordForm",
  component: RecordForm,
};

const Template = (args: any) => <RecordForm {...args} />;

export const Default: any = Template.bind({});
Default.args = {
  record: {
    title: "Make Coffee",
    description: "Brew the beans",
    endDate: new Date(2023,1,1),
  },
};
Default.parameters = {
  withWrapper: true,
};

export const Disabled: any = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
Disabled.parameters = {
  ...Default.parameters,
};

export const CustomFormTitle: any = Template.bind({});
CustomFormTitle.args = {
  ...Default.args,
  formTitle: "Custom Form Title",
};
CustomFormTitle.parameters = {
  ...Default.parameters,
};

export default stories;
